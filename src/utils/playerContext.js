import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const PlayerContext = createContext();

const initialState = {
    currentPlayer: 'https://stream.rcs.revma.com/gkfwrhqxbfhvv',
    livePlayer: '',
    playerActive: false,
    playerExpanded: false,
    volume: 0.5,
    mute: false,
    playing: true,
    playingNow: {},
    playingNext: {},
    song: { artist: 'Imaging Dragons', song: 'Thunder' },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'reset':
            return initialState;
        case 'setCurrentPlayer':
            return { ...state, currentPlayer: action.value };
        case 'setLivePlayer':
            return { ...state, livePlayer: action.value };
        case 'setActive':
            return {
                ...state,
                playerActive: action.value,
                playerExpanded: !action.value ? false : state.playerExpanded,
            };
        case 'setExpand':
            return { ...state, playerExpanded: action.value };
        case 'setVolume':
            return { ...state, volume: action.value };
        case 'setMute':
            return { ...state, mute: action.value };
        case 'setPlay':
            return { ...state, playing: action.value };
        case 'setPlayingNow':
            return { ...state, playingNow: action.value };
        case 'setPlayingNext':
            return { ...state, playingNext: action.value };
        case 'setSong':
            return { ...state, song: { ...action.value } };
        default:
            return { ...state };
    }
};

const PlayerContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    useEffect(() => {
        axios.get(`${process.env.GATSBY_API_URL}/program`).then(response => {
            // var day = moment().format('dddd').toLowerCase(); //set 'monday' to day below
            const day = moment().day();
            let index = 0;
            const now =
                day === 0 || day === 6
                    ? {
                          producer_id: 'weekend',
                          isLive: true,
                      }
                    : {
                          ...response.data['monday'].filter((item, key) => {
                              index = key;
                              return item.isLive;
                          })[0],
                      };

            const next = { ...response.data['monday'][index] };

            dispatch({ type: 'setPlayingNow', value: { ...now } });
            dispatch({ type: 'setPlayingNext', value: { ...next } });
        });
    }, []);

    return <PlayerContext.Provider value={value}>{props.children}</PlayerContext.Provider>;
};

const PlayerContextConsumer = PlayerContext.Consumer;

export { PlayerContext, PlayerContextProvider, PlayerContextConsumer };
