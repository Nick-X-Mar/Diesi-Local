import React, { useState, useContext, memo } from 'react';
// import { Link, graphql, useStaticQuery } from "gatsby";

import { PlayerContext } from '../utils/playerContext';
import moment from 'moment';
import { Range, Direction, getTrackBackground } from 'react-range';

import LazyLoad, { forceCheck } from 'react-lazyload';

import Play from '../assets/icons/play.svg';
import Pause from '../assets/icons/pause.svg';
import Close from '../assets/icons/close.svg';
import ArrowDown from '../assets/icons/arrow-down.svg';
import Volume from '../assets/icons/volume.svg';
import Mute from '../assets/icons/muted.svg';
import Like from '../assets/icons/like.svg';

import placeholder from '../assets/images/placeholder.jpg';
import placeholder400 from '../assets/images/placeholder-400.jpg';
import placeholder400Webp from '../assets/images/placeholder-400.webp';
import placeholder334Webp from '../assets/images/placeholder-334.webp';
import placeholder334 from '../assets/images/placeholder-334.jpg';

const Player = () => {
    let { state, dispatch } = useContext(PlayerContext);
    const [volume, setVolume] = useState([0.5]);
    const [showVolume, setShowVolume] = useState(false);
    const [userLike, setUserLike] = useState(null);

    const handlePlayPause = () => {
        state.playing ? dispatch({ type: 'setPlay', value: false }) : dispatch({ type: 'setPlay', value: true });
    };

    const handleLike = (like) => {
        like === 1 ? setUserLike(1) : setUserLike(0);
    };

    const handleClose = () => {
        state.playerActive ? dispatch({ type: 'setActive', value: false }) : dispatch({ type: 'setActive', value: true });
    };

    const handleExpand = () => {
        if (state.playerExpanded) dispatch({ type: 'setExpand', value: false });
        else {
            dispatch({ type: 'setExpand', value: true });
            forceCheck();
        }
    };

    const handleVolumeChange = (values) => {
        dispatch({ type: 'setVolume', value: values[0] });
        setVolume(values);
    };

    const handleMute = () => {
        !state.mute ? setVolume([0]) : setVolume([state.volume]);
        dispatch({ type: 'setMute', value: !state.mute });
    };
    return (
        <div className={state.playerActive ? `Player${state.playerExpanded ? ' expanded' : ''}` : 'Player hidden'}>
            <div className="wrapper">
                <div className="state">LIVE NOW</div>
                <div className="body">
                    <div className={'producer' + (state.playerExpanded ? ' opened' : '')}>
                        <div className="photo">
                            <LazyLoad
                                height={140}
                                width={185}
                                once
                                placeholder={
                                    <picture height={140} className="placeholder">
                                        <source
                                            srcSet={`${placeholder400Webp} 400w, ${placeholder334Webp} 334w`}
                                            sizes="max-width: 1080px  100vw"
                                            alt="Placeholder"
                                            type="image/webp"
                                        />
                                        <source
                                            srcSet={`${placeholder400} 400w, ${placeholder334} 334w`}
                                            sizes="max-width: 1080px  100vw"
                                            alt="Placeholder"
                                            type="image/jpeg"
                                        />
                                        <img
                                            className="placeholder"
                                            src={placeholder}
                                            srcSet={`${placeholder400} 400w, ${placeholder334} 334w`}
                                            sizes="max-width: 1080px  100vw"
                                            alt="Placeholder"
                                        />
                                    </picture>
                                }
                            >
                                <picture>
                                    <source
                                        srcset={`${process.env.GATSBY_IMAGES_URL}/producers/224/${
                                            Object.keys(state.playingNow).length > 0 && state.playingNow.image
                                                ? state.playingNow.image.split('.')[0]
                                                : 'placeholder'
                                        }.webp`}
                                        type="image/webp"
                                    />
                                    <source
                                        srcset={`${process.env.GATSBY_IMAGES_URL}/producers/224/${
                                            Object.keys(state.playingNow).length > 0 && state.playingNow.image
                                                ? state.playingNow.image.split('.')[0]
                                                : 'placeholder'
                                        }.jpg`}
                                        type="image/jpeg"
                                    />
                                    <img
                                        src={`${process.env.GATSBY_IMAGES_URL}/producers/224/${
                                            Object.keys(state.playingNow).length > 0 && state.playingNow.image
                                                ? state.playingNow.image.split('.')[0]
                                                : 'placeholder'
                                        }.jpg`}
                                        alt="Producer"
                                    />
                                </picture>
                            </LazyLoad>
                        </div>
                        <div className="data">
                            <div className="time">
                                {Object.keys(state.playingNow).length > 0
                                    ? `${moment(state.playingNow.start, 'HH:mm').format('HH:mm')} - ${moment(
                                          state.playingNow.stop,
                                          'HH:mm'
                                      ).format('HH:mm')}`
                                    : null}
                            </div>
                            <div className="name">{Object.keys(state.playingNow).length > 0 ? state.playingNow.name : null}</div>
                            <div className="description">
                                It is a long established fact that a reader will be distracted by the readable content of a page when
                                looking at its layout.
                            </div>
                            <div className="divider"></div>
                            <div className="next">
                                <span>NEXT ON:</span>
                                <span>
                                    {Object.keys(state.playingNext).length > 0
                                        ? `${state.playingNext.name} / ${moment(state.playingNext.start, 'HH:mm').format(
                                              'HH:mm'
                                          )} - ${moment(state.playingNext.stop, 'HH:mm').format('HH:mm')}`
                                        : null}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div title={!state.playing ? 'Play' : 'Pause'} className="play" onClick={handlePlayPause}>
                        {!state.playing ? <Play /> : <Pause />}
                    </div>
                    <div className="info">
                        <span>ONAIR:</span>
                        <span>
                            {!state.playing ? (
                                Object.keys(state.playingNow).length > 0 ? (
                                    ` ${state.playingNow.name} / ${moment(state.playingNow.start, 'HH:mm').format('HH:mm')} - ${moment(
                                        state.playingNow.stop,
                                        'HH:mm'
                                    ).format('HH:mm')}`
                                ) : null
                            ) : (
                                <div className="song">
                                    <span className="title">
                                        {Object.keys(state.playingNow).length > 0 ? state.playingNow.name : null} / <em>PLAYING NOW:</em>
                                        {state.song}
                                    </span>
                                    <span className="like">
                                        <Like className={userLike ? 'active' : null} onClick={() => handleLike(1)} />
                                    </span>
                                    <span className="dislike">
                                        <Like className={userLike !== null && !userLike ? 'active' : null} onClick={() => handleLike(0)} />
                                    </span>
                                </div>
                            )}
                        </span>
                    </div>
                    <div className={state.playerExpanded ? 'expand active' : 'expand'} onClick={handleExpand}>
                        <span>{state.playerExpanded ? 'HIDE' : 'EXPAND'}</span>
                        <span>
                            <ArrowDown />
                        </span>
                    </div>
                    <div className="mute" onMouseEnter={() => setShowVolume(true)} onMouseLeave={() => setShowVolume(false)}>
                        <span
                            title="Ένταση"
                            onClick={handleMute}
                            className={`icon ${volume[0] > 0.6 ? 'two-lines' : volume[0] > 0.3 ? 'one-line' : 'no-line'}`}
                        >
                            {state.mute || volume[0] === 0 ? <Mute /> : <Volume />}
                        </span>
                        <span className="slider" style={showVolume ? { top: 65 } : null}>
                            <Range
                                step={0.01}
                                min={0}
                                max={1}
                                values={volume}
                                onChange={handleVolumeChange}
                                direction={Direction.Up}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        className="volume-track"
                                        style={{
                                            background: getTrackBackground({
                                                values: volume,
                                                colors: ['white', 'rgba(255, 255, 255, 0.5)'],
                                                min: 0,
                                                max: 1,
                                                direction: Direction.Up,
                                            }),
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => <div {...props} className="volume-thumb" />}
                            />
                        </span>
                    </div>
                    <div title="Κλείσιμο Player" className="close" onClick={handleClose}>
                        <Close />
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default memo(Player);
