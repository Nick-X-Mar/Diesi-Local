import React, { Fragment, useContext, useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { Range, Direction, getTrackBackground } from 'react-range';
import { isMobile } from 'react-device-detect';

import { PlayerContext } from '../utils/playerContext';

import SEO from '../components/seo';

import Logo from '../assets/icons/logo.svg';
import Play from '../assets/icons/black-round-play.svg';
import Pause from '../assets/icons/black-round-pause.svg';
import OnAir from '../assets/icons/on-air.svg';
import ListeningNow from '../assets/icons/listening-now.svg';
import { Script } from "gatsby"; 

import * as classes from '../styles/player.module.scss';
import useInterval from '../utils/useInterval';

const Player = props => {
    const { state, dispatch } = useContext(PlayerContext);
    const [volume, setVolume] = useState([0.5]);
    const [play, setPlay] = useState(false);
    const isBrowser = typeof window !== 'undefined';
    const producer = props.data.allApiProducers.nodes.filter(item => state.playingNow.producer_id === item.value)[0];

    useEffect(() => {
        if (!isMobile) handlePlayPause();
    }, []);

    useEffect(() => {
        axios.get(process.env.GATSBY_API_URL + '/playing-now').then(response => {
            if (response?.status === 200 && response?.data?.data?.status === 'success') {
                dispatch({ type: 'setSong', value: { ...response?.data?.data } });
            }
        });
    }, []);

    useInterval(() => {
        axios.get(process.env.GATSBY_API_URL + '/playing-now').then(response => {
            if (response?.status === 200 && response?.data?.data?.status === 'success') {
                dispatch({ type: 'setSong', value: { ...response?.data?.data } });
            }
        });
    }, 20000);

    //Player analytic events
    const trackBuffer = () => {
        if (isBrowser && typeof window?.gtag !== 'undefined') {
            window.gtag('event', 'Buffering streaming', {
                event_category: 'Streaming',
                event_label: 'Buffering',
                non_interaction: true,
            });
        }
    };

    const trackError = error => {
        if (isBrowser && typeof window?.gtag !== 'undefined') {
            window.gtag('event', 'Error streaming', {
                event_category: 'Streaming',
                event_label: 'Error' + error,
                non_interaction: true,
            });
        }
    };

    const trackPlay = () => {
        if (isBrowser && typeof window?.gtag !== 'undefined') {
            window.gtag('event', 'Playing streaming', {
                event_category: 'Streaming',
                event_label: 'Play',
            });
        }
    };

    const trackPause = () => {
        if (isBrowser && typeof window?.gtag !== 'undefined') {
            window.gtag('event', 'Stopped streaming', {
                event_category: 'Streaming',
                event_label: 'Stop',
            });
        }
    };

    const trackProgress = ({ playedSeconds }) => {
        if (isBrowser && typeof window?.gtag !== 'undefined') {
            var minutes = Math.floor(playedSeconds.toFixed(0) / 60);
            var seconds = playedSeconds.toFixed(0) - minutes * 60;
            window.gtag('event', 'Time listening to streaming', {
                event_category: 'Streaming',
                event_label: 'Progress',
                event_value: `${minutes}:${seconds}`,
                non_interaction: true,
            });
            window.gtag('event', 'Time listening song', {
                event_category: 'Streaming',
                event_label: `${state?.song?.artist} - ${state?.song?.song}`,
                event_value: `${minutes}:${seconds}`,
                non_interaction: true,
            });
        }
    };
    //end player analytics events

    const handleVolumeChange = values => {
        dispatch({ type: 'setVolume', value: values[0] });
        setVolume(values);
    };

    const handlePlayPause = () => setPlay(!play);

    return (
        <Fragment>
            <SEO
                title="Diesi Live"
                description="Ακούστε ζωντανά τον Δίεση 101,3FM!"
                url={`${process.env.GATSBY_SITE_URL}/player`}
            />
            <div className={classes.Player}>
                <Logo className={classes.Logo} />
                <div className={classes.ListeningNow}>
                    <div className={classes.Label}>
                        <OnAir className={classes.Svg} />
                        <div className={classes.Type}>ON AIR</div>
                    </div>
                    <div className={classes.Info}>
                        <div className={classes.Title}>{producer?.label ?? 'Γιώργος Γιαννόπουλος'}</div>
                    </div>
                </div>
                <div title={!play ? 'Play' : 'Pause'} className={classes.Buttons}>
                    <span className={classes.ButtonOverlay} onClick={handlePlayPause} />
                    {!play ? <Play /> : <Pause />}
                </div>
                <span className={classes.Range}>
                    <Range
                        step={0.01}
                        min={0}
                        max={1}
                        values={volume}
                        onChange={handleVolumeChange}
                        direction={Direction.Right}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                className={classes.VolumeTrack}
                                style={{
                                    background: getTrackBackground({
                                        values: volume,
                                        colors: ['black', '#D4BE02'],
                                        min: 0,
                                        max: 1,
                                        direction: Direction.Right,
                                    }),
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => <div {...props} className={classes.VolumeThumb} />}
                    />
                </span>
                <div className={classes.ListeningNow}>
                    <div className={classes.Label}>
                        <ListeningNow className={classes.Svg} />
                        <div className={classes.Type}>ΑΚΟΥΜΕ ΤΩΡΑ</div>
                    </div>
                    <div className={classes.Info}>
                        <div className={classes.Title}>{state?.song?.artist}</div>
                        <div className={classes.Description}>{state?.song?.song}</div>
                    </div>
                </div>
                <ReactPlayer
                    style={{
                        pointerEvents: 'none',
                        visibility: 'hidden',
                    }}
                    width="0%"
                    height="0%"
                    playsinline
                    config={{
                        file: {
                            forceAudio: true,
                        },
                    }}
                    volume={state.volume}
                    url={state.currentPlayer}
                    playing={play}
                    muted={state.mute}
                    progressInterval={30000}
                    onProgress={trackProgress}
                    onPlay={trackPlay}
                    onPause={trackPause}
                    onBuffer={trackBuffer}
                    onError={trackError}
                />
            </div> 
        </Fragment>
    );
};

export default Player;

export const pageQuery = graphql`
    query PlayerQuery {
        allApiProducers {
            nodes {
                value
                label
            }
        }
    }
`;
