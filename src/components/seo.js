import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ description, type, title, children, url, image }) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `
    );

    const metaDescription = description && description.length > 1 ? description : site.siteMetadata.description;
    const metaTitle = title && title.length > 1 ? title : site.siteMetadata.title;
    const metaURL = url && url.length > 1 ? url : site.siteMetadata.siteUrl;
    const metaImage = image && image.length > 1 ? image : `${process.env.GATSBY_API_URL}/${site.siteMetadata.image}`;
    const metaType = type && type.length > 1 ? type : 'website';

    return (
        <Helmet title={metaTitle} titleTemplate={`%s | Diesi.gr`} defer={false}>
            <meta name="description" content={metaDescription} />
            <meta content="index, follow" name="robots" />

            <meta name="twitter:creator" content="diesi1013" />
            <meta name="twitter:title" content={`${metaTitle} | Diesi.gr`} />
            <meta name="twitter:description" content={metaDescription} />

            <meta itemProp="name" content={`${metaTitle} | Diesi.gr`} />
            <meta itemProp="description" content={metaDescription} />
            <meta itemProp="image" content={metaImage} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@diesi1013" />
            <meta name="twitter:title" content={`${metaTitle} | Diesi.gr`} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:creator" content="@diesi1013" />
            <meta name="twitter:image:src" content={metaImage} />

            <meta property="og:title" content={`${metaTitle} | Diesi.gr`} />
            <meta property="og:url" content={metaURL} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:site_name" content={`${metaTitle} | Diesi.gr`} />
            <meta property="og:type" content={metaType} />
            <meta property="og:locale" content="el_GR" />
            <meta property="og:site_name" content="Δίεση 101,3"></meta>
            <meta property="fb:pages" content="173156569361608" />

            <link rel="shortcut icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="shortcut icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f4da01" />
            <meta name="msapplication-TileColor" content="#f4da01" />
            <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
            <meta name="apple-mobile-web-app-title" content="Diesi.gr" />

            <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script> 
                    <script>
                    {`window.googletag = window.googletag || {cmd: []};
                    googletag.cmd.push(function() {
                    googletag.defineSlot('/4803437/Diesi.gr/Diesi.gr_300x600', [[160, 600], [300, 250], [300, 600]], 'div-gpt-ad-1679412414749-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                });`}  
            </script> 

            <script type="application/ld+json">
                {`{
            "@context": "http://schema.org",
            "@type": "NewsMediaOrganization",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Athens, Greece",
                "postalCode": "14564",
                "streetAddress": "Viltanioti 36, Kifisia"
            },
            "email": "diesi@diesi.gr",
            "logo": "${process.env.GATSBY_IMAGES_URL}/logo.jpg",
            "name": "Δίεση 101,3",
            "telephone": "+30 211 18 92 300",
            "url": "${process.env.GATSBY_SITE_URL}",
            "sameAs": [
                "https://www.youtube.com/user/DIESITAYTISOY",
                "https://www.facebook.com/diesi1013",
                "https://twitter.com/diesi1013",
                "https://instagram.com/diesi1013/"
            ]
          }`}
            </script>
            {children}
        </Helmet>
    );
};

SEO.defaultProps = {
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    type: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default memo(SEO);
