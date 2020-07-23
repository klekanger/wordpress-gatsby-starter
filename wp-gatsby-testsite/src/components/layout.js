import React from "react"
// import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import styles from "./layout.module.css"

const Layout = ({ children }) => {
  const {
    data: {
      nodes: [{ generalSettings: data }],
    },
  } = useStaticQuery(
    graphql`
      query {
        data: allWp {
          nodes {
            generalSettings {
              title
              description
            }
          }
        }
      }
    `
  )

  // Retrieve the site title and description from Wordpress
  const title = data.title || "Please set site title in Wordpress"
  const description =
    data.description || "Please set site description in Wordpress"

  return (
    <>
      <Header siteTitle={title} siteDesc={description} />

      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Laget med
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
