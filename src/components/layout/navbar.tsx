import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { Toolbar, ToolbarItem, useToolbarState, Button } from "reakit"
import theme, { mq } from "styles/theme"
import { contrastBackground, flex } from "styles/system/shortcuts"
import h from "components/markup"

export const NavBar = (props: {
  items: { url: string; label: string }[];
  activeUrl: string;
}) => {
  const toolbar = useToolbarState()
  return h(Toolbar, { ...toolbar, as: "nav", "aria-label": "Site Navigation", css: { display: "flex" } },
    props.items.map((item) => {
      const isCurrent = props.activeUrl.startsWith(item.url)
      return h(ToolbarItem, {
        ...toolbar,
        as: Link,
        to: item.url,
        key: item.url,
        "aria-current": isCurrent && "page",
        css: styles.link(isCurrent),
      }, item.label)
    }),
  )
}

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
