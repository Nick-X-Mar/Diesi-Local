import React, { useContext, memo } from 'react';
import { PlayerContext } from '../utils/playerContext';

import FaceBook from '../assets/icons/facebook.svg';
import Twitter from '../assets/icons/twitter.svg';
import Instagram from '../assets/icons/instagram.svg';
import Email from '../assets/icons/email.svg';
import DefaultAvatar from '../assets/images/avatar.jpg';

const Day = props => {
    const { state } = useContext(PlayerContext) || { state: 0 };
    const { time, producer, avatar, name, desc, social } = props;
    const { facebook, instagram, email, twitter } = social ?? {
        facebook: null,
        instagram: null,
        email: null,
        twitter: null,
    };
    const showSocial = facebook?.length || instagram?.length || email?.length || twitter?.length;
    const playingNow = producer && typeof state === 'object' && producer === state.playingNow.producer_id;

    return (
        <div className={playingNow ? 'day-content live-now-producer' : 'day-content'}>
            <div className="time">
                {time}
                {playingNow && <span className="fixed-live-msg">LIVE NOW</span>}
            </div>
            <div
                style={{
                    backgroundImage: avatar
                        ? `url(${process.env.GATSBY_IMAGES_URL}/producers/224/${avatar})`
                        : `url(${DefaultAvatar})`,
                }}
                className="image"
            />
            <div className="group">
                <div className="info">
                    <div className="time">
                        {time}
                        {playingNow && <span className="fixed-live-msg">LIVE NOW</span>}
                    </div>
                    <div className="title">{name}</div>
                    <div className="text">{desc}</div>
                </div>
                {showSocial && (
                    <div className="social">
                        {facebook?.length && <FaceBook className="social-icon" />}
                        {instagram?.length && <Instagram className="social-icon" />}
                        {email?.length && <Email className="social-icon" />}
                        {twitter?.length && <Twitter className="social-icon" />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Day);
