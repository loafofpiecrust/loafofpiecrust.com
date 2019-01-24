import facepaint from "facepaint"
import { css } from "@emotion/core"
import { themed } from "./system/theming"
import { expandShortcuts, CSSShortcuts } from "./system/shortcuts"
import { CSSProperties, CSSPropertiesWithMultiValues, Interpolation } from "@emotion/serialize"
import gray from "gray-percentage"
import color from "color"

import "typeface-arvo"
import "typeface-cabin"
// import "typeface-aleo"
import "typeface-pt-mono"

const theme = {
  pageWidth: 960,
  transitionTime: "160ms",
  contentPadding: [4, 4, 5],
  fullWidth: ["100%", 600, 800, 960],
  space: [0, 4, 8, 16, 36, 48, 64, 128],
  breakpoints: ["40em", "52em", "64em"],
  mediaQueries: [],
  fontWeights: {
    bold: 700,
  },
  radii: [0, 2, 4, 8],
  shadows: ["none", `0 2px 16px ${gray(75)}`],
  fonts: {
    body: "Cabin",
    header: "Arvo",
    sans: "Cabin",
    serif: "Arvo",
    mono: "PT Mono",
  },
  colors: {
    link: "coral",
    background: color("mediumseagreen").darken(0.06).string(),
    lightBackground: "snow",
    darkBackground: "darkslategray",
    lightText: "snow",
    darkText: color("darkslategray").darken(0.5).fade(0.15).string(),
    teal: "rgb(0, 190, 166)",
  },
  from(key: string, values: any[]): any {
    return values.map((x) => theme[key][x])
  },
}

theme.mediaQueries = theme.breakpoints.map((w) => 
  w === "52em" ? `@media print, (min-width: ${w})` : `@media(min-width: ${w})`
)
const mqBase = facepaint(theme.mediaQueries)
export const mq = (style: Interpolation) =>
  mqBase(themed(theme, style))

export const fullWidthClass = css(mq({ width: theme.fullWidth }))

export default theme
