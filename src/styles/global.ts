import { css } from "@emotion/core"

import gray from "gray-percentage"
import theme from "./theme"

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
    color: theme.colors.blackText,
  },
  "h1,h2,h3,h4,h5,header": {
    fontFamily: theme.fonts.header,
    "&:first-of-type": {
      marginTop: 0,
    },
  },
  "@page": {
    size: "auto",
    margin: 0,
  },
  "main a": {
    // color: theme.linkColor,
    color: "inherit",
    textDecoration: "none",
    borderBottom: `2px dashed ${theme.linkColor}`,
    transition: `all ${theme.transitionTime}`,
    "&:hover, &:active": {
      // borderBottomColor: "transparent",
      color: theme.linkColor,
    },
  },
  blockquote: {
    borderLeftColor: theme.linkColor,
    borderLeftStyle: "solid",
    fontStyle: "italic",
    backgroundColor: "lavender",
    color: gray(30),
  },
  code: {
    border: `1px solid ${theme.linkColor}`,
    padding: 5,
    borderRadius: 3,
    backgroundColor: "seashell",
    "&.dark": {
      backgroundColor: 'black',
      color: 'snow',
    }
  }
})


export const hideOnPrint = css({
  "@media print": {
    display: "none",
  }
})