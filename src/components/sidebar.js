import React, { Fragment, useState, useRef, useContext, memo } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import { PlayerContext } from '../utils/playerContext';
import moment from 'moment';

import FaceBook from '../assets/icons/facebook.svg';
import Twitter from '../assets/icons/twitter.svg';
import YouTube from '../assets/icons/yt.svg';
import Instagram from '../assets/icons/instagram.svg';
import Email from '../assets/icons/email.svg';
import RSS from '../assets/icons/rss.svg';
import Menu from '../assets/icons/menu.svg';
import Search from '../assets/icons/search.svg';
import Mousiki from '../assets/icons/mousiki.svg';
import Sinavlies from '../assets/icons/ticket.svg';
import Theatro from '../assets/icons/theatro.svg';
import Diagwnismoi from '../assets/icons/o-diesi-protinei.svg';
import Sinema from '../assets/icons/sinema.svg';
import InConcert from '../assets/icons/in-concept.svg';
import ODiesiProtinei from '../assets/icons/o-diesi-protinei.svg';
import Programa from '../assets/icons/programa.svg';
import Close from '../assets/icons/close.svg';
import Home from '../assets/icons/home.svg';
import Share from '../assets/icons/share.svg';
import Mic from '../assets/icons/live-now.svg'; 

const components = {
    mousiki: Mousiki,
    sinavlies: Sinavlies,
    theatro: Theatro,
    sinema: Sinema, 
    diagwnismoi:Diagwnismoi,
};

