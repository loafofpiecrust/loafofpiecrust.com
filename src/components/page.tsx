import React from "react"
import Layout from "./layout/layout"

export default ({ children, pageContext }) => (
  <Layout title={pageContext.frontmatter.title}>
    {children}
  </Layout>
)
