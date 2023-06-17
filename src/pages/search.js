import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Article from '../components/small-article';

import SearchIcon from '../assets/icons/search.svg';
import Arrow from '../assets/icons/arrow-down.svg';
import Logo from '../assets/icons/logo.svg';
import Sad from '../assets/icons/sad-face.svg';

import '../styles/search.scss';

const Header = ({ headerHeight, search, handleChange }) => {
    const isBigEnough = useMediaQuery({ minWidth: 1081 });
    return (
        <div
            className="head"
            style={{ height: headerHeight && isBigEnough ? '75px' : isBigEnough ? '150px' : '200px' }}
        >
            <div className="title">ΑΝΑΖΗΤΗΣΤΕ ΠΕΡΙΣΣΟΤΕΡΕΣ ΠΡΟΤΑΣΕΙΣ</div>
            <div className="input">
                <input
                    key="search"
                    type="text"
                    placeholder="ΑΝΑΖΗΤΗΣΗ"
                    autoComplete="off"
                    defaultValue={search}
                    onBlur={handleChange}
                />
                <div className="button">
                    <SearchIcon />
                </div>
            </div>
        </div>
    );
};

const Search = props => {
    const { location } = props;
    const query = new URLSearchParams(location?.search);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState(location?.state?.term ?? query.get('q') ?? '');
    const [headerHeight, setHeaderHeight] = useState(false);
    const [lazy, setLazy] = useState(20);

    useEffect(() => {
        const handleScroll = () => (window.pageYOffset > 50 ? setHeaderHeight(true) : setHeaderHeight(false));

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        if (location?.state?.term?.length > 2) {
            axios.post(process.env.GATSBY_API_URL + '/search', { q: location?.state?.term }).then(res => {
                setLazy(20);
                setResults([...res.data.data]);
                props.navigate('/search?q=' + location?.state?.term);
            });
        }
    }, [location]);

    useEffect(() => {
        if (search.length > 2) {
            axios.post(process.env.GATSBY_API_URL + '/search', { q: search }).then(res => {
                setLazy(20);
                setResults([...res.data.data]);
                props.navigate('/search?q=' + search);
            });
        }
    }, [search]);

    const handleLazyLoading = () => {
        setLazy(lazy + 20);
    };

    const NoSearch = () => {
        return (
            <div className="results no-search">
                <div className="placeholder">
                    <div className="icon">
                        <Logo />
                    </div>
                    <Link to="/" className="home">
                        <span>ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ</span>
                        <span>
                            <Arrow />
                        </span>
                    </Link>
                </div>
            </div>
        );
    };

    const WithResults = () => {
        return (
            <div className="results">
                <div className="articles" style={results.length <= lazy ? { paddingBottom: 50 } : null}>
                    {results.slice(0, lazy).map((article, key) => (
                        <Article key={`article_${key}`} data={article} />
                    ))}
                </div>
                {results.length > lazy && (
                    <div className="button-wrapper">
                        <div onClick={handleLazyLoading} className="Button">
                            ΠΕΡΙΣΣΟΤΕΡΕΣ ΠΡΟΤΑΣΕΙΣ
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const NoResults = () => {
        return (
            <div className="results empty">
                <div className="placeholder">
                    <div className="icon">
                        <Sad />
                    </div>
                    <div className="title">ΔΕΝ ΒΡΕΘΗΚΑΝ ΑΠΟΤΕΛΕΣΜΑΤΑ</div>
                    <Link to="/" className="home">
                        <span>ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΑΡΧΙΚΗ ΣΕΛΙΔΑ</span>
                        <span>
                            <Arrow />
                        </span>
                    </Link>
                </div>
            </div>
        );
    };

    const handleChange = useCallback(value => setSearch(value.target.value));

    return (
        <Layout {...props}>
            <SEO
                title={'Αναζήτηση' + (search.length > 0 ? ': ' + search : '')}
                description={`Αποτελέσματα αναζήτησης στο site του Δίεση${
                    search.length > 0 ? 'για τον όρο: ' + search : null
                }`}
            />
            <div className="Search">
                <Header headerHeight={headerHeight} search={search} handleChange={handleChange} />
                <div className="results-title">Αναζήτηση</div>
                {search.length > 0 ? results.length > 0 ? <WithResults /> : <NoResults /> : <NoSearch />}
            </div>
        </Layout>
    );
};

export default Search;
