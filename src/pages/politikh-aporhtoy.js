import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Header from '../components/header';

import '../styles/static-pages.scss';

const PolitikiAporrhtoy = props => {
    const politiki = props.data.politiki.nodes[0];

    return (
        <Layout {...props}>
            <SEO
                title={politiki.meta_title}
                description={politiki.meta_description}
                url={`${process.env.GATSBY_SITE_URL}/${politiki.slug}`}
            />
            <Header label={politiki.title} slug={politiki.slug} />
            <div className="Static-Pages">
                <div className="content">
                    <div className="text" dangerouslySetInnerHTML={{ __html: politiki.text }} />
                </div>
            </div>
        </Layout>
    );
};

export default PolitikiAporrhtoy;

export const pageQuery = graphql`
    query staticAporrhtoy {
        politiki: allApiStaticPages(filter: { active: { eq: 1 }, slug: { eq: "politikh-aporrhtoy" } }) {
            nodes {
                postID: alternative_id
                created_at
                updated_at
                title
                text
                slug
                meta_title
                meta_description
            }
        }
    }
`;
