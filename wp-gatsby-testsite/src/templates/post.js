// Template used for programmatically creating posts from data fetched from Wordpress
// Used by the createPage function in gatsby-node.js

import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Container from "../components/container"
import SEO from "../components/seo"
import styles from "./post.module.css"

const PostTemplate = ({ data }) => {
  const { page } = data
  const { title, content, featuredImage } = page
  
  return (
    <Layout>
      <SEO title={title || "Untitled"} />
      <Container>
        <article>
          {featuredImage?.node?.localFile?.childImageSharp?.fluid ? (
                <Img 
                  fluid={featuredImage.node.localFile.childImageSharp.fluid}
                  alt={featuredImage?.node?.altText || "Toppbilde"}
                  />
                ) : null
              } 
            <h1 className={styles.blogTitle}>{title}</h1>
            <span
              className={styles.blogText}
              dangerouslySetInnerHTML={{ __html: content }}
            />
        </article>
        </Container>
    </Layout>
  )
}
export default PostTemplate

// The $id comes from the createPage function in gatsby-node.js
// Query the post with this ID, and use it in this template
export const query = graphql`
  query post($id: String!) {
    page: wpPost(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          localFile {
              childImageSharp {
              fluid (maxWidth: 1920) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          altText
        }
      }
    }
  }
`
