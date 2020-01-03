import h from "components/markup"
import Layout from "components/layout/layout"
import {PageHeader} from "components/layout/page-header"

export default ({children, pageContext}) => {
  const title = pageContext.frontmatter.title
  if (title) {
    return h(PageHeader, {title, header: h.h1(title)}, children)
  } else {
    return h(Layout, null, children)
  }
}
