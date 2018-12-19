import React from "react"
import Helmet from "react-helmet"

import { Header } from "./header"
import siteConfig from "config"
import { Global, css } from "@emotion/core"
import { ThemeProvider as EmotionTheme } from "emotion-theming"
import { Footer } from "./footer"
import { MuiThemeProvider, Paper } from "@material-ui/core"
import materialTheme from "styles/material-theme"
import theme, { mq } from "styles/theme"
import { globalStyles } from "styles/global"
import { marginX } from "styles/system/shortcuts"

export const Layout = (props: {
  title?: string
  children: any
  unpadded?: boolean
}) => <>
  <Global styles={globalStyles} />

  <Helmet
    title={(props.title ? `${props.title} - ` : "") + siteConfig.title}
    meta={[
      { name: "description", content: siteConfig.description },
      { name: "keywords", content: siteConfig.keywords.join(", ") },
    ]}
  >
    <html lang="en" />
  </Helmet>

  <EmotionTheme theme={theme}>
    <Header />
  </EmotionTheme>

  <MuiThemeProvider theme={materialTheme}>
    <EmotionTheme theme={theme}>
      <main css={styles.content(props.unpadded)}>{props.children}</main>
    </EmotionTheme>
  </MuiThemeProvider>

  <EmotionTheme theme={theme}>
    <Footer />
  </EmotionTheme>
</>

const styles = {
  content: (unpadded?: boolean) => css(
    marginX("auto"),
    mq({
      padding: unpadded ? 0 : 4,
      overflow: "hidden",
      "@media screen": {
        width: theme.fullWidth,
        backgroundColor: "snow",
        borderRadius: 2,
      },
    })
  ),
}

export default Layout
