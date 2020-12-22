import React from "react"
import {graphql, Link} from "gatsby"
import {MDXRenderer} from "gatsby-plugin-mdx"

import Layout from "components/layout/layout"
import {flex} from "styles/system/shortcuts"

export default ({pageContext, data: {mdx}, ...props}) => {
  const firstHeading =
    mdx.headings && mdx.headings.length ? mdx.headings[0] : null
  const title = mdx.frontmatter.title || (firstHeading && firstHeading.value)

  let titleElem = null
  if (!firstHeading || firstHeading.depth > 1) {
    titleElem = <h1>{title}</h1>
  }

  return (
    <Layout title={title}>
      <article>
        {titleElem}
        <MDXRenderer {...props}>{mdx.body}</MDXRenderer>
      </article>
      <nav css={[flex.row, flex.justifyBetween]}>
        <Link to={pageContext.prev}>Previous</Link>
        <Link to={pageContext.next}>Next</Link>
      </nav>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Story($id: String!) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
      }
      headings {
        value
        depth
      }
      body
    }
  }
`

// export default ({ children, pageContext, ...props }) => {
//   console.log("stories layout!!")
//   console.log(pageContext)
//   console.log(props)
//   return <Layout title={pageContext.frontmatter.title}>{children}</Layout>
// }
