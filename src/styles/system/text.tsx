import React from "react"
import styled from "react-emotion"
import {
  space,
  fontSize,
  width,
  color,
  flex,
  textAlign,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  FlexProps,
} from "styled-system"

import { withProps, defaultProps } from "recompose"

import { Box, Text as BaseText, FlexClass } from "rebass"
export { Box, Card } from "rebass"

// export const Box = styled.div(space, flex, color, width)
// const Flex = styled(Box)(
//   flexDirection,
//   (props: { wrap?: boolean }) => ({
//     display: "flex",
//     flexWrap: props.wrap ? "wrap" : "nowrap",
//   })
// )
export const Text = styled(Box)(fontSize, textAlign)

// export const Flex = styled(BaseFlex)(space, width, flex)


// export const Text = styled(BaseText)(flex)