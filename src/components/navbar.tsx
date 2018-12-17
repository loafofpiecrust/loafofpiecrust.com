import React from "react"
import { Link } from "gatsby"
import { css } from "emotion"
import theme, { mq } from "styles/theme"

export const NavBar = (props: {
  items: { url: string; label: string }[]
  activeUrl: string
}) => (
  <nav style={{ display: "flex" }}>
    {props.items.map(item => {
      const isActive = props.activeUrl.startsWith(item.url)
      return (
        <Link key={item.url} to={item.url} css={styles.link(isActive)}>
          {item.label}
        </Link>
      )
    })}
  </nav>
)

const styles = {
  link: (isActive: boolean) => css(mq({
    backgroundColor: isActive ? theme.linkColor : "transparent",
    color: "snow",
    padding: "15px 15px",
    transition: "all 0.2s",
    textDecorationLine: "none",
    "&:hover": {
      backgroundColor: theme.linkColor,
    },
  })),
}
