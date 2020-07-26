import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import PostPreviewGrid from "../components/postPreviewGrid"
import GraphqlErrorList from "../components/graphqlErrorList"

import "../styles/globalStyles.css"

// Get Wordpress posts
// Change limit to set max number of posts returned from query
export const query = graphql`
  query allPosts {
    allWpPost(limit: 6, sort: { fields: date, order: DESC }) {
      edges {
        node {
          date(formatString: "DD. MMMM YYYY", locale: "NB-NO")
          slug
          uri
          title
          excerpt
          content
        }
      }
    }
  }
`

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphqlErrorList error={errors} />
      </Layout>
    )
  }

  const postNodes = (data || {}).allWpPost

  // Replace with relevant keywords for your site (for SEO)
  return (
    <Layout>
      <SEO title="Home" keywords={["gatsby", "wordpress", "starter"]} />
      <Container>
        <PostPreviewGrid title="Siste innlegg" nodes={postNodes} />
      </Container>
    </Layout>
  )
}

export default IndexPage
