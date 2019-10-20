import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import theme, { mq } from "styles/theme"
import { contrastBackground, flex } from "styles/system/shortcuts"

export const NavBar = (props: {
  items: Array<{ url: string; label: string }>;
  activeUrl: string;
}) => (
  <nav css={{ display: "flex" }}>
    {props.items.map((item) => (
      <Link
        to={item.url}
        key={item.url}
        css={styles.link(props.activeUrl.startsWith(item.url))}
      >
        {item.label}
      </Link>
    ))}
  </nav>
)

const styles = {
  link: (isActive: boolean) => css(mq({
    ...contrastBackground(
      isActive ? theme.colors.link : theme.colors.background,
    ),
    // backgroundColor: isActive ? theme.colors.link : "transparent",
    // color: "lightText",
    padding: 3,
    transition: "all 0.2s",
    textDecorationLine: "none",
    fontWeight: "bold",
    "&:hover": {
      ...contrastBackground(theme.colors.link),
      // backgroundColor: theme.colors.link,
    },
  })),
}
