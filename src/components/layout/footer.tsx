import React from "react"
import {css} from "@emotion/core"

import theme, {mq} from "styles/theme"
import {hideOnPrint} from "styles/global"
import h from "components/markup"

export const Footer = () => (
  h.footer({css: style.container}, [
    h.a(
      {href: "https://github.com/loafofpiecrust/loafofpiecrust.com"},
      "Powered by MAGIC",
    ),
    h.span({css: {textAlign: "right"}}, [
      "Made with",
      h.span({css: style.hearty}, " ❤ "),
      "in New Orleans",
    ]),
  ])
)

const style = {
  container: css(
    hideOnPrint,
    mq({
      padding: 4,
      margin: "auto",
      width: theme.fullWidth,
      display: "flex",
      justifyContent: "space-between",
      color: theme.colors.lightText,
      fontWeight: "bold",
    }),
  ),
  hearty: css({
    fontWeight: "bold",
    color: theme.colors.link,
  }),
}
