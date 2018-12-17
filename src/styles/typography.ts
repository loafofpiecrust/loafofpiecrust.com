import Typography from "typography"
import gray from "gray-percentage"
import { MOBILE_MEDIA_QUERY } from "typography-breakpoint-constants"

const monoFont = ["PT Mono", "monospace"]

export default new Typography({
  baseFontSize: "17px",
  baseLineHeight: 1.45,
  blockMarginBottom: 0.8,
  // scaleRatio: 2,
  // googleFonts: [
  //   { name: "Arvo", styles: ["400", "700"] },
  //   { name: "Cabin", styles: ["400", "400i", "700", "700i"] },
  //   { name: "Merriweather", styles: ["400", "400i", "700", "700i"] },
  //   { name: "PT Mono", styles: ["400", "700"] },
  // ],
  headerFontFamily: ["Arvo", "sans-serif"],
  bodyFontFamily: ["Cabin", "serif"],
  headerColor: "hsla(0,0%,0%,0.9)",
  bodyColor: "hsla(0,0%,0%,0.8)",
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 700,
  // headerFontFamily: ['Josefin Sans', 'sans'],
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    "header,footer": {
      fontFamily: options.headerFontFamily.join(","),
    },
    "h1,h2,h3,h4,h5,h6": {
      lineHeight: 1.2,
      marginTop: rhythm(1.5),
      marginBottom: rhythm(0.5),
    },
    // Blockquote styles.
    blockquote: {
      ...scale(1 / 5),
      borderLeftWidth: rhythm(6 / 16),
      color: gray(35),
      paddingLeft: rhythm(10 / 16),
      fontStyle: "italic",
      marginLeft: 0,
      marginRight: 0,
    },
    "blockquote > :last-child": {
      marginBottom: 0,
    },
    "blockquote cite": {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontStyle: "normal",
      fontWeight: options.bodyWeight,
    },
    "blockquote cite:before": {
      content: '"— "',
    },
    code: {
      fontFamily: monoFont.join(","),
    },
    [MOBILE_MEDIA_QUERY]: {
      blockquote: {
        borderLeftWidth: rhythm(3 / 16),
        paddingLeft: rhythm(9 / 16),
        fontStyle: "italic",
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
      },
    },
  }),
})
