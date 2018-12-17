import { injectGlobal, css } from "emotion"
import theme from "./theme"

// import "typeface-arvo"
// import "typeface-cabin"
// import "typeface-pt-mono"

injectGlobal({
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
    "&:first-child": {
      marginTop: 0,
    },
  },
  "@page": {
    size: "auto",
    margin: 0,
  },
  a: {
    color: theme.linkColor,
    textDecoration: "none",
    borderBottom: `2px dashed ${theme.linkColor}`,
    transition: `all ${theme.transitionTime}`,
    "&:hover, &:active": {
      borderBottomColor: "transparent",
    },
    "header &": {
      borderBottom: "none",
    }
  },
  blockquote: {
    borderLeftColor: theme.linkColor,
    borderLeftStyle: "solid",
  },
  code: {
    border: `1px solid ${theme.linkColor}`,
    padding: 4,
    borderRadius: 3,
    backgroundColor: '#f0f0f0',
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