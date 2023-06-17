import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Header from '../components/header';

import '../styles/static-pages.scss';

const OroiDiagonismou = props => {
    const oroi = props.data.oroi.nodes[0];

    return (
        <Layout {...props}>
            <SEO
                title={oroi.meta_title}
                description={oroi.meta_description}
                url={`${process.env.GATSBY_SITE_URL}/${oroi.slug}`}
            />
            <Header label={oroi.title} slug={oroi.slug} />
            <div className="Static-Pages">
                <div className="content">
                    <div className="text" dangerouslySetInnerHTML={{ __html: oroi.text }} />
                </div>
            </div>
        </Layout>
    );
};

export default OroiDiagonismou;

export const pageQuery = graphql`
    query staticOroi {
        oroi: allApiStaticPages(filter: { active: { eq: 1 }, slug: { eq: "oroi-diagwnismwn" } }) {
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
