

import gray from "gray-percentage"
import color from "color"
import { percent, em } from "csx"

import "typeface-arvo"
import "typeface-cabin"
// import "typeface-aleo"
import "typeface-pt-mono"

const theme = {
  pageWidth: 960,
  transitionTime:  "160ms",
  contentPadding: [4, 4, 5],
  fullWidth: [percent(100), 600, 800, 960],
  space: [0, 4, 8, 16, 36, 48, 64, 128],
  breakpoints: [em(40), em(52), em(64)],
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
}

export default theme
