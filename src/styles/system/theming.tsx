import {Theme} from "styles/theme"

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
}

const themeMappings: PartialRecord<keyof Theme, string[]> = {
  colors: ["color", "backgroundColor", "background", "borderColor"],
  radii: ["borderRadius", "borderTopRightRadius", "borderTopLeftRadius"],
  shadows: ["boxShadow"],
}

const mapTheme = (theme: Theme, themePart: any, value: any) => {
  if (Array.isArray(value)) {
    return value.map(v => mapTheme(theme, themePart, v))
  } else if (themePart && ((typeof value === "number" && value < themePart.length) || typeof value === "string")) {
    const t = themePart[value]
    return typeof t !== "undefined" ? t : value
  } else if (typeof value === "object") {
    const result = value
    Object.entries(value).map(([key, value]) => {
      const themePart = theme[themeMappings[key] || "space"]
      result[key] = mapTheme(theme, themePart, value)
    })
    return result
  } else {
    return value
  }
}

export function themed(theme: Theme, style) {
  return mapTheme(theme, null, style)
}
