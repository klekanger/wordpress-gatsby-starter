import React from "react"
// import PropTypes from "prop-types"
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
      query {
        data: allWp {
          edges {
            node {
              generalSettings {
                title
                description
              }
            }
          }
        }
      }
    `
  )

  return (
    <>
    {console.log(data)}
      <Header siteTitle={data.generalSettings.title} siteDesc={data.generalSettings.description} />

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
