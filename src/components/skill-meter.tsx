import React from "react"
import Progress from "rc-progress"
import { size } from "styles/system/shortcuts"
import { css } from "@emotion/core"

export const SkillMeter = (props: {
  format: (value: number) => string;
  value: number;
  title: string;
  color?: string;
}) => (
    <div>
      <h4 css={styles.title}>{props.title}</h4>
      <div css={styles.container}>
        <Progress.Circle
          aria-label={`Meter filled ${props.value * 100}%`}
          css={size(100)}
          percent={props.value * 100}
          gapPosition="bottom"
          gapDegree={60}
          strokeWidth={10}
          trailWidth={10}
          strokeColor={props.color || "#2db7f5"}
          strokeLinecap="square"
        />
        <span css={styles.desc}>{props.format(props.value)}</span>
      </div>
    </div>
  )

const styles = {
  title: css({
    width: "initial",
    textAlign: "center",
  }),
  container: css({
    position: "relative",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    width: "fit-content",
  }),
  desc: css({
    display: "flex",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  }),
}
