import React from "react"
import { css } from "@emotion/core"

import { fullWidthClass, Theme } from "styles/theme"
import { hideOnPrint } from "styles/global"
import { paddingX, paddingY, marginX } from "styles/system/shortcuts"

export const Footer = () => (
  <footer css={styles.container}>
    <span>Powered by MAGIC</span>
    <span css={{ textAlign: "right" }}>
      Made with
      <span css={styles.heart}> ❤ </span>
      in New Orleans
    </span>
  </footer>
)

const styles = {
  container: (theme: Theme) => css(
    hideOnPrint,
    fullWidthClass,
    paddingX(theme.space[4]),
    paddingY(theme.space[4]),
    marginX("auto"),
    {
      display: "flex",
      justifyContent: "space-between",
      color: theme.colors.lightText,
      fontWeight: "bold",
    },
  ),
  heart: (theme: Theme) => css({
    fontWeight: "bold",
    color: theme.colors.link,
  }),
}
