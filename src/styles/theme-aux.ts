import gray from "gray-percentage"
import color from "color"

const theme = {
  pageWidth: 960,
  transitionTime:  "160ms",
  contentPadding: [4, 4, 5],
  fullWidth: ["100%", 600, 800, 960],
  space: [0, 4, 8, 16, 36, 48, 64, 128],
  mediaQueries: [
    "@media (min-width: 40em)",
    "@media print, (min-width: 52em)",
    "@media (min-width: 64em)",
  ],
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
    mono: "\"SF Mono\",Consolas,Menlo,\"monospace\",monospace",
  },
  colors: {
    // link: "coral",
    // background: color("mediumseagreen").darken(0.06).string(),
    // background: "#99b898",
    // link: "#f6ab6c",
    background: "#f7c5a8",
    link: "#FF8949",
    lightBackground: "#ffeadb",
    darkBackground: "darkslategray",
    lightText: "snow",
    // darkText: color("darkslategray").darken(0.5).fade(0.15).string(),
    darkText: color("#679b9b").darken(0.6).string(),
    teal: "rgb(0, 190, 166)",
  },
}

export default theme
