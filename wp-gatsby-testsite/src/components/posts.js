import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Posts = () => {
  const data = useStaticQuery(graphql`
    query getPosts {
      allWpPost(sort: { fields: date, order: DESC }) {
        edges {
          node {
            date
            slug
            title
            excerpt
            content
          }
        }
      }
    }
  `)

  const postNodes = (data || {}).allWpPost

  return (
    <>
      {postNodes.edges.map(({ node }) => (
        <div key={node.slug}>
          <h2>{node.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    </>
  )
}

export default Posts
