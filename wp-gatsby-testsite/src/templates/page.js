// Template used for programmatically creating pages from data fetched from Wordpress
// Used by the createPage function in gatsby-node.js

import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import styles from "./post.module.css"

const pageTemplate = ({ data }) => {
  const { page } = data
  const { title, content } = page
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
export default pageTemplate

// The $id comes from the createPage function in gatsby-node.js
// Query the page with this ID, and use it in this template
export const query = graphql`
  query pageQuery($id: String!) {
    page: wpPage(id: { eq: $id }) {
      title
      content
    }
  }
`
