import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const BlogLink = styled(Link)`
  text-decoration: none;
`;

const BLogTitle = styled.h3`
  margin-bottom: 20px;
`;

const IndexPage = ({ data }) => {
  
  return (
    <Layout>
      <div>
        <h1>My Blog</h1>
        {
          data.allMarkdownRemark.edges.map(({node}) => {
            return (
              <div key={node.id}>
                <BlogLink to={node.fields.slug}>
                  <BLogTitle>
                    {node.frontmatter.title} - {node.frontmatter.date}
                  </BLogTitle>
                </BlogLink>
                <p>{node.excerpt}</p>
              </div>
            )
          })
        }
      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
query {
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        frontmatter {
          date
          description
          title
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
}
`;
