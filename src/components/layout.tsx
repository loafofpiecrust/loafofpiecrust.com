import React from "react"
import Helmet from "react-helmet"

import Header from "./header"
import siteConfig from "config"
import { css, cx } from "emotion"
import { ThemeProvider } from "styled-components"
import { ThemeProvider as EmotionTheme } from "emotion-theming"
import { Footer } from "./footer"
import { MuiThemeProvider, Paper } from "@material-ui/core"
import materialTheme from "styles/material-theme"
import theme, { mq } from "styles/theme"
import { Column, Flex } from "styles/system/flex"
import { Card } from "styles/system/text"
import { withProps, defaultProps } from "recompose";
import styled from "react-emotion";

export const Layout = (props: {
  title?: string
  children: any
  unpadded?: boolean
}) => (
  <>
    <Helmet
      title={(props.title ? `${props.title} - ` : "") + siteConfig.title}
      meta={[
        { name: "description", content: siteConfig.description },
        { name: "keywords", content: siteConfig.keywords.join(", ") },
      ]}
    >
      <html lang="en" />
    </Helmet>

    <Flex column>
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>

        <MuiThemeProvider theme={materialTheme}>
          <ThemeProvider theme={theme}>
          <EmotionTheme theme={theme}>
            <ContentCard as="main"
              p={props.unpadded ? null : 4}
            >{props.children}</ContentCard>
            </EmotionTheme>
          </ThemeProvider>
        </MuiThemeProvider>

      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    </Flex>
  </>
)

const mx = value => ({ marginRight: value, marginLeft: value })

const ContentCard = styled(Card)(mq({
  ...mx("auto"),
  overflow: "hidden",
  "@media screen": {
    width: theme.fullWidth,
    backgroundColor: "snow",
    borderRadius: 2,
  },
}))

export default Layout
