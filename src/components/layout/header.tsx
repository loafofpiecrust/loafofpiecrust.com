import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"

import { NavBar } from "./navbar"
import siteConfig from "config"
import { mq, fullWidthClass } from "styles/theme"
import { hideOnPrint } from "styles/global"
import { marginX } from "styles/system/shortcuts"
import { css } from "@emotion/core"

export const Header = () => (
  <header css={styles.container}>
    <h1>
      <Link to="/" css={styles.titleLink}>
        {siteConfig.title}
      </Link>
    </h1>

    <Location children={({ location }) => (
      <NavBar items={siteConfig.navbar} activeUrl={location.pathname} />
    )}/>
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
      paddingLeft: 3,
    })
  ),
  titleLink: css(mq({
    color: "snow",
    textDecoration: "none",
    marginLeft: 3,
  })),
}
