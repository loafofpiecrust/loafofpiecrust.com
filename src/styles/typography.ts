import Typography from "typography"
import theme from "./theme"

const paddingY = (value: number | string) => (
  {paddingTop: value, paddingBottom: value}
)

const marginX = (value: number | string) => (
  {marginRight: value, marginLeft: value}
)

export default new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.45,
  blockMarginBottom: 0.8,
  scaleRatio: 2,
  // googleFonts: [
  //   { name: "Arvo", styles: ["400", "700"] },
  //   { name: "Cabin", styles: ["400", "400i", "700", "700i"] },
  //   { name: "Merriweather", styles: ["400", "400i", "700", "700i"] },
  //   { name: "PT Mono", styles: ["400", "700"] },
  // ],
  headerFontFamily: [theme.fonts.header, "sans-serif"],
  bodyFontFamily: [theme.fonts.body, "serif"],
  headerLineHeight: 1.2,
  // headerColor: gray(10),
  // bodyColor: gray(20),
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({adjustFontSizeTo, scale, rhythm}, options) => ({
    "header,footer": {
      fontFamily: options.headerFontFamily.join(","),
    },
    "h1,h2,h3,h4,h5,h6": {
      marginTop: rhythm(1.5),
      marginBottom: rhythm(0.5),
    },
    ":last-child": {
      marginBottom: 0,
    },
    "section:not(:last-child)": {
      marginBottom: rhythm(options.blockMarginBottom),
    },
    // Blockquote styles.
    blockquote: {
      ...scale(1 / 5),
      ...paddingY(rhythm(6/16)),
      ...marginX(0),
      borderLeftWidth: rhythm(6 / 16),
      paddingLeft: rhythm(10 / 16),
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
      content: '"&emdash; "',
    },
    code: {
      ...scale(-0.15),
      fontFamily: theme.fonts.mono,
    },
    [theme.mediaQueries[0]]: {
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
