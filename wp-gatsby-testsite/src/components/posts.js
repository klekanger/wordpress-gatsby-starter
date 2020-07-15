import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Posts = () => {
  const data = useStaticQuery(graphql`
    query posts {
      allWordpressPost(sort: { fields: date, order: DESC }, limit: 9) {
        edges {
          node {
            title
            content
            id
            slug
            excerpt
            date
            modified
          }
        }
      }
    }
  `)

  return (
    <>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div key={node.slug}>
          <h2>{node.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    </>
  )
}

export default Posts
