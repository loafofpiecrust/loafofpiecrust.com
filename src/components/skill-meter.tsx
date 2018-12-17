import React from "react"
import Progress from "rc-progress"
import { css } from "emotion";

export default (props: {
  format: (number) => string,
  value: number,
  max: number,
  title: string,
  color?: string,
}) => (
  <div>
    <h4 className={styles.title}>{props.title}</h4>
    <div className={styles.container}>
      <Progress.Circle
        percent={props.value / props.max * 100}
        gapPosition="bottom"
        gapDegree={60}
        strokeWidth={10}
        trailWidth={10}
        strokeColor={props.color || "#2db7f5"}
        strokeLinecap="square"
        className={styles.progress}
      />
      <span className={styles.descBox}>
        {props.format(props.value)}
      </span>
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
  progress: css({
    width: 100,
    height: 100,
  }),
  descBox: css({
    display: "flex",
    position: "absolute",
    top: 0, left: 0,
    width: "100%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  })
}