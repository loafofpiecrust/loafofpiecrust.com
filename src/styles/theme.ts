import facepaint from "facepaint"
import { util } from "styled-system";
import { themed } from "./system/theming";
import { Interpolation } from "emotion";
import { ClassInterpolation, CSSObject } from "create-emotion";
import { expandShortcuts, CSSShortcuts } from "./system/shortcuts";

const theme = {
  pageWidth: 960,
  linkColor: "#dd0060",
  transitionTime: "160ms",
  fullWidth: ["100%", 600, 800, 960],
  space: [0, 4, 8, 16, 32, 48, 64, 128],
  breakpoints: ["40em", "52em", "64em"],
  fontWeights: {
    bold: 700,
  },
  radii: [0, 2, 4, 8],
  shadows: [
    "none",
    "0 2px 16px rgba(0, 0, 0, 0.25)"
  ],
  fonts: {
    body: "Cabin",
    sans: "Cabin",
    header: "Arvo",
    serif: "Arvo",
    mono: "Menlo",
  },
  colors: {
    link: "#dd0060",
    background: "mediumseagreen",
    whiteText: "rgba(255,255,255,1)",
    blackText: "rgba(0,0,0,1)",
    teal: "rgb(0, 190, 166)",
  },
  from(key: string, values: any[]): any {
    return values.map(x => theme[key][x])
  },
}

const mediaQueries = theme.breakpoints.map(w => `@media(min-width: ${w})`)
const mqBase = facepaint(mediaQueries)
export const mq = (style: CSSObject & CSSShortcuts): ClassInterpolation => 
  (props) => mqBase(themed(props ? props.theme : theme, expandShortcuts(style)))

export default theme