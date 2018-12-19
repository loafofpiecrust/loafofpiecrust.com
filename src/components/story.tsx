import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import Layout from "./layout/layout"
import { Flex } from "styles/system/flex";

export default ({ pageContext, data: { mdx }, ...props }) => {
  const firstHeading = mdx.headings && mdx.headings.length ? mdx.headings[0] : null
  const title = mdx.frontmatter.title || firstHeading.value

  return <Layout title={title}>
    <article>
      {!firstHeading || firstHeading.depth > 1 ?
        <h1>{title}</h1>
      : null}
      
      <MDXRenderer {...props}>{mdx.code.body}</MDXRenderer>
    </article>

    <Flex as="nav" justifyBetween>
      <a href={pageContext.previous}>Prev</a>
      <a href={pageContext.next}>Next</a>
    </Flex>
  </Layout>
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      headings { value }
      code { body }
    }
  }
`