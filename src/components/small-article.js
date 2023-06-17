import React, { memo, useMemo } from 'react';
import moment from 'moment';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useMediaQuery } from 'react-responsive';

import Share from '../assets/icons/share.svg';

const SmallArticle = (props) => {
    const isBigEnough = useMediaQuery({ minWidth: 525 });
    const data = useStaticQuery(graphql`
        query {
            allFile(filter: { internal: { mediaType: { regex: "images/" } } }) {
                edges {
                    node {
                        relativePath
                        childImageSharp {
                            gatsbyImageData(
                                breakpoints: [480, 960, 1920]
                                placeholder: BLURRED
                                formats: [AUTO, WEBP]
                                quality: 80
                            )
                        }
                    }
                }
            }
        }
    `);

    const match = useMemo(
        () => data.allFile.edges.find(({ node }) => props.data.image === node.relativePath),
        [data, props.data.image]
    );
    const image = getImage(match?.node?.childImageSharp) ?? '';

    const titleCut = isBigEnough ? 55 : 35;
    const superTitleCut = isBigEnough ? 60 : 45;

    return (
        <Link
            className={`Article small ${props.className}`}
            to={`/${props.data.category.slug}/${props.data.postID}/${props.data.slug}`}
        >
            <GatsbyImage image={image} alt={props.data.image_alt} className="placeholder" />
            <div className="image">
                <div className="share-wrapper addthis_toolbox">
                    <object
                        onClick={(e) => {
                            e.preventDefault();
                            window.addthis.toolbox('.addthis_toolbox');
                        }}
                    >
                        <a
                            aria-label="Share"
                            data-addthis-title={`${props.data.title} | Diesi.gr`}
                            data-addthis-url={`${process.env.GATSBY_SITE_URL}/${props.data.category.slug}/${props.data.postID}/${props.data.slug}`}
                            className="addthis_button_compact"
                        >
                            <Share style={{ pointerEvents: 'none' }} />
                        </a>
                    </object>
                </div>
            </div>
            <div className="body">
                <span className="details">
                    {props.data.supertitle &&
                        (props.data.supertitle.length > superTitleCut
                            ? `${props.data.supertitle
                                  .replace(/[&]nbsp[;]/gi, '')
                                  .replace(/\s{2,}/g, ' ')
                                  .substring(0, superTitleCut)}...`
                            : props.data.supertitle)}
                </span>
                <h3>
                    {props.data.title.length > titleCut
                        ? `${props.data.title
                              .replace(/[&]nbsp[;]/gi, '')
                              .replace(/\s{2,}/g, ' ')
                              .substring(0, titleCut)}...`
                        : props.data.title}
                </h3>
                <div className="sub">
                    <span>
                        {props.data.category.label
                            .toLocaleUpperCase()
                            .normalize('NFD')
                            .replace(/[\u0300-\u036f]/g, '')} 
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default memo(SmallArticle);
