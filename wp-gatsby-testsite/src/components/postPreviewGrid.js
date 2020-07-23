// Grid showing the last X posts

import React from "react"
import { Link } from "gatsby"

import styles from "./postPreviewGrid.module.css"

const PostPreviewGrid = props => {
  return (
    <div className={styles.root}>
      <h4 className={styles.headline}>{props.title}</h4>
      <ul className={styles.container}>
        {props.nodes.edges.map(({ node }) => (
          <li key={node.slug} className={styles.listItem}>
            <Link to={node.uri}>
              <h2 className={styles.title}>{node.title}</h2>
            </Link>
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
            <Link to={node.uri} className={styles.excerpt}>
              Les mer...
            </Link>
            <p style={{ color: "#999" }}>Publisert: {node.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostPreviewGrid
