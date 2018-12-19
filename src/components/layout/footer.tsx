import React from "react"
import { mq, fullWidthClass } from "styles/theme"
import { hideOnPrint, globalStyles } from "styles/global"
import { paddingX, paddingY, marginX } from "styles/system/shortcuts"
import { css, Global } from "@emotion/core"

export const Footer = () => (
  <footer css={styles.container}>
    <span>Powered by MAGIC</span>
    <span>
      Made with
      <b css={{ color: "red" }}> ❤ </b>
      in New Orleans
    </span>
  </footer>
)

const styles = {
  container: css(
    hideOnPrint,
    fullWidthClass,
    mq({
      ...paddingX(3),
      ...paddingY(4),
      ...marginX("auto"),
      display: "flex",
      justifyContent: "space-between",
      color: "lightText",
      fontWeight: "bold",
    })
  ),
}
