import {css, Global} from "@emotion/core"
import {MuiThemeProvider} from "@material-ui/core"
import {ThemeProvider as EmotionTheme} from "emotion-theming"
import React from "react"
import Helmet from "react-helmet"

import siteMeta from "content/metadata"
import {Footer} from "./footer"
import {Header} from "./header"

import {globalStyles} from "styles/global"
import materialTheme from "styles/material-theme"
import {marginX, paddingX, paddingY} from "styles/system/shortcuts"
import theme, {mq} from "styles/theme"
import h from "components/markup"

export type LayoutProps = Parameters<typeof Layout>[0]

export const Layout = (props: {
  title?: string
  children?: any
  unpadded?: boolean
}) =>
  h.frag(
    h(Global, {styles: globalStyles}),

    h(
      Helmet,
      {
        defaultTitle: siteMeta.title,
        titleTemplate: "%s - " + siteMeta.title,
      },
      [
        h("title", props.title),
        h("meta", {name: "description", content: siteMeta.description}),
        h("meta", {name: "keywords", content: siteMeta.keywords.join(", ")}),
        h("html", {lang: "en"}),
      ]
    ),

    h(EmotionTheme, {theme}, [
      h(Header),
      h(MuiThemeProvider, {theme: materialTheme}, [
        h(
          "main",
          {
            css: [style.content, props.unpadded || style.padded],
          },
          props.children
        ),
      ]),
      h(Footer),
    ])
  )

const style = {
  content: css(
    marginX("auto"),
    mq({
      overflow: "hidden",
      "@media screen": {
        width: theme.fullWidth,
        backgroundColor: theme.colors.lightBackground,
        borderRadius: 2,
      },
    })
  ),
  padded: css(
    mq({
      ...paddingY(4),
      ...paddingX(theme.contentPadding),
    })
  ),
}

export default Layout