const SideBar = props => {
    const [hover, setHover] = useState({ state: false, index: null });
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);
    let { state } = useContext(PlayerContext);
    const searchRef = useRef(0);

    const queries = useStaticQuery(graphql`
        query {
            allApiCategories(
                filter: { slug: { ne: null, nin: ["o-diesi-protinei", "diesi-in-concert"] }, title: { ne: null } }
            ) {
                nodes {
                    title
                    slug
                }
            }
            allApiProgram {
                nodes {
                    monday {
                        name
                        producer_id
                        start
                        stop
                    }
                }
            }
        }
    `);
    const producer =
        state.playingNow.producer_id === 'weekend'
            ? {
                  name: 'Γιώργος Γιαννόπουλος',
                  start: null,
                  stop: null,
              }
            : queries?.allApiProgram?.nodes[0]?.monday?.filter(
                  item => state.playingNow.producer_id === item.producer_id
              )[0];

    const playTime =
        producer?.start && producer?.stop
            ? `${moment(producer.start, 'HH:mm').format('HH:mm')} - ${moment(producer.stop, 'HH:mm').format('HH:mm')}`
            : '';

    const categories = queries.allApiCategories.nodes;

    const filteredCategories = categories.filter(item =>
        ['theatro', 'mousiki', 'sinema', 'diagwnismoi'].includes(item.slug) 
    );

    const handleSearchIconClick = () => {
        props.setSideOpen(!props.sideOpen);
        !props.sideOpen && document.activeElement.id !== searchRef.current.id && searchRef.current.focus();
    };

    const CustomLi = memo(props => {
        return (
            <li
                {...props}
                className={hover.state && hover.index !== null && hover.index === props.index ? 'hover' : null}
                onMouseEnter={() => setHover({ state: true, index: props.index })}
                onMouseLeave={() => setHover({ state: false, index: null })}
            >
                {props.toPage ? (
                    <a aria-label={props.title} title={props.title} href={props.toPage}>
                        {props.children}
                    </a>
                ) : (
                    props.children
                )}
            </li>
        );
    });

    const Social = () => {
        return (
            <div className="Social">
                <a
                    title="Facebook"
                    aria-label="Facebook Page Link"
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
        );
    };

    const aside = () => {
        return (
            <Fragment>
                <div className="small">
                    <ul>
                        <CustomLi title="Menu" index={1} onClick={() => props.setSideOpen(!props.sideOpen)}>
                            <Menu className="menu-icon" />
                        </CustomLi>
                        <li aria-label="Αναζήτηση" title="Αναζήτηση" className="search" onClick={handleSearchIconClick}>
                            <span className="icon">
                                <Search />
                            </span>
                            <span className={searching ? 'action open' : 'action'}></span>
                        </li>
                        <CustomLi title="Αρχική" toPage="/" index={3}> 
                            <Home className="menu-icon" />
                        </CustomLi>
                        <CustomLi
                            title="Diesi in Concert"
                            toPage="/diesi-in-concert"
                            index={4 + filteredCategories.length + 1}
                        >
                            <InConcert className="menu-icon" />
                        </CustomLi>
                        {filteredCategories.map((item, index) => {
                            const Category = components[item.slug];
                            return (
                                <CustomLi title={item.title} toPage={'/' + item.slug} index={5 + index} key={index}>
                                    <Category className="menu-icon" />
                                </CustomLi>
                            );
                        })}
                        <CustomLi title="Πρόγραμμα" toPage="/program" index={4 + filteredCategories.length + 2}>
                            <Programa className="menu-icon" />
                        </CustomLi>
                        <CustomLi
                            title="Share"
                            index={4 + filteredCategories.length + 3}
                            onClick={() => props.setSideOpen(true)}
                        >
                            <Share className="menu-icon" />
                        </CustomLi>
                        <CustomLi
                            title="Live Now"
                            index={4 + filteredCategories.length + 4}
                            onClick={() => props.setSideOpen(true)}
                        >
                            <Mic className="menu-icon" />
                        </CustomLi>
                    </ul>
                </div>
                <div className="large">
                    <ul>
                        <CustomLi title="Close" index={1} onClick={() => props.setSideOpen(!props.sideOpen)}>
                            CLOSE
                            <Close />
                        </CustomLi>
                        <li
                            aria-label="Search"
                            title="Search"
                            className="search"
                            onMouseDown={() => setSearching(true)}
                        >
                            <input
                                name="Search field"
                                label="Search field"
                                aria-label="Search field"
                                ref={searchRef}
                                id="search"
                                type="text"
                                placeholder="ΑΝΑΖΗΤΗΣΤΕ ΠΕΡΙΣΣΟΤΕΡΕΣ ΠΡΟΤΑΣΕΙΣ"
                                autoComplete="off"
                                defaultValue={search}
                                onBlur={() => setSearching(false)}
                                onFocus={() => setSearching(true)}
                                onChange={value => setSearch(value.target.value)}
                            />
                            <span className={searching ? 'action open' : 'action'}>
                                <Link
                                    title="Go to search"
                                    aria-label="Go to search"
                                    to={'/search' + (search.length > 0 ? '?q=' + search : '')}
                                    state={{ term: search }}
                                    onBlur={() => setSearching(false)}
                                    className="Button"
                                >
                                    ΑΝΑΖΗΤΗΣΗ
                                </Link>
                            </span>
                        </li>
                        <CustomLi title="Αρχικη" toPage="/" index={3}>
                            Αρχική
                        </CustomLi>
                        <CustomLi
                            title="Diesi in Concert"
                            toPage="/diesi-in-concert"
                            index={4 + filteredCategories.length + 1}
                        >
                            Diesi in Concert
                        </CustomLi>
                        {filteredCategories.map((item, index) => (
                            <CustomLi toPage={'/' + item.slug} title={item.title} index={5 + index} key={index}>
                                {item.title}
                            </CustomLi>
                        ))}
                        <CustomLi title="Πρόγραμμα" toPage="/program" index={4 + filteredCategories.length + 2}>
                            Πρόγραμμα
                        </CustomLi>
                        <CustomLi title="Socials" index={null}>
                            <Social />
                        </CustomLi>
                        <li aria-label="Live Player" title="Live Player">
                            <span className="title">LIVE NOW</span>
                            {producer ? (
                                <span className="playing">
                                    <span>ONAIR:</span>
                                    <span>{` ${producer.name} ${playTime}`}</span>
                                </span>
                            ) : null}
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
    };
    return <aside className={props.sideOpen ? 'open sideBar' : 'sideBar'}>{aside()}</aside>;
};

export default memo(SideBar);
