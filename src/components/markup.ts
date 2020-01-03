import React, {ReactHTML, ComponentType, createElement, ReactNode} from "react"
import {jsx} from "@emotion/core"

type Args = Parameters<typeof jsx>
type Element = ReturnType<typeof jsx>

type Props<P> = Omit<React.Attributes & P, "children">
type Children = Args[2]


function h(tag: keyof ReactHTML, propsOrChildren?: JSX.IntrinsicElements[typeof tag] | Children, children?: Children): Element
function h<P>(comp: ComponentType<P>, propsOrChildren: Props<P>, children?: Children): React.ReactElement<P>
function h<P>(comp: ComponentType<P>, propsOrChildren?: Children): React.ReactElement<P>
function h<P>(comp: any, propsOrChildren?: any, children?: any): any {
  const secondIsArr = Array.isArray(propsOrChildren)
  if (!secondIsArr && typeof propsOrChildren === "object") {
    if (Array.isArray(children)) {
      return jsx(comp, propsOrChildren as P, ...children)
    } else {
      return jsx(comp, propsOrChildren as P, children)
    }
  } else {
    if (secondIsArr) {
      return jsx(comp, null, ...propsOrChildren)
    } else {
      return jsx(comp, null, propsOrChildren)
    }
  }
}

const hh = (tag: keyof ReactHTML) => (
  (props?: JSX.IntrinsicElements[typeof tag] | Children, children?: Children) => (
    h(tag, props, children)
  )
)

h.div = hh("div")
h.section = hh("section")
h.article = hh("article")
h.header = hh("header")
h.footer = hh("footer")
h.nav = hh("nav")
h.br = hh("br")
h.b = hh("b")
h.a = hh("a")
h.p = hh("p")
h.span = hh("span")
h.ul = hh("ul")
h.ol = hh("ol")
h.li = hh("li")
h.link = hh("link")
h.hr = hh("hr")
h.h1 = hh("h1")
h.h2 = hh("h2")
h.h3 = hh("h3")
h.h4 = hh("h4")
h.h5 = hh("h5")
h.i = hh("i")
h.b = hh("b")

h.frag = (...children: ReactNode[]) => createElement(React.Fragment, null, ...children)

export default h



// Double paren version: h(elem)(props, children)

// function h(tag: keyof ReactHTML): (propsOrChildren?: JSX.IntrinsicElements[typeof tag] | Children, children?: Children) => Element
// function h<P>(comp: Component<P>): (propsOrChildren?: Props<P> | Children, children?: Children) => Element
// function h<P>(comp: Component<P>): (propsOrChildren?: Children) => Element
// function h<P>(comp: any): (propsOrChildren?: any, children?: any) => any {
//   return function (propsOrChildren, children) {
//     const passesChildren = propsOrChildren && (Array.isArray(propsOrChildren) || typeof propsOrChildren !== "object") && !children
//     if (passesChildren) {
//       return jsx(comp, null, propsOrChildren)
//     } else {
//       return jsx(comp, propsOrChildren as P, children)
//     }
//   }
// }

// const makeElem = <Elem>(tag: keyof ReactHTML) => (
//   (props?: HTMLProps<Elem> | Children, children?: Children) => (
//     h<HTMLProps<Elem>>(tag)(props, children)
//   )
// )