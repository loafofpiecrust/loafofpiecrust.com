import React from "react"

import {Layout} from "components/layout/layout"
import h from "components/markup"

export default () => h(Layout, {title: "Not Found"}, [
  h.section({css: {textAlign: "center"}}, [
    h.h1("404"),
    h.hr(),
    h.h3("This page does not exist. You are dreaming."),
    h.h3("Continue on your way, traveller."),
    h.h3("There is nothing to see here."),
  ]),
])
