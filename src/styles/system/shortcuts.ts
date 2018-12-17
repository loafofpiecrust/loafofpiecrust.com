import { CSSObject } from "create-emotion";

export interface CSSShortcuts {
  px?: any,
  py?: any,
}

const shortcuts = {
  px: ["paddingLeft", "paddingRight"],
  py: ["paddingTop", "paddingBottom"],
}

export const expandShortcuts = (style): CSSObject => {
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