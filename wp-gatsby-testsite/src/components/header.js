import React from "react"

import styles from "./header.module.css"

const Header = ({ siteTitle, siteDesc }) => {
  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={`${styles.logoColor1} ${styles.branding}`}>
          {siteTitle}
        </h1>
        <h3 className={`${styles.logoColor2} ${styles.branding}`}>
          {siteDesc}
        </h3>
      </div>
    </header>
  )
}

export default Header
