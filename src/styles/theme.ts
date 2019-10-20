
import theme from "./theme-aux"
import facepaint from "facepaint"
import { css } from "@emotion/core"
import { Interpolation } from "@emotion/serialize"
import { themed } from "./system/theming"
import { percent, em } from "csx"

export type Theme = typeof theme

export const themeFrom = (key: string, values: any[]) => {
  return values.map((x) => theme[key][x])
}

theme.mediaQueries = theme.breakpoints.map((w) => 
  w === em(52) ? `@media print, (min-width: ${w})` : `@media(min-width: ${w})`
)
const mqBase = facepaint(theme.mediaQueries)
export const mq = (style: Interpolation) =>
  mqBase(themed(theme, style))

export const fullWidthClass = css(mq({ width: theme.fullWidth }))

export default theme