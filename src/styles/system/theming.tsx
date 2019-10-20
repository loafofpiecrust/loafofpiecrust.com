import { Theme } from "styles/theme"

const themeMappings = [
  { keys: ["color", "backgroundColor", "background", "borderColor"], themeKey: "colors" },
  { keys: ["boxShadow"], themeKey: "shadows" },
  { keys: ["borderRadius", "borderTopRightRadius", "borderTopLeftRadius"], themeKey: "radii" },
  { keys: ["flex", "flex-grow", "flex-shrink"], themeKey: " " },
].reduce((acc, mapping) => {
  for (const propKey of mapping.keys) {
    acc[propKey] = mapping.themeKey
  }
  return acc
}, {})

function mapTheme(theme: Theme, style) {
  Object.entries(style).forEach(([key, value]) => {
    const themePart = theme[themeMappings[key] || "space"]
    if (themePart && !Array.isArray(themePart)) {
      // keys are strings
      if (typeof value === "string") {
        const themedVal = themePart[value]
        if (themedVal) {
          style[key] = themedVal
        }
      }
    } else if (Array.isArray(value)) {
      style[key] = value.map(v => {
        if (themePart && Number.isInteger(v) && v < 10) {
          return themePart[v]
        } else {
          return v
        }
      })
    } else if (themePart && typeof value === "number" && value < themePart.length && value >= 1) {
      style[key] = themePart[value] || value
    } else if (typeof value === "object") {
      style[key] = mapTheme(theme, value)
    }
  })
  return style
}

export function themed(theme: Theme, style) {
  return mapTheme(theme, style)
}