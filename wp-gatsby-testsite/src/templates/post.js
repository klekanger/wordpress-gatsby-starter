// Template used for programmatically creating posts from data fetched from Wordpress
// Used by the createPage function in gatsby-node.js

import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import styles from "./post.module.css"

const postTemplate = ({ data }) => {
  const { page } = data
  const { title, content, featuredImage } = page
  return (
    <Layout>
      <div className={styles.postContainer}>
        <article>
          <h4 className={styles.blogTitle}>{title}</h4>
          <div
            className={styles.blogText}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </Layout>
  )
}
export default postTemplate

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
