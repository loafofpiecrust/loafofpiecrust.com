import {graphql} from "gatsby"
import {MDXRenderer} from "gatsby-plugin-mdx"
import Helmet from "react-helmet"
import {flex} from "styles/system/shortcuts"
import {PostQuery} from "graphql-types"
import {MdxContext} from "gen/mdx"
import {PageHeader} from "components/layout/page-header"
import h from "components/markup"


export default ({
  pageContext,
  data: {mdx},
  ...props
}: Props) => {
  const firstHeading = (mdx.headings && mdx.headings.length) ? mdx.headings[0] : null
  const title = mdx.frontmatter.title || (firstHeading && firstHeading.value)

  let titleElem = null
  if (!firstHeading || firstHeading.depth > 1) {
    titleElem = h.frag(
      h.h1(title),
      h.h4([
        "Published on ",
        h("time", {
          dateTime: mdx.frontmatter.machineDate,
        }, mdx.frontmatter.date),
        ` (${mdx.timeToRead} minute read)`,
      ]),
    )
  }

  const hasNav = pageContext.prev || pageContext.next

  return h(PageHeader, {title, header: titleElem}, [
    h(Helmet, [
      h.link({rel: "stylesheet", href: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/dracula.min.css"}),
    ]),

    h.article({}, h(MDXRenderer, props, mdx.body)),

    hasNav && h.nav({css: [flex.row, flex.justifyBetween]}, [
      pageContext.prev && h.a({href: pageContext.prev}, "Older"),
      pageContext.next && h.a({href: pageContext.next}, "Newer"),
    ]),
  ])
}

export const pageQuery = graphql`
  query Post($id: String!) {
    mdx(id: { eq: $id }) {
      body
      headings { value, depth }
      frontmatter {
        title
        date(formatString: "MMM D, Y")
        machineDate: date(formatString:"YYYY-MM-DD")
      }
      timeToRead
    }
  }
`

type Props = {
  data: PostQuery;
  pageContext: MdxContext;
}
