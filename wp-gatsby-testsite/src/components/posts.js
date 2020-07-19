import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Posts = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allWpPost {
        edges {
          node {
            slug
            title
            excerpt
            content
          }
        }
      }
    }  
  `)

  return (
    <>
      {data.allWpPost.edges.map(({ node }) => (
        <div key={node.slug}>
          <h2>{node.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    </>
  )
}

export default Posts
