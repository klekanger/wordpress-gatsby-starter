const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const {
    data: {
      allWpPost: { nodes: allPosts },
      allWpPage: { nodes: allPages },
    },
  } = await graphql(`
    query {
      allWpPost {
        nodes {
          id
          uri
        }
      }
      allWpPage {
        nodes {
          id
          uri
        }
      }
    }
  `)

  const postTemplate = path.resolve(`./src/templates/post.js`)
  const pageTemplate = path.resolve(`./src/templates/page.js`)

  allPosts.forEach(post => {
    createPage({
      // will be the url for the page
      path: post.uri,
      // specify the component template of your choice
      component: slash(postTemplate),
      // In the ^template's GraphQL query, 'id' will be available
      // as a GraphQL variable to query for this post's data.
      context: {
        id: post.id,
      },
    })
  })

  allPages.forEach(page => {
    createPage({
      path: page.uri,
      component: slash(pageTemplate),
      context: {
        id: page.id,
      },
    })
  })
}

/* 
// Optional code (may need some customization): 
// 
// Make Wordpress media files available as static files in Gatsby
// so that it's possible to use the gatsby-image plugin for transformation/optimization
// The files are cached, to reduce build time
// Code by Henrik Wirth: https://dev.to/nevernull/gatsby-with-wpgraphql-acf-and-gatbsy-image-72m
// and Robert Marshall: https://dev.to/robmarshall/gatsby-with-wordpress-caching-downloaded-media-images-to-reduce-build-time-1d2m

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  getNode,
  store,
  reporter,
}) => {
  const { createNode, touchNode } = actions

  // Add all media libary images so they can be queried by
  // childImageSharp
  createResolvers({
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        async resolve(source, args, context, info) {
          if (source.sourceUrl) {
            let fileNodeID
            let fileNode
            let sourceModified

            // Set the file cacheID, get it (if it has already been set)
            const mediaDataCacheKey = `wordpress-media-${source.mediaItemId}`
            const cacheMediaData = await cache.get(mediaDataCacheKey)

            if (source.modified) {
              sourceModified = source.modified
            }

            // If we have cached media data and it wasn't modified, reuse
            // previously created file node to not try to redownload
            if (cacheMediaData && sourceModified === cacheMediaData.modified) {
              fileNode = getNode(cacheMediaData.fileNodeID)

              // check if node still exists in cache
              // it could be removed if image was made private
              if (fileNode) {
                fileNodeID = cacheMediaData.fileNodeID
                // https://www.gatsbyjs.org/docs/node-creation/#freshstale-nodes
                touchNode({
                  nodeId: fileNodeID,
                })
              }
            }

            // If we don't have cached data, download the file
            if (!fileNodeID) {
              try {
                // Get the filenode
                fileNode = await createRemoteFileNode({
                  url: source.sourceUrl,
                  store,
                  cache,
                  createNode,
                  createNodeId,
                  reporter,
                })

                if (fileNode) {
                  fileNodeID = fileNode.id

                  await cache.set(mediaDataCacheKey, {
                    fileNodeID,
                    modified: sourceModified,
                  })
                }
              } catch (e) {
                // Ignore
                console.log(e)
                return null
              }
            }

            if (fileNode) {
              return fileNode
            }
          }
          return null
        },
      },
    },
  })
}
 */
