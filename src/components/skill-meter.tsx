import React from "react"
import Progress from "rc-progress"
import { size } from "styles/system/shortcuts"
import styled from "@emotion/styled"
import { css } from "@emotion/core"

export const SkillMeter = (props: {
  format: (number) => string
  value: number
  title: string
  color?: string
}) => (
  <div>
    <h4 css={styles.title}>{props.title}</h4>
    <Container>
      <Progress.Circle
        css={size(100)}
        percent={props.value * 100}
        gapPosition="bottom"
        gapDegree={60}
        strokeWidth={10}
        trailWidth={10}
        strokeColor={props.color || "#2db7f5"}
        strokeLinecap="square"
      />
      <DescBox>{props.format(props.value)}</DescBox>
    </Container>
  </div>
)

const styles = {
  title: css({
    width: "initial",
    textAlign: "center",
  })
}

const Container = styled("div")({
  position: "relative",
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent: "center",
  width: "fit-content",
})

const DescBox = styled("span")({
  display: "flex",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
})
