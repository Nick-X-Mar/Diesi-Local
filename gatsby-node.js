const path = require(`path`);
// const sharp = require('sharp')

// sharp.simd(false)
// sharp.cache(false)
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;

    const article = path.resolve(`./src/templates/article.js`);
    const articleConcert = path.resolve(`./src/templates/article-concert.js`);
    return graphql(
        `
            {
                allApiArticles(sort: { order: DESC, fields: published_at }, filter: { alternative_id: { ne: null } }) {
                    nodes {
                        postID: alternative_id
                        slug
                        image
                        category {
                            slug
                        }
                    }
                }
            }
        `
    ).then(result => {
        if (result.errors) {
            throw result.errors;
        }

        // Create blog posts pages.
        const posts = result.data.allApiArticles.nodes;
        posts.forEach((post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1];
            const next = index === 0 ? null : posts[index - 1];

            createPage({
                path: `${post.category.slug}/${post.postID}/${post.slug}`,
                component: post.category.slug === 'diesi-in-concert' ? articleConcert : article,
                context: {
                    slug: post.slug,
                    category: post.category.slug,
                    image: post.image,
                    previous,
                    next,
                },
            });
            createPage({
                path: `post/${post.postID}/${post.slug}`,
                component: post.category.slug === 'diesi-in-concert' ? articleConcert : article,
                context: {
                    slug: post.slug,
                    category: post.category.slug,
                    image: post.image,
                    previous,
                    next,
                },
            });
        });

        return null;
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `ApiArticles`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions, getConfig }) => {
    //const config = getConfig()
    // if (stage.startsWith('develop') && config.resolve) {
    //   config.resolve.alias = {
    //     ...config.resolve.alias,
    //     'react-dom': '@hot-loader/react-dom',
    //   }
    // }
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /leaflet/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
};
