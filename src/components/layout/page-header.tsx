import theme, {mq} from "styles/theme"
import {contrastBackground, paddingX, paddingY} from "styles/system/shortcuts"
import Layout, {LayoutProps} from "./layout"
import {css} from "@emotion/core"
import h from "components/markup"
import {ReactChild} from "react"

export const PageHeader = (props: {
  header: ReactChild;
} & LayoutProps) => (
  h(Layout, {unpadded: true, ...props}, [
    props.header && h("header", {
      css: [style.heading, style.content],
    }, props.header),
    h("div", {css: style.content}, props.children),
  ])
)

const style = {
  heading: css(mq({
    ...contrastBackground(theme.colors.link),
  })),
  content: css(mq({
    ...paddingX(theme.contentPadding),
    ...paddingY(4),
  })),
}
