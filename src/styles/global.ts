import {css} from "@emotion/core"

import color from "color"
import theme from "./theme"
import {contrastBackground} from "./system/shortcuts"
import typography from "./typography"

import "typeface-arvo"
import "typeface-cabin"

export const globalStyles = css(typography.createStyles(), {
  // Most pages work great without JS,
  // so don't show the message asking for it.
  "#gatsby-noscript": {
    display: "none",
  },
  html: {
    height: "100%",
    width: "100%",
  },
  body: {
    "@media screen": {
      backgroundColor: theme.colors.background,
      color: theme.colors.darkText,
    },
    fontFamily: theme.fonts.body,
    color: "black",
  },
  "h1,h2,h3,h4,h5,header": {
    fontFamily: theme.fonts.header,
    "&:first-of-type": {
      marginTop: 0,
    },
    "&:only-child": {
      marginBottom: 0,
    },
  },
  "@page": {
    size: "auto",
    margin: 0,
  },
  "main a, footer a": {
    color: "inherit",
    textDecoration: "none",
    borderBottom: `2px dashed ${theme.colors.link}`,
    transition: `all ${theme.transitionTime}`,
    "&:hover, &:active": {
      // borderBottomColor: "transparent",
      color: theme.colors.link,
    },
  },
  blockquote: {
    borderLeftColor: theme.colors.link,
    borderLeftStyle: "solid",
    fontStyle: "italic",
    backgroundColor: "lavenderblush",
    color: color(theme.colors.darkText).fade(0.1).string(),
  },
  ":not(pre) code": {
    border: `1px solid ${theme.colors.link}`,
    padding: "2px 4px",
    borderRadius: 3,
    ...contrastBackground("seashell"),
    "&.dark": contrastBackground(theme.colors.darkText),
  },
})

export const hideOnPrint = css({
  "@media print": {
    display: "none",
  },
})
