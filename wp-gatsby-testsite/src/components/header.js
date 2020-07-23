import React from "react"
import { Link } from "gatsby"

import styles from "./header.module.css"

const Header = ({ siteTitle, siteDesc }) => {
  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <Link className={styles.siteTitle} to="/">
          <h1>{siteTitle}</h1>
        </Link>
        <h3 className={styles.siteDesc}>{siteDesc}</h3>
      </div>
    </header>
  )
}

export default Header
