const path = require('path');
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    trailingSlash: 'never',
    siteMetadata: {
        title: `Diesi.gr`,
        author: `Diesi`,
        description: `Ενημερωθείτε για τα καλλιτεχνικά δρώμενα και για το πρόγραμμά του σταθμού, και ακούστε live τους αγαπημένους σας ραδιοφωνικούς παραγωγούς & τις αγαπημένες σας εκπομπές. Καλή σας διασκέδαση!`,
        siteUrl: process.env.GATSBY_SITE_URL,
        image: `default.jpg`,
    },
    plugins: [
        `gatsby-plugin-sass`,
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: path.resolve(__dirname, 'src/assets/icons'),
                },
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: path.join(__dirname, `src`, `images`),
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                typePrefix: 'API',
                url: `${process.env.GATSBY_API_URL_INTERNAL}/categories`,
                name: 'categories',
                method: 'get',
                name: 'Categories',
                entityLevel: `data`,
                skipCreateNode: false,
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                typePrefix: 'API',
                url: `${process.env.GATSBY_API_URL_INTERNAL}/static-pages`,
                name: 'staticPages',
                method: 'get',
                name: 'StaticPages',
                entityLevel: `data`,
                skipCreateNode: false,
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                typePrefix: 'API',
                url: `${process.env.GATSBY_API_URL_INTERNAL}/program`,
                name: 'program',
                method: 'get',
                name: 'Program',
                skipCreateNode: false,
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                typePrefix: 'API',
                url: `${process.env.GATSBY_API_URL_INTERNAL}/articles?paginate=false&active=1`,
                name: 'articles',
                method: 'get',
                name: 'Articles',
                entityLevel: `data`,
                skipCreateNode: false,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                typePrefix: 'API',
                url: `${process.env.GATSBY_API_URL_INTERNAL}/carousel-articles`,
                name: 'carousel',
                method: 'get',
                entityLevel: `data`,
                name: 'Carousel',
                skipCreateNode: false,
            },
        },
        {
            resolve: 'gatsby-source-apiserver',
            options: {
                typePrefix: 'API',
                url: `${process.env.GATSBY_API_URL_INTERNAL}/producers`,
                name: 'producers',
                method: 'get',
                entityLevel: `data`,
                name: 'Producers',
                skipCreateNode: false,
            },
        },
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                useMozJpeg: false,
                stripMetadata: true,
                defaultQuality: 75,
                defaults: {
                    pngOptions: {
                        pngCompressionSpeed: 8,
                    },
                },
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: 'gatsby-plugin-sentry',
            options: {
                dsn: 'https://5592c7d925d245c19a66eac1245d0491@o499414.ingest.sentry.io/4504208952852480',
                // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
                environment: process.env.NODE_ENV,
                enabled: (() => ['production'].indexOf(process.env.NODE_ENV) !== -1)(),
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Δίεση 101.3`,
                short_name: `Δίεση`,
                description: `Ενημερωθείτε για τα καλλιτεχνικά δρώμενα και για το πρόγραμμά του σταθμού, και ακούστε live τους αγαπημένους σας ραδιοφωνικούς παραγωγούς & τις αγαπημένες σας εκπομπές. Καλή σας διασκέδαση!`,
                start_url: '/',
                background_color: `#f4da01`,
                theme_color: `#000000`,
                display: `standalone`,
                icon: './src/assets/images/dash.jpg',
                orientation: 'portrait',
                icons: [
                    {
                        src: `favicons/icon-48x48.png`,
                        sizes: `48x48`,
                        type: `image/png`,
                    },
                    {
                        src: `favicons/icon-72x72.png`,
                        sizes: `72x72`,
                        type: `image/png`,
                    },
                    {
                        src: `favicons/icon-96x96.png`,
                        sizes: `96x96`,
                        type: `image/png`,
                    },
                    {
                        src: `favicons/icon-144x144.png`,
                        sizes: `144x144`,
                        type: `image/png`,
                    },
                    {
                        src: `favicons/icon-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `favicons/icon-256x256.png`,
                        sizes: `256x256`,
                        type: `image/png`,
                    },
                    {
                        src: `favicons/icon-384x384.png`,
                        sizes: `384x384`,
                        type: `image/png`,
                    },
                    {
                        src: `favicons/icon-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                entryLimit: 5000,
            },
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                policy: [{ userAgent: '*', allow: '/' }],
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: process.env.GATSBY_SITE_URL,
                stripQueryString: true,
            },
        },
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                // Setting a color is optional.
                color: `#f4da01`,
                // Disable the loading spinner.
                showSpinner: false,
            },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-offline`,
    ],
};
