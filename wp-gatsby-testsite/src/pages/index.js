import React from "react"
import { graphql } from "gatsby"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container"
import PostPreviewGrid from "../components/postPreviewGrid"
import GraphqlErrorList from "../components/graphqlErrorList"

export const query = graphql`
  query allPosts {
    allWpPost(limit: 6, sort: { fields: date, order: DESC }) {
      edges {
        node {
          date
          slug
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

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <PostPreviewGrid title="Siste innlegg" nodes={postNodes} />
      </Container>
    </Layout>
  )
}

export default IndexPage
