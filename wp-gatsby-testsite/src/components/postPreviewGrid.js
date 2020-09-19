// Grid showing the last X posts

import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styles from "./postPreviewGrid.module.css"

const PostPreviewGrid = props => {
  const excerptLength = 150 // Max characters for front page excerpts

  return (
    <div className={styles.root}>
      <h4 className={styles.headline}>{props.title}</h4>
      <ul className={styles.container}>
        {props.nodes.edges.map(({ node }) => {
          return (
            <li key={node.slug} className={styles.listItem}>
              <Link to={node.uri}>
                {node?.featuredImage?.node?.localFile?.childImageSharp
                  ?.fluid ? (
                  <Img
                    fluid={
                      node?.featuredImage?.node?.localFile?.childImageSharp
                        ?.fluid
                    }
                    alt={node?.featuredImage?.node?.altText}
                  />
                ) : null}
                <h2 className={styles.title}>{node.title}</h2>
              </Link>
              <div
                className={styles.excerpt}
                dangerouslySetInnerHTML={{
                  __html: node.excerpt.slice(0, excerptLength) + "...",
                }}
              />
              <p style={{ color: "#999" }}>Publisert: {node.date}</p>
            </li>
          )
        })}
      </ul>

      <Link to="/allposts/" className={styles.allPostsLink}>
        <h3 className={styles.allPostsLink}>{`>> View all posts`}</h3>
      </Link>
    </div>
  )
}

export default PostPreviewGrid
