import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/seo';
import Layout from '../components/layout';
import MainCarousel from '../components/carousel';
import Category from '../components/horizontal-category';

import '../styles/home.scss';

const Index = props => {
    return (
        <Layout {...props}>
            <SEO title="ΔΙΕΣΗ 101.3 - ΤΑΥΤΙΣΟΥ ΕΔΩ!" />
            <div className="Home">
                <div className="carousel">
                    <MainCarousel carousel={props.data.carousel} />
                </div>
                <div className="categories">
                    {props.data.categories.group.map((items, index) => (
                        <Category
                            key={`category_${index}`}
                            slug={items.category}
                            title={items.articles[0].category.label}
                            items={items.articles}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Index;

export const pageQuery = graphql`
    query categoriesArticles {
        categories: allApiArticles(
            sort: { order: DESC, fields: published_at }
            filter: { alternative_id: { ne: null }, active: { eq: 1 }, category: { slug: { nin: ["o-diesi-protinei","sinavlies"] } } } 
        ) {
            group(field: category___slug, limit: 8) {
                category: fieldValue
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
                    }
                }
            }
        }
        carousel: allApiCarousel(limit: 10) {
            nodes {
                postID: alternative_id
                created_at
                slug
                title
                supertitle
                image
                image_alt
                category {
                    label
                    slug
                }
            }
        }
    }
`;
