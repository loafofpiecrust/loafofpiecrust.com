import { css, Global } from "@emotion/core"
import { MuiThemeProvider } from "@material-ui/core"
import { ThemeProvider as EmotionTheme } from "emotion-theming"
import React from "react"
import Helmet from "react-helmet"

import { siteMeta } from "config/metadata"
import { Footer } from "./footer"
import { Header } from "./header"

import { globalStyles } from "styles/global"
import materialTheme from "styles/material-theme"
import { marginX, paddingX, paddingY } from "styles/system/shortcuts"
import theme, { mq } from "styles/theme"

export const Layout = (props: {
  title?: string;
  children?: any;
  unpadded?: boolean;
}) => <>
  <Global styles={globalStyles} />

  <Helmet
    title={(props.title ? `${props.title} - ` : "") + siteMeta.title}
    meta={[
      { name: "description", content: siteMeta.description },
      { name: "keywords", content: siteMeta.keywords.join(", ") },
    ]}
  >
    <html lang="en"/>
  </Helmet>

  <EmotionTheme theme={theme}>
    <Header />
    <MuiThemeProvider theme={materialTheme}>
      <main css={styles.content(props.unpadded)}>
        {props.children}
      </main>
    </MuiThemeProvider>
    <Footer />
  </EmotionTheme>
</>

const styles = {
  content: (unpadded?: boolean) => css(
    marginX("auto"),
    mq({
      ...paddingX(unpadded ? 0 : theme.contentPadding),
      ...paddingY(unpadded ? 0 : 4),
      overflow: "hidden",
      "@media screen": {
        width: theme.fullWidth,
        backgroundColor: "lightBackground",
        borderRadius: 2,
      },
    }),
  ),
}

export default Layout
