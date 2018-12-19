import { css } from "@emotion/core"

import color from "color"
import theme from "./theme"
import { contrastBackground } from "./system/shortcuts";

export const globalStyles = css({
  html: {
    height: "100%",
    width: "100%",
  },
  body: {
    "@media screen": {
      backgroundColor: theme.colors.background,
    },
    fontFamily: theme.fonts.body,
    color: theme.colors.darkText,
  },
  "h1,h2,h3,h4,h5,header": {
    fontFamily: theme.fonts.header,
    "&:first-of-type": {
      marginTop: 0,
    },
    "&:only-child": {
      marginBottom: 0,
    }
  },
  "@page": {
    size: "auto",
    margin: 0,
  },
  "main a": {
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
  code: {
    border: `1px solid ${theme.colors.link}`,
    padding: 5,
    borderRadius: 3,
    ...contrastBackground("seashell"),
    "&.dark": contrastBackground(theme.colors.darkText),
  }
})


export const hideOnPrint = css({
  "@media print": {
    display: "none",
  }
})