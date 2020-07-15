import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const {
    data: {
      edges: [{ node: data }],
    },
  } = useStaticQuery(
    graphql`
      query siteMetadata {
        data: allWordpressSiteMetadata {
          edges {
            node {
              name
              description
            }
          }
        }
      }
    `
  )

  return (
    <>
      <Header siteTitle={data.name} siteDesc={data.description} />

      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
