import React from 'react';
import axios from 'axios';
import { PlayerContextProvider } from './src/utils/playerContext';

export const wrapRootElement = ({ element }) => <PlayerContextProvider>{element}</PlayerContextProvider>;

export const onInitialClientRender = () => {
    setTimeout(function () {
        document.getElementById('___loader').style.opacity = 0;
        document.getElementById('___loader').style.visibility = 'hidden';
    }, 200); 
};

export const onRouteUpdate = ({ location }) => {
    if (typeof window !== 'undefined') {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', 'UA-16288759-1', {
                page_location: `https://www.diesi.gr${location.pathname}`, // The full URL is required.
            });
        }
        if (typeof window.fbq !== 'undefined') {
            window.fbq('track', 'ViewContent');
        }
    }
    axios.get(`${process.env.GATSBY_API_URL}/analytics?location=${location?.pathname}`);
}; 

export const onServiceWorkerUpdateReady = () => {
    console.log('Update ready');
    window.location.reload(true);
};
