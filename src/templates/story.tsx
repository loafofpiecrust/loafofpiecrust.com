import React from "react"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

import Layout from "components/layout/layout"
import { flex } from "styles/system/shortcuts"

export default ({
  pageContext,
  data: { mdx },
  ...props
}) => {
  const firstHeading = (mdx.headings && mdx.headings.length) ? mdx.headings[0] : null
  const title = mdx.frontmatter.title || (firstHeading && firstHeading.value)

  let titleElem = null
  if (!firstHeading || firstHeading.depth > 1) {
    titleElem = <h1>{title}</h1>
  }

  return <Layout title={title}>
    <article>
      {titleElem}
      <MDXRenderer {...props}>{mdx.code.body}</MDXRenderer>
    </article>
    <nav css={[flex.row, flex.justifyBetween]}>
      <a href={pageContext.previous}>Previous</a>
      <a href={pageContext.next}>Next</a>
    </nav>
  </Layout>
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      headings { value, depth }
      code { body }
    }
  }
`
