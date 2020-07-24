import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

import styles from "./404.module.css"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className={styles.postContainer}>
      <h1 className={styles.header}>Her var det ingenting!</h1>
      <p>Det ser ut til at du har havnet på en side som ikke finnes.</p>
      <p>Trist!</p>
      <Link to="/" className={styles.backLink}>
        Gå tilbake til forsiden »
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
