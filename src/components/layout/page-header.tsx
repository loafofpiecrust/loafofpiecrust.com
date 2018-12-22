import React from "react"
import theme, { mq } from "styles/theme"
import { contrastBackground, paddingX, paddingY } from "styles/system/shortcuts"
import Layout from "./layout"
import { css, jsx as h } from "@emotion/core"

export const PageHeader = ({ header, children, ...props }) => (
  <Layout unpadded {...props}>
    <header css={styles.heading}>{header}</header>
    <div css={styles.content}>{children}</div>
  </Layout>
)

const styles = {
  heading: css(mq({
    ...contrastBackground(theme.colors.link),
    ...paddingX(theme.contentPadding),
    ...paddingY(theme.space[4]),
  })),
  content: css(mq({
    ...paddingX(theme.contentPadding),
    ...paddingY(theme.space[4]),
  })),
}
