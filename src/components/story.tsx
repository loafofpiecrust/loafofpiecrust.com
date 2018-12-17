import React from "react"
import Layout from "./layout"

export default ({ children, pageContext, ...props }) => (
  <Layout title={pageContext.frontmatter.title}>
    {console.log(props["*"])}
    <article>{children}</article>
    <nav>
      <a href={pageContext.previous}>Prev</a>
      <a href={pageContext.next}>Next</a>
    </nav>
  </Layout>
)
