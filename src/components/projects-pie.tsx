import React from "react"
import cherry from "images/pie-fillings/cherry.svg"
import blueberry from "images/pie-fillings/blueberry.svg"

function slugify(x: string): string {
  return x.replace(" ", "-")
}

const defaultPatternOpts = {
  width: 10,
  height: 10,
}

export interface Project {
  url: string
  linesOfCode: number
  title: string
  desc?: string
  crust?: any
  creme?: any
  filling?: any
}

export const projects: Project[] = [
  {
    linesOfCode: 400,
    title: "NOLA c-art",
    url: "http://nolacontemp-art.com",
    desc:
      "Mobile app (Android & iOS) that is a repository of art info in New Orleans, mapping different art spaces and events in the city, linking those and spaces and events to related media published on Instagram.",
    filling: cherry,
  },
  {
    linesOfCode: 750,
    title: "You Belong Here",
    url:
      "https://play.google.com/store/apps/details?id=com.youbelonghere.ybh&hl=en",
    desc:
      'Mobile app that tracks stories of belonging (in New Orleans) via photos and videos hosted on Instagram and mapped out. Its release was Kicked off with videos from Speed Levitch and a barge on the Mississippi River that read "You Belong Here".',
    filling: blueberry,
  },
  {
    title: "City Palette",
    url: "http://paletteapp.city",
    desc:
      'Mobile app that allows users to take dominant colors from a photo to name and publish them for nearby users to check out: "...interpreting locations through color collections. So many cities are unique in their color spectrums: from the tropical hues of Miami Beach to the stately grays of London, colors are an important way to interpret where we are. City Palette was first designed for use in New Orleans, Louisiana, a historically colorful city in the midst of many changes."',
    // iOS + Android
    linesOfCode: 1261 + 2111,
    filling: blueberry,
  },
  {
    title: "Turntable",
    linesOfCode: 10824,
    url: "https://github.com/loafofpiecrust/turntable",
    filling: cherry,
  },
]
