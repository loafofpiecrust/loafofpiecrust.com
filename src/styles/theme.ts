
import theme from "./theme-aux"
import facepaint from "facepaint"
import {css} from "@emotion/core"
import {Interpolation} from "@emotion/serialize"
import {themed} from "./system/theming"

export type Theme = typeof theme

export const themeFrom = (key: string, values: any[]) => {
  return values.map((x) => theme[key][x])
}

const mqBase = facepaint(theme.mediaQueries)
export const mq = (style: Interpolation) =>
  mqBase(themed(theme, style))

export default theme