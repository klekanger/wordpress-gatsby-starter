import React from "react"

import styles from "./postPreviewGrid.module.css"

const PostPreviewGrid = props => {
  return (
    <div className={styles.root}>
      <h4 className={styles.headline}>{props.title}</h4>
      <ul className={styles.container}>
        {props.nodes.edges.map(({ node }) => (
          <li key={node.slug} className={styles.listItem}>
            <h2 className={styles.title}>{node.title}</h2>
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: node.excerpt }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostPreviewGrid
