import React from "react"
import styled from "@emotion/styled"
import css from "@emotion/css"

import theme, { mq, fullWidthClass } from "styles/theme"
import { hideOnPrint } from "styles/global"
import { paddingX, paddingY, marginX } from "styles/system/shortcuts"

export const Footer = () => (
  <footer css={styles.container}>
    <span>Powered by MAGIC</span>
    <span css={{ textAlign: "right" }}>
      Made with
      <b css={{ color: theme.colors.link }}> ❤ </b>
      in New Orleans
    </span>
  </footer>
)

const styles = {
  container: css(
    hideOnPrint,
    fullWidthClass,
    mq({
      ...paddingX(4),
      ...paddingY(4),
      ...marginX("auto"),
      display: "flex",
      justifyContent: "space-between",
      color: theme.colors.lightText,
      fontWeight: "bold",
    }),
  )
}
