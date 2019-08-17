import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"
import { css } from "@emotion/core"
import { NavBar } from "./navbar"
import { siteMeta } from "config/metadata"
import theme, { mq, fullWidthClass } from "styles/theme"
import { hideOnPrint } from "styles/global"
import { marginX } from "styles/system/shortcuts"
import { useLocation } from "components/use-location";

export const Header = () => (
  <header css={styles.container}>
    <h1>
      <Link to="/" css={styles.siteLink}>
        {siteMeta.title}
      </Link>
    </h1>

    <NavBar items={siteMeta.navbar} activeUrl={useLocation().pathname} />
  </header>
)

const styles = {
  container: css(
    hideOnPrint,
    fullWidthClass,
    mq({
      ...marginX("auto"),
      flexFlow: "column nowrap",
      alignItems: ["center", "flex-start"],
      paddingTop: 4,
      paddingLeft: [3, 3, 4],
    }),
  ),
  siteLink: css(mq({
    color: theme.colors.lightText,
    textDecoration: "none",
    marginLeft: 3,
  })),
}
