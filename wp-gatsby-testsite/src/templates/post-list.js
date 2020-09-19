// Template used for programmatically creating
// archive pages listing all posts. Data is fetched from Wordpress
// Used by the createPage function in gatsby-node.js

import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./post-list.module.css"

const PostList = props => {
  const { data } = props
  const posts = data && data.posts

  const { currentPage, numPages } = props.pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title || "Untitled"} />
        <div className={styles.postContainer}>
        <h1>Alle innlegg</h1>
        {posts.nodes.map(post => {
          return (
            
              <div key={post.id} className={styles.listItem}>
                <Link to={post.uri}>
                  <h2 className={styles.blogTitle}>{post.title}</h2>
                  {post?.featuredImage?.node?.localFile?.childImageSharp
                    ?.fluid ? (
                    <Img
                      fluid={
                        post?.featuredImage?.node?.localFile?.childImageSharp
                          ?.fluid
                      }
                      alt={post?.featuredImage?.node?.altText}
                    />
                  ) : null}
                </Link>
                <span
                  className={styles.blogText}
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
                <hr />
              </div>
          )

        })}
          </div>
        <ul className={styles.pageNav}>
          {!isFirst && (
            <Link
              to={`/allposts/${prevPage}`}
              rel="prev"
              className={styles.paginationLeft}
            >
              &#171; Previous Page
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li key={`pagination-number${i + 1}`}>
              <Link
                to={`/allposts/${i === 0 ? "" : i + 1}`}
                className={`${styles.listItem} ${
                  i + 1 === currentPage ? styles.selected : ""
                }`}
              >
                {i + 1}...
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link
              to={`/allposts/${nextPage}`}
              rel="next"
              className={styles.paginationRight}
            >
              Next Page &#187;
            </Link>
          )}
        </ul>
      
    </Layout>
  )
}

export default PostList

export const query = graphql`
  query postPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    posts: allWpPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        uri
        excerpt
        slug
        date(formatString: "DD. MMMM YYYY", locale: "NB-NO")
        title
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            altText
          }
        }
      }
    }
  }
`
