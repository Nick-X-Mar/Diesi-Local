import React from 'react'; 
import PropTypes from 'prop-types'; 


const HTML = props => {
    return (
        <html lang="el" {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE-edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />

                <link
                    rel="preload"
                    importance="low"
                    href="/fonts/ubuntu-condensed/ubuntu-condensed-v16-latin_greek-regular.woff2"
                    as="font"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    importance="low"
                    href="/fonts/ubuntu/ubuntu-v20-latin_greek-regular.woff2"
                    as="font"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    importance="low"
                    href="/fonts/ubuntu/ubuntu-v20-latin_greek-500.woff2"
                    as="font"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    importance="low"
                    href="/fonts/ubuntu/ubuntu-v20-latin_greek-700.woff2"
                    as="font"
                    crossOrigin="anonymous"
                />

                <link
                    rel="preconnect dns-prefetch"
                    crossOrigin="anonymous"
                    href="https://marketingplatform.google.com"
                />
                <link rel="preconnect dns-prefetch" crossOrigin="anonymous" href="https://s7.addthis.com" />
                <link rel="preconnect dns-prefetch" crossOrigin="anonymous" href="https://www.google-analytics.com" />
                <link rel="preconnect dns-prefetch" crossOrigin="anonymous" href="https://stats.g.doubleclick.net" />

                {props.headComponents}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-16288759-1" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'UA-16288759-1');
                        `,
                    }}
                />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-X3G389RRD2" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'G-X3G389RRD2');
                        `,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                            fbq('init', '2362815390497996');
                            fbq('init', '1161895321426822');
                            fbq('track', 'PageView');
                            fbq('track', 'ViewContent');
                        `,
                    }}
                />
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=2362815390497996&ev=PageView&noscript=1"
                    />
                </noscript>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=1161895321426822&ev=PageView&noscript=1"
                    />
                </noscript>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1827303445223898" crossorigin="anonymous"></script>  
                
            </head> 
            <body {...props.bodyAttributes}> 
                <div
                    key={`loader`}
                    id="___loader"
                    style={{
                        backgroundColor: '#f4da01',
                        display: 'flex',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9999999999,
                    }}
                >
                    <div className="loader"></div>
                </div>
                {props.preBodyComponents}
                <noscript key="noscript" id="gatsby-noscript">
                    <link rel="stylesheet" type="text/css" href="/nojs.css"></link>
                    Το site του Δίεση 101.3 χρειάζεται ενεργή την JavaScript για να λειτουργήσει.
                </noscript>
                <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
                {props.postBodyComponents}
                <script
                    type="text/javascript"
                    src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d4014dd59d1d5b2"
                    defer
                ></script>
            </body>
        </html>
    );
};

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
};

export default HTML;
