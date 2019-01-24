import React from "react"
import cherry from "images/pie-fillings/cherry.svg"
import blueberry from "images/pie-fillings/blueberry.svg"

export const projects: Project[] = [
  {
    title: "Turntable",
    linesOfCode: 10824,
    url: "/projects/turntable",
    filling: cherry,
    desc: <p>
      Two people on distant reaches of the Earth from one another
      can listen to the same album at the same time,
      rhythms marching as one (with slight latency).
    </p>,
  },
  {
    title: "City Palette",
    url: "http://paletteapp.city",
    desc: <p>
      Mobile app that allows users to take dominant colors from a photo
      to name and publish them for nearby users to check out:
      "...interpreting locations through color collections.
      So many cities are unique in their color spectrums:
      from the tropical hues of Miami Beach to the stately grays of London,
      colors are an important way to interpret where we are.
      City Palette was first designed for use in New Orleans, Louisiana,
      a historically colorful city in the midst of many changes."
    </p>,
    // iOS + Android
    linesOfCode: 1261 + 2111,
    filling: blueberry,
  },
  {
    linesOfCode: 750,
    title: "You Belong Here",
    url:
      "https://play.google.com/store/apps/details?id=com.youbelonghere.ybh&hl=en",
    desc: <p>
      Mobile app that tracks stories of belonging (in New Orleans) via
      photos and videos hosted on Instagram and mapped out.
      Its release was Kicked off with videos from Speed Levitch
      and a barge on the Mississippi River that read "You Belong Here".
    </p>,
    filling: blueberry,
  },
]

export interface Project {
  url: string
  linesOfCode: number
  title: string
  desc?: string | any
  crust?: any
  creme?: any
  filling?: any
}
