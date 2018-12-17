import React from "react"
import { Link } from "gatsby"
import { Location } from "@reach/router"
import { css } from "emotion"

import { NavBar } from "./navbar"
import siteConfig from "config"
import theme, { mq } from "styles/theme"
import { Box } from "styles/system/text"
import { Flex } from "styles/system/flex";
import styled from "react-emotion";
import { hideOnPrint } from "styles/global";

const Header = () => (
  <HeaderBox column as="header" width={theme.fullWidth} mx="auto" pt={4}>
    <h1>
      <SiteTitleLink to="/">
        {siteConfig.title}
      </SiteTitleLink>
    </h1>

    <Location>
      {({ location }) => (
        <NavBar items={siteConfig.navbar} activeUrl={location.pathname} />
      )}
    </Location>
  </HeaderBox>
)

export default Header

const SiteTitleLink = styled(Link)(mq({
  color: "snow",
  textDecoration: "none",
  marginLeft: 3,
}))

const HeaderBox = styled(Flex)(hideOnPrint, mq({
  alignItems: ["center", "flex-start"],
  paddingLeft: 3,
}))