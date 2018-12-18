import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import Layout from "./layout"

export default ({ pageContext, data: { mdx }, ...props }) => <Layout>
  <article><MDXRenderer>{mdx.code.body}</MDXRenderer></article>
  <nav>
    <a href={pageContext.previous}>Prev</a>
    <a href={pageContext.next}>Next</a>
  </nav>
</Layout>

export const pageQuery = graphql`
query($id: String!) {
  mdx(id: { eq: $id }) {
    frontmatter {
      title
    }
    code {
      body
    }
  }
}
`