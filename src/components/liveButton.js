import React, { useContext, memo } from 'react';

import Live from '../assets/icons/live.svg';

import { PlayerContext } from '../utils/playerContext';

const LiveButton = (props) =>{
    let { state, dispatch } = useContext(PlayerContext) || {state: 0};

    const handleOpenClose = () =>{
        state.playerActive
        ? dispatch({type: "setActive", value: false})
        : dispatch({type: "setActive", value: true});
    }

    return(
        <div className={`LiveButton${state.playerActive ? ' opened' : ''}`} onClick={handleOpenClose}>
            <div className="radio"><Live/></div>
            <div className="text">
                {state.playing ? 'LIVE NOW' : 'LISTEN LIVE'}
            </div>
            <div className="live-led pulse"></div>
        </div>
    )
}

export default memo(LiveButton);