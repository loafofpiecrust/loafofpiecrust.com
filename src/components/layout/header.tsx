import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { NavBar } from "./navbar"
import { siteMeta } from "config/metadata"
import theme, { mq, fullWidthClass } from "styles/theme"
import { hideOnPrint } from "styles/global"
import { marginX } from "styles/system/shortcuts"

export const Header = () => (
  <header css={styles.container}>
    <h1>
      <Link css={styles.siteLink} to="/">
        {siteMeta.title}
      </Link>
    </h1>

    <Location>{({ location }) => (
      <NavBar items={siteMeta.navbar} activeUrl={location.pathname} />
    )}</Location>
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
