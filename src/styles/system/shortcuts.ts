import {css, Interpolation} from "@emotion/core"
import color from "color"
import theme from "styles/theme"

const shortcuts = {
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
}

export const expandShortcuts = (style: Interpolation): Interpolation => {
  const result = {}
  Object.entries(style).forEach(([key, value]) => {
    const shortcut = shortcuts[key]
    if (shortcut) {
      for (const actualKey of shortcut) {
        result[actualKey] = value
      }
    } else if (typeof value === "object" && !Array.isArray(value)) {
      result[key] = expandShortcuts(value)
    } else {
      result[key] = value
    }
  })
  return result
}

export const paddingX = (value: number | string | any[]) => ({
  paddingRight: value,
  paddingLeft: value,
})
export const paddingY = (value: number | string | any[]) => ({
  paddingTop: value,
  paddingBottom: value,
})

export const marginX = (value: number | string | any[]) => ({
  marginRight: value,
  marginLeft: value,
})
export const marginY = (value: number | string | any[]) => ({
  marginTop: value,
  marginBottom: value,
})

export const size = (value: number | string | any[]) => ({
  width: value,
  height: value,
})

export const contrastBackground = (value: string) => {
  const bg = color(value)
  const fg = bg.isDark() ? theme.colors.lightText : "inherit"
  return {
    backgroundColor: value,
    color: fg,
  }
}

export const fillParent = css(size("100%"))

export const flex = {
  box: css({display: "flex"}),
  column: css({
    display: "flex",
    flexDirection: "column",
  }),
  row: css({
    display: "flex",
    flexDirection: "row",
  }),
  wrap: css({flexWrap: "wrap"}),
  alignCenter: css({alignItems: "center"}),
  alignEnd: css({alignItems: "flex-end"}),
  justifyBetween: css({justifyContent: "space-between"}),
  justifyAround: css({justifyContent: "space-around"}),
}

export const grid = {
  box: css({display: "grid"}),
}
