import h from "components/markup"
import {css} from "@emotion/core"
import {Location} from "@reach/router"
import {Link} from "gatsby"
import {NavBar} from "./navbar"
import siteMeta from "content/metadata"
import theme, {mq} from "styles/theme"
import {hideOnPrint} from "styles/global"

export const Header = () => {
  return h.header({css: style.container}, [
    h.h1(null, 
      h(Link, {to: "/", css: style.siteLink}, siteMeta.title)
    ),
    h(Location, ({location}) => h(NavBar, {
      items: siteMeta.navbar,
      activeUrl: location.pathname,
    })),
  ])
}

const style = {
  container: css(
    hideOnPrint,
    mq({
      display: "flex",
      margin: "auto",
      width: theme.fullWidth,
      flexFlow: "column nowrap",
      alignItems: ["center", "flex-start"],
      paddingTop: 4,
      paddingLeft: [0, 3, 4],
    }),
  ),
  siteLink: css(mq({
    color: theme.colors.darkText,
    textDecoration: "none",
    marginLeft: [0, 3],
  })),
}
