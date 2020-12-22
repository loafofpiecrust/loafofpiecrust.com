import styled from "@emotion/styled"
import {marginX} from "./shortcuts"

export const Row = styled.div((props: {gap?: number}) => ({
  display: "flex",
  flexDirection: "row",
  "& > *": {
    ...marginX(props.gap / 2),
  },
}))
