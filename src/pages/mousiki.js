import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import Category from '../components/category';

const Mousiki = props => {
    return (
        <Layout {...props}>
            <SEO
                title={props.data.categories.articles[0].category.meta_title}
                description={props.data.categories.articles[0].category.meta_description}
                url={`${process.env.GATSBY_SITE_URL}/${props.data.categories.articles[0].category.slug}`}
            />
            <Category data={props.data} />
        </Layout>
    );
};

export default Mousiki;

export const pageQuery = graphql`
    query categoryMousiki {
        categories: allApiArticles(
            sort: { order: DESC, fields: published_at }
            filter: { alternative_id: { ne: null }, active: { eq: 1 }, category: { slug: { eq: "mousiki" } } }
        ) {
            articles: nodes {
                postID: alternative_id
                image
                image_alt
                is_video
                published_at
                slug
                title
                supertitle
                category {
                    label
                    slug
                    meta_title
                    meta_description
                }
            }
        }
    }
`;
