import React from 'react';
import { PlayerContextProvider } from './src/utils/playerContext';

export const wrapRootElement = ({ element }) => <PlayerContextProvider>{element}</PlayerContextProvider>;
