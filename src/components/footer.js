import React, { memo } from 'react';

import FaceBook from '../assets/icons/facebook.svg';
import Twitter from '../assets/icons/twitter.svg';
import YouTube from '../assets/icons/yt.svg';
import Instagram from '../assets/icons/instagram.svg';
import Email from '../assets/icons/email.svg';
import RSS from '../assets/icons/rss.svg';

const Footer = props => {
    return (
        <footer className={props.className}>
            <div className="head">
                <div className="line" />
                <div className="Social">
                    <a
                        title="Facebook"
                        aria-label="Facebook Page Link"
                        style={{ paddingLeft: 20 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.facebook.com/diesi1013"
                    >
                        <FaceBook />
                    </a>
                    <a
                        title="Twitter"
                        aria-label="Twitter Link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://twitter.com/diesi1013"
                    >
                        <Twitter />
                    </a>
                    <a
                        title="YouTube"
                        aria-label="YouTube Page Link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.youtube.com/user/DIESITAYTISOY"
                    >
                        <YouTube />
                    </a>
                    <a
                        title="Instagram"
                        aria-label="Instagram Page Link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://instagram.com/diesi1013/"
                    >
                        <Instagram />
                    </a>
                    <a
                        title="Email"
                        aria-label="Email Link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:diesi@diesi.gr"
                    >
                        <Email />
                    </a>
                    <a
                        title="RSS"
                        aria-label="RSS Link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://diesi.gr/feeds/xml/latest.xml"
                    >
                        <RSS />
                    </a>
                </div>
            </div>
            <div className="body">
                <div className="contact">
                    <span className="title">Επικοινωνία / διεση 101.3</span>
                    <span className="content">Βιλτανιώτη 36, τκ 14564 Κάτω Κηφισιά</span>
                    <a aria-label="Contact form" href="/contact" className="Button">
                        ΕΠΙΚΟΙΝΩΝΙΑ
                    </a>
                </div>
                <div className="telephone">
                    <span className="title">Call Center</span>
                    <a aria-label="Τηλέφωνο" href="tel:2111891013" className="content">
                        211 189 1013
                    </a>
                    <span className="more">
                        <span>
                            εμπορικό{' '}
                            <a aria-label="Τηλέφωνο εμπορικόυ τμήματος" href="tel:2111892310">
                                211 189 2310
                            </a>
                        </span>
                        <span>
                            email{' '}
                            <a aria-label="email" href="mailto:diesi@diesi.gr"> 
                                diesi@diesi.gr
                            </a>
                        </span>
                    </span>
                </div>
                <div className="copyright"> 
                    <div className="policies">
                        {/* <a aria-label="Πολιτική Προσωπικών Δεδομένων" href="/politikh-dedomenon">
                            Πολιτική Δεδομένων
                        </a> */}
                        <a aria-label="Πολιτική Απορρήτου & Cookies" href="/politikh-aporhtoy">
                            Πολιτική Απορρήτου & Cookies
                        </a>
                        <a aria-label="Όροι Διαγωνισμών" href="/oroi-diagwnismwn">
                            Όροι Διαγωνισμών
                        </a>
                    </div> 
                    <div class="credit">© COPYRIGHT 2023 - ALL RIGHTS RESERVED </div> 
                </div>
            </div>
            <script src="https://cookiehub.net/cc/ad711c23.js"></script>
            <script type="text/javascript">
                {typeof window !== 'undefined' &&
                    window.addEventListener('load', function () {
                        typeof window !== 'undefined' &&
                            window?.cookieconsent?.initialise({
                                onInitialise: function (status) {
                                    if (this.hasConsented('required')) {
                                    }
                                    if (this.hasConsented('analytics')) {
                                        // window['ga-disable-UA-16288759-1'] = false;
                                        // window['ga-disable-G-X3G389RRD2'] = false;
                                    }
                                    if (this.hasConsented('marketing')) {
                                        // fbq('track', 'PageView');
                                    }
                                },
                                onAllow: function (category) {
                                    if (category == 'required') {
                                    }
                                    if (category == 'analytics') {
                                        // window['ga-disable-UA-16288759-1'] = false;
                                        // window['ga-disable-G-X3G389RRD2'] = false;
                                    }
                                    if (category == 'marketing') {
                                        // fbq('track', 'PageView');
                                    }
                                },
                                onRevoke: function (category) {
                                    if (category == 'required') {
                                        document.__defineGetter__('cookie', function () {
                                            return '';
                                        });
                                        document.__defineSetter__('cookie', function () {});
                                    }
                                    if (category == 'analytics') {
                                        // window['ga-disable-UA-16288759-1'] = true;
                                        // window['ga-disable-G-X3G389RRD2'] = true;
                                    }
                                    if (category == 'marketing') {
                                    }
                                },
                            });
                    })}
            </script>
        </footer>
    );
};

export default memo(Footer);
