
const themeMappings = [
  { keys: ["color", "backgroundColor", "borderColor"], themeKey: "colors" },
  { keys: ["boxShadow"], themeKey: "shadows" },
  { keys: ["borderRadius", "borderTopRightRadius", "borderTopLeftRadius"], themeKey: "radii" },
].reduce((acc, mapping) => {
  for (const propKey of mapping.keys) {
    acc[propKey] = mapping.themeKey
  }
  return acc
}, {})

const mapTheme = (theme, style) => {
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

export const themed = (theme, style) => mapTheme(theme, style)