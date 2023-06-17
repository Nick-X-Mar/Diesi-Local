import React, { useState, useEffect, memo } from 'react';

import { useMediaQuery } from 'react-responsive';

import DiesiLogo from '../assets/icons/logo-in-concert.svg';

import '../styles/header.scss';
import '../styles/category.scss';

const Header = props => {
    const [headerHeight, setHeaderHeight] = useState(false);
    const isBigEnough = useMediaQuery({ minWidth: 1081 });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
        window.pageYOffset > 50 ? setHeaderHeight(true) : setHeaderHeight(false);
    };

    const headerImage = require(`../assets/images/${
        headerHeight && isBigEnough ? props.slug + '-2' : props.slug
    }.jpg`).default;

    const headerStyle = {
        height: headerHeight && isBigEnough ? '75px' : '150px',
        backgroundImage: `url(${headerImage})`,
        paddingRight: !isBigEnough ? 70 : null,
        paddingTop: !isBigEnough ? 20 : null,
    };

    const breadCrumpsStyles = {
        top: headerHeight && isBigEnough ? '10px' : '35px',
        opacity: headerHeight && isBigEnough ? '0' : '1',
    };

    const h1Styles = {
        fontSize: headerHeight && isBigEnough ? '30px' : '45px',
        marginTop: headerHeight && isBigEnough ? null : 25,
    };

    const inConsertLogo = (
        <DiesiLogo
            style={{
                height: headerHeight && isBigEnough ? '30px' : '50px',
                marginTop: headerHeight ? '12px' : '20px',
                marginLeft: headerHeight ? '0px' : '13px',
            }}
        />
    );

    return (
        <div style={headerStyle} className="Header">
            <div style={breadCrumpsStyles} className="arxiki">
                <a aria-label="Αρχική" href="/" style={{ fontSize: headerHeight && isBigEnough ? '12px' : '14px' }}>
                    Αρχική <em style={{ marginRight: 9 }}></em>/<em style={{ marginRight: 7 }}></em>
                    <span style={{ textDecoration: 'underline' }}>{props.label}</span>
                </a>
            </div>
            <h1 style={h1Styles} className="category-name">
                {props.slug === 'diesi-in-concert' ? inConsertLogo : props.label}
            </h1>
        </div>
    );
};

export default memo(Header);
