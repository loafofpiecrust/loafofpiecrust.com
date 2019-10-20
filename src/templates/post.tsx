import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Helmet from "react-helmet"
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
    <Helmet>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/dracula.min.css"/>
    </Helmet>

    <article>
      {titleElem}
      <MDXRenderer {...props}>{mdx.body}</MDXRenderer>
    </article>
    <nav css={[flex.row, flex.justifyBetween]}>
      {pageContext.previous && <a href={pageContext.previous}>Older</a>}
      {pageContext.next && <a href={pageContext.next}>Newer</a>}
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
      body
    }
  }
`
