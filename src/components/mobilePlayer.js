import React, { useContext, useState, memo } from 'react';

import moment from 'moment';
import { PlayerContext } from '../utils/playerContext';

import Play from '../assets/icons/play.svg';
import Pause from '../assets/icons/pause.svg';
import Close from '../assets/icons/close.svg';
import ArrowDown from '../assets/icons/arrow-down.svg';
import Like from '../assets/icons/like.svg';


const MobilePlayer = (props) =>{
    let { state, dispatch } = useContext(PlayerContext) || {state: 0};
    const [ userLike, setUserLike ] = useState(null);

    const handleLike = (like) =>{
        like === 1
        ? setUserLike(1)
        : setUserLike(0);
    }

    const handleOpenClose = () =>{
        state.playerActive
        ? dispatch({type: "setActive", value: false})
        : dispatch({type: "setActive", value: true});
    }

    const handleExpand = () =>{
        state.playerExpanded
        ? dispatch({type: "setExpand", value: false})
        : dispatch({type: "setExpand", value: true});
    }

    const handlePlayPause = () =>{
        state.playing
        ? dispatch({type: "setPlay", value: false})
        : dispatch({type: "setPlay", value: true});
    }

    return(
        <div className={`PlayerMobile${state.playerActive ? ' opened' : ' closed'}`}>
            <div className={"producer"+(state.playerExpanded ? ' opened' : ' closed')}>
                <div className="photo">
                    <picture>
                        <source srcset={`${process.env.GATSBY_IMAGES_URL}/producers/375/${Object.keys(state.playingNow).length > 0  && state.playingNow.image ? state.playingNow.image.split('.')[0] : 'placeholder'}.webp`} type="image/webp"/>
                        <source srcset={`${process.env.GATSBY_IMAGES_URL}/producers/375/${Object.keys(state.playingNow).length > 0  && state.playingNow.image ? state.playingNow.image.split('.')[0] : 'placeholder'}.jpg`} type="image/jpeg"/>
                        <img src={`${process.env.GATSBY_IMAGES_URL}/producers/375/${Object.keys(state.playingNow).length > 0  && state.playingNow.image ? state.playingNow.image.split('.')[0] : 'placeholder'}.jpg`} alt="Producer"/>
                    </picture>
                </div>
                <div className="data">
                    <div className="time">{Object.keys(state.playingNow).length > 0 ? `${moment(state.playingNow.start, 'HH:mm').format('HH:mm')} - ${moment(state.playingNow.stop, 'HH:mm').format('HH:mm')}` : null}</div>
                    <div className="name">{Object.keys(state.playingNow).length > 0 ? state.playingNow.name : null}</div>
                    <div className="description">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</div>
                    <div className="divider"></div>
                    <div className="next">
                        <span>NEXT ON:</span>
                        <span>{Object.keys(state.playingNext).length > 0 ? `${state.playingNext.name}` : null}</span>
                        <span>{Object.keys(state.playingNext).length > 0 ? `${moment(state.playingNext.start, 'HH:mm').format('HH:mm')} - ${moment(state.playingNext.stop, 'HH:mm').format('HH:mm')}` : null}</span>
                    </div>
                </div>
            </div>
            <div className="actions">
                <div className={state.playerExpanded ? "expand-wrapper active" : "expand-wrapper"}>
                    <div className={state.playerExpanded ? "expand active" : "expand"} onClick={handleExpand}>
                        <span>{state.playerExpanded ? 'HIDE' : 'EXPAND'}</span>
                        <span><ArrowDown /></span>
                    </div>
                </div>
                <div className="close" onClick={handleOpenClose}><Close/></div>
            </div>
            <div className="body">
                <div className="play" onClick={handlePlayPause}>{state.playing ? <Pause/> : <Play/>}</div>
                <div className="producer-info">
                    <span>ONAIR:</span>
                    <span>{state.playingNow.name}</span>
                    <span>{Object.keys(state.playingNow).length > 0 ? `${moment(state.playingNow.start, 'HH:mm').format('HH:mm')} - ${moment(state.playingNow.stop, 'HH:mm').format('HH:mm')}` : null}</span>
                </div>
                <div className="divider"></div>
                <div className="song-info">
                    <span>PLAYING NOW</span>
                    <span>{state.song}</span>
                </div>
                {state.playing
                    ? <>
                    <div className="divider"></div>
                    <div className="like-container">
                        <span className="title">Like / Dislike στο τραγούδι που παίζει!</span>
                        <span className="like-actions">
                            <span className="like"><Like className={userLike ? 'active' : null} onClick={()=>handleLike(1)}/></span>
                            <span className="dislike"><Like className={userLike!== null && !userLike ? 'active' : null} onClick={()=>handleLike(0)}/></span>
                        </span>
                    </div>
                    </>
                    :null
                }
            </div>
        </div>
    )
}

export default memo(MobilePlayer);