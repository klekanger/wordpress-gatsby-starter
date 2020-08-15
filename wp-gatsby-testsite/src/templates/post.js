// Template used for programmatically creating posts from data fetched from Wordpress
// Used by the createPage function in gatsby-node.js

import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./post.module.css"

const PostTemplate = ({ data }) => {
  const { page } = data
  const { title, content } = page
  return (
    <Layout>
      <SEO title={title || "Untitled"} />
      <div className={styles.postContainer}>
        <article>
          <h4 className={styles.blogTitle}>{title}</h4>
          <span
            className={styles.blogText}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
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
    }
  }
`
