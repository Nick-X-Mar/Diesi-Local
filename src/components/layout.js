import React, { useState, useEffect, useLayoutEffect, memo } from 'react';
import axios from 'axios';

import Footer from './footer';
import SideBar from './sidebar';

import Play from '../assets/icons/round-play.svg';
import Logo from '../assets/icons/logo.svg';
import Menu from '../assets/icons/menu.svg';
import Close from '../assets/icons/close.svg';

import '../styles/reset.scss';
import '../styles/layout.scss';
import { useMediaQuery } from 'react-responsive';
import useInterval from '../utils/useInterval';

const Layout = memo(props => {
    const { children, location } = props;
    const [sideOpen, setSideOpen] = useState(false);
    const [modalDismissed, setDisModal] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(false);
    const [modal, setModal] = useState({ state: false, data: {} });
    const isBigEnough = useMediaQuery({ maxWidth: 768 });

    useEffect(() => {
        axios.get(process.env.GATSBY_API_URL + '/announcement').then(response => {
            if (response.status === 200 && response.data.status === 'success') {
                if (response.data.results !== null) {
                    setModal({
                        state: true,
                        data: response.data.results,
                    });
                    if (typeof window !== 'undefined') {
                        var Plyr = require('plyr');
                        new Plyr(document.querySelectorAll('.Announcement .plyr__video-embed'), {
                            controls: [
                                'play-large',
                                'play',
                                'progress',
                                'current-time',
                                'mute',
                                'volume',
                                'captions',
                                'settings',
                                'pip',
                                'airplay',
                                'fullscreen',
                            ],
                            settings: ['captions', 'quality', 'speed'],
                        });
                    }
                }
            }
        });
    }, []);

    useInterval(() => {
        axios.get(process.env.GATSBY_API_URL + '/announcement').then(response => {
            if (response.status === 200 && response.data.status === 'success') {
                if (response.data.results !== null) {
                    setModal({
                        state: true,
                        data: response.data.results,
                    });
                    if (typeof window !== 'undefined' && !document.querySelector('.Announcement .plyr')) {
                        var Plyr = require('plyr');
                        new Plyr(document.querySelectorAll('.Announcement .plyr__video-embed'));
                    }
                }
            }
        });
    }, 300000);

    useLayoutEffect(() => {
        let time = new Date().getTime();

        //check every 2s
        const resetTime = () => {
            time = new Date().getTime();
        };
        const refresh = () => {
            if (new Date().getTime() - time >= 300000) {
                window.location.reload(true);
            } else {
                setTimeout(refresh, 2000);
            }
        };
        setTimeout(refresh, 2000);

        window.addEventListener('mousemove', resetTime);
        window.addEventListener('scroll', resetTime);
    }, []);

    useEffect(() => {
        if (sideOpen) setSideOpen(false);
    }, [location.pathname]);

    useLayoutEffect(() => {
        var links = document.querySelectorAll('a[target="_blank"]:not([rel])');
        links.forEach(link => {
            if (link.rel !== undefined && link.rel !== null) {
                link.rel = 'noopener noreferrer';
            }
        });
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.addthis === 'object') {
            window.addEventListener('scroll', handleScroll);

            typeof window.addthis === 'object' && window.addthis.init();
        }

        return () => {
            typeof window !== 'undefined' && window.removeEventListener('scroll', handleScroll);
        };
    });

    const handleScroll = () => {
        typeof window !== 'undefined' && window.pageYOffset > 50 ? setHeaderHeight(true) : setHeaderHeight(false);
    };

    const handleOpenPlayer = () => {
        if (typeof window !== 'undefined') {
            window.open('/player', 'Diesi Live', 'location=1,resizable=0,status=1,scrollbars=1,width=350,height=710');
        }

        return null;
    };

    const headerStyle = {
        flexDirection: 'row-reverse',
        width: 'calc(100% - 60px)',
        alignItems: 'flex-start',
        height: 60,
    };
    const logoStyle = { maxWidth: 150, height: '100%' };
    const liveButtonStyle = {
        height: 60,
        borderRadius: 0,
        fontSize: 18,
    };
    const playStyle = {
        height: 32,
        width: 32,
    };
    const isMobile = isBigEnough && headerHeight;

    if (location?.pathname?.includes('player')) {
        return children;
    }

    return (
        <div className="Layout">
            {!sideOpen && (
                <div className="mobile-menu" onClick={() => setSideOpen(!sideOpen)}>
                    <Menu />
                </div>
            )}
            <header style={isMobile ? headerStyle : null}>
                <a style={isMobile ? logoStyle : null} aria-label="Αρχική" title="Αρχική" href="/" class="main-logo">
                    <Logo style={{ height: isMobile ? '100%' : null }} />
                </a>
                <a
                    onClick={handleOpenPlayer}
                    className="listen-live--button"
                    style={isMobile ? liveButtonStyle : null}
                >
                    <Play style={isMobile ? playStyle : null} /> LISTEN LIVE
                </a>
            </header>
            <SideBar sideOpen={sideOpen} setSideOpen={setSideOpen} />
            <main className={sideOpen ? 'open' : null} onClick={() => sideOpen && setSideOpen(false)}>
                {children}
            </main>
            <Footer className={sideOpen ? 'open' : null} />
            {modal.state && !modalDismissed && (
                <div class="Announcement">
                    <div class="wrapper">
                        <link rel="stylesheet" href="https://cdn.plyr.io/3.5.6/plyr.css" />
                        <div class="close" onClick={() => setDisModal(true)}>
                            <Close />
                        </div>
                        <div class="content">
                            <div class="video">
                                <div className="plyr__video-embed">
                                    <iframe
                                        title="Article Video"
                                        src={`https://www.youtube.com/embed/${modal.data.video_id}`}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div class="title">{modal.data.title}</div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Layout;
