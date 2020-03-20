import Layout from "components/layout/layout"
import { graphql, Link } from "gatsby"
import { AllPostsQuery } from "graphql-types"
import h from "components/markup"

export default (p: {
  data: AllPostsQuery;
}) => (
    h(Layout, {
      title: "Blog",
    }, p.data.allMdx.nodes.map(({ fields, frontmatter }) => h.section([
      h.h3([
        h(Link, { to: fields.slug }, frontmatter.title),
      ]),
      frontmatter.series && h.div(`Series: ${frontmatter.series}`),
      frontmatter.date,
    ])),
    )
  )

// Retrieve all non-draft blog posts
export const query = graphql`
query AllPosts {
  allMdx(filter: { fields: { collection: { eq: "blog" } }, frontmatter: { draft: { ne: true }}}) {
    nodes {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMM D, Y")
        series
      }
    }
  }
}
`
