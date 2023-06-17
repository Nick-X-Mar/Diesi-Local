import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Script } from "gatsby";

import FaceBook from '../assets/icons/facebook.svg';
import Twitter from '../assets/icons/twitter.svg';
import Email from '../assets/icons/email.svg';
import Like from '../assets/icons/like.svg';
import Arrow from '../assets/icons/arrow-down.svg';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Article from '../components/small-article';
import { Desktop, Mobile } from '../utils/variables';

const getLikesFromStorage = () => typeof window !== 'undefined' && JSON.parse(localStorage.getItem('likes'));

const ArticleTemplate = props => {
    const post = props.data.apiArticles;
    const file = props.data.file;
    const { previous, next } = props.pageContext;
    const [likes, setLikes] = useState({ likes: 0, dislikes: 0 });
    const [userLiked, setUserLiked] = useState(getLikesFromStorage || null);
    const imageData = getImage(file?.childImageSharp);

    const readMore = props.data.readMore.nodes;

    const articleURL = encodeURI(`${process.env.GATSBY_SITE_URL}/${post.category.slug}/${post.postID}/${post.slug}/`);

    useEffect(() => {
        axios.get(`${process.env.GATSBY_API_URL}/likes/article/${post.postID}`).then(res => {
            if (res.status === 200 && res.data.status === 'success') {
                setLikes(res.data.results);
            }
        });
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            var Plyr = require('plyr');
            Array.from(document.querySelectorAll('.plyr__video-embed')).map(p => new Plyr(p));
        }
    });

    const YourScriptAd = () =>{

        return <>
           <div id='div-gpt-ad-1679412414749-0'
           style={{minWidth: 160 , maxHeight: 250}}>   
           <Script dangerouslySetInnerHTML= {{ __html: ` 
                googletag.cmd.push(function() { googletag.display('div-gpt-ad-1679412414749-0'); }); `}} />   
            </div>
        </> 
        }   

    const handleLike = reaction => {
        if (userLiked && userLiked.hasOwnProperty(post.postID) && userLiked[post.postID] === reaction) {
            axios
                .post(`${process.env.GATSBY_API_URL}/likes/article/${post.postID}/delete`, { reaction: reaction })
                .then(res => {
                    if (res.status === 200 && res.data.status === 'success') {
                        setLikes(res.data.results);
                        const newLikes = { ...userLiked };
                        delete newLikes[post.postID];
                        setUserLiked({ ...newLikes });
                        typeof window !== 'undefined' && localStorage.setItem('likes', JSON.stringify(newLikes));
                    }
                });
        } else {
            axios
                .post(`${process.env.GATSBY_API_URL}/likes/article/${post.postID}`, {
                    reaction: reaction,
                })
                .then(res => {
                    if (res.status === 200 && res.data.status === 'success') {
                        if (userLiked && userLiked.hasOwnProperty(post.postID)) {
                            axios
                                .post(`${process.env.GATSBY_API_URL}/likes/article/${post.postID}/delete`, {
                                    reaction: !reaction,
                                })
                                .then(res => {
                                    if (res.status === 200 && res.data.status === 'success') {
                                        setLikes(res.data.results);
                                    }
                                });
                            const newLikes = { ...userLiked };
                            newLikes[post.postID] = reaction;
                            setUserLiked({ ...newLikes });
                            typeof window !== 'undefined' && localStorage.setItem('likes', JSON.stringify(newLikes));
                        } else {
                            setLikes(res.data.results);
                            const newLikes = { ...userLiked, [post.postID]: reaction };
                            setUserLiked({ ...newLikes });
                            typeof window !== 'undefined' && localStorage.setItem('likes', JSON.stringify(newLikes));
                        }
                    }
                });
        }
    };
    String.prototype.stripSlashes = function () {
        return this.replace(/\\(.)/gm, '$1');
    };
 
    return (
        <Layout location={props?.location}>
            <SEO
                type="article"
                url={articleURL}
                title={post?.meta_title || post?.title}
                description={post?.meta_description || post?.supertitle}
                image={`${process.env.GATSBY_IMAGES_URL}/articles/social/${post?.image}`}
            >
                {post?.published_time && (
                    <meta property="article:published_time" content={moment(post?.published_time).toISOString()} />
                )}
                {post?.modified_time && (
                    <meta property="article:modified_time" content={moment(post?.modified_time).toISOString()} />
                )}
                <meta property="article:section" content={post?.category?.label} />
                <link rel="canonical" href={articleURL} />
                <script type="application/ld+json">
                    {`{
                        "@context": "https://schema.org/",
                        "@type": "BreadcrumbList",
                        "itemListElement": [{
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Αρχικη",
                        "item": "${process.env.GATSBY_SITE_URL}/"
                        },{
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Δίεση In Concert",
                        "item": "${process.env.GATSBY_SITE_URL}/${post?.category?.slug}"
                        },{
                        "@type": "ListItem",
                        "position": 3,
                        "name": "${post.title}",
                        "item": "${articleURL}"
                        }]
                    }`}
                </script>
                <script type="application/ld+json">
                    {`{
                        "@context": "http://schema.org",
                        "@type": "Article",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "${articleURL}"
                        },
                        "headline": "${post.meta_title}",
                        "image": {
                            "@type": "ImageObject",
                            "url": "${process.env.GATSBY_IMAGES_URL}/articles/social/${post.image}",
                            "width": 1920,
                            "height": 1080
                        },
                        "datePublished": "${moment(post.published_time).format('Y-m-d')}",
                        "author": {
                            "@type": "NewsMediaOrganization",
                            "name": "Diesi.gr"
                        },
                        "dateModified": "${moment(post.modified_time).format('Y-m-d')}",
                        "publisher": {
                            "@type": "NewsMediaOrganization",
                            "name": "Diesi.gr",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${process.env.GATSBY_IMAGES_URL}/logo.png",
                                "width": "316",
                                "height": "215"
                            },
                            "sameAs": [
                                "https://www.youtube.com/user/DIESITAYTISOY",
                                "https://www.facebook.com/diesi1013",
                                "https://twitter.com/diesi1013",
                                "https://instagram.com/diesi1013/"
                            ]
                        },
                        "description": "${post?.meta_description ? post?.meta_description?.stripSlashes() : ''}"
                        }`}
                </script>
                {post?.is_video?.length > 1 && (
                    <script type="application/ld+json">
                        {`{
                            "@context": "https://schema.org",
                            "@type": "VideoObject",
                            "name": "${post?.meta_title}",
                            "description": "${post?.meta_description}",
                            "thumbnailUrl": "${process.env.GATSBY_IMAGES_URL}/articles/social/${post?.image}",
                            "uploadDate": "${moment(post?.published_time).format('Y-m-d')}",
                            "publisher": {
                            "@type": "Organization",
                            "name": "Diesi.gr",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "${process.env.GATSBY_IMAGES_URL}/logo.jpg",
                                "width": "316",
                                "height": "215"
                            }
                            }
                        }`}
                    </script>
                )}
                <link rel="stylesheet" href="https://cdn.plyr.io/3.5.6/plyr.css" />
            </SEO>
            <div className="article-back">
                <GatsbyImage style={{ height: '100%', width: '100%' }} image={imageData} alt={post.image_alt} />
            </div>
            <div className="Article page">
                <div className="wrapper">
                    <div className="breadcrumbs">
                        <Link aria-label="Αρχική" to="/">
                            Αρχική
                        </Link>
                        <em>/</em>
                        <Link aria-label={post.title} to={`/${post.category.slug}`}>
                            {post.category.label}
                        </Link>
                        <em>/</em>
                        <Link
                            style={{ textDecoration: 'underline' }}
                            aria-label={post.title}
                            to={`/${post.category.slug}/${post.postID}/${post.slug}`}
                        >
                            {post.title}
                        </Link>
                    </div>
                    <div className="image">
                        {post?.is_video?.length > 1 && (
                            <div className="plyr__video-embed">
                                <iframe
                                    title="Article Video"
                                    src={`https://www.youtube.com/embed/${post.is_video}`}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        )}
                        <GatsbyImage
                            image={imageData}
                            alt={post.image_alt}
                            imgStyle={{
                                height: 'auto',
                                objectFit: 'contain',
                                left: -50,
                                width: '110%',
                            }}
                        />
                    </div>
                    <div className="supertitle">{post.supertitle}</div>
                    <div className="title">{post.title}</div>
                    <div className="social">
                        <a
                            href={`https://facebook.com/sharer/sharer.php?u=${articleURL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Facebook"
                        >
                            <FaceBook />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet/?text=${encodeURI(
                                post.title + ' #diesi1013'
                            )}&url=${articleURL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share on Twitter"
                        >
                            <Twitter />
                        </a>
                        <a
                            href={`mailto:?subject=${encodeURI(post.title)}&body=${encodeURI(articleURL)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Share with Email"
                        >
                            <Email />
                        </a>
                    </div>
                    <div className="intro">{post.intro}</div>
                    <div className="main-area">
                        <div className="social">
                            <a
                                href={`https://facebook.com/sharer/sharer.php?u=${articleURL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share on Facebook"
                            >
                                <FaceBook />
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet/?text=${encodeURI(
                                    post.title + ' #diesi1013'
                                )}&url=${articleURL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share on Twitter"
                            >
                                <Twitter />
                            </a>
                            <a
                                href={`mailto:?subject=${encodeURI(post.title)}&body=${encodeURI(articleURL)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Share with Email"
                            >
                                <Email />
                            </a>
                        </div>
                        <div className="data">
                            <div className="text" dangerouslySetInnerHTML={{ __html: post.text }} />
                            {post.info && post.info.length > 0 && (
                                <div className="info-wrapper">
                                    <div className="title">INFO</div>
                                    <div className="info" dangerouslySetInnerHTML={{ __html: post.info }} />
                                </div>
                            )}
                            <Mobile>
                                <div className="ad"> 
                                    <YourScriptAd />
                                </div>
                            </Mobile>
                            <div className="actions">
                                <span className="title">ΕΝΔΙΑΦΕΡΟΝ</span>
                                <span className="like">
                                    <Like
                                        className={
                                            userLiked && userLiked.hasOwnProperty(post.postID) && userLiked[post.postID]
                                                ? 'active'
                                                : null
                                        }
                                        onClick={() => handleLike(1)}
                                    />
                                    {likes.likes}
                                </span>
                                <span className="dislike">
                                    <Like
                                        className={
                                            userLiked &&
                                            userLiked.hasOwnProperty(post.postID) &&
                                            !userLiked[post.postID]
                                                ? 'active'
                                                : null
                                        }
                                        onClick={() => handleLike(0)}
                                    />
                                    {likes.dislikes}
                                </span>
                            </div>
                            <ul className="pagination">
                                <li>
                                    {previous && (
                                        <Link
                                            to={`/${previous.category.slug}/${previous.postID}/${previous.slug}`}
                                            rel="prev"
                                        >
                                            <Arrow />
                                            ΠΡΟΗΓΟΥΜΕΝΟ
                                        </Link>
                                    )}
                                </li>
                                <li className="divider"></li>
                                <li>
                                    {next && (
                                        <Link to={`/${next.category.slug}/${next.postID}/${next.slug}`} rel="next">
                                            ΕΠΟΜΕΝΟ
                                            <Arrow />
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <Desktop>
                            <div className="ad">
                                <YourScriptAd /> 
                            </div>
                        </Desktop>
                    </div>
                </div>
                <div className="more">
                    <div className="title">Δείτε περισσότερα</div>
                    <div className="articles">
                        {readMore.map((item, key) => (
                            <Article key={`article_${key}`} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ArticleTemplate;

export const pageQuery = graphql`
    query SiteArticlesBySlug($slug: String!, $category: String!, $image: String!) {
        readMore: allApiArticles(
            limit: 4
            filter: { slug: { ne: $slug }, category: { slug: { eq: $category } }, title: { ne: null } }
        ) {
            nodes {
                postID: alternative_id
                image
                image_alt
                published_at
                slug
                supertitle
                title
                category {
                    slug
                    label
                }
            }
        }
        file(relativePath: { eq: $image }) {
            childImageSharp {
                gatsbyImageData(breakpoints: [480, 960, 1920], placeholder: BLURRED, formats: [AUTO, WEBP], quality: 80)
            }
        }
        apiArticles(slug: { eq: $slug }) {
            active
            postID: alternative_id
            created_at(formatString: "DD/MM/YY")
            image
            image_alt
            meta_description
            meta_title
            published_at(formatString: "DD/MM/YY")
            slug
            source
            supertitle
            text
            title
            intro
            info
            is_video
            updated_at(formatString: "DD/MM/YY")
            published_time: published_at
            modified_time: updated_at
            category {
                label
                slug
            }
        }
    }
`;
