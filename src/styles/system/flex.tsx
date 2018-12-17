import React from "react"

import BaseFlex from "styled-flex-component"

import styled from "react-emotion";
import { flex, space, width, color, FlexProps, SpaceProps, WidthProps, ColorProps, fontSize, FontSizeProps } from "styled-system";
import { withProps, defaultProps } from "recompose";

interface FlexBoxProps {
  wrap?: boolean
  column?: boolean
  center?: boolean
  // alignItems
  alignCenter?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignBaseline?: boolean
  alignStretch?: boolean
  // alignContent
  contentCenter?: boolean
  contentStart?: boolean
  contentEnd?: boolean
  contentBaseline?: boolean
  contentStretch?: boolean
  contentAround?: boolean
  // justifyContent
  justifyCenter?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyBetween?: boolean
  justifyAround?: boolean
  justifyEvenly?: boolean
}

interface AsProps {
  as?: string
  className?: string
  css?: any
}

const IBaseFlex: React.StatelessComponent<AsProps & FlexBoxProps> = BaseFlex
export const Flex = styled(IBaseFlex)<FlexProps & SpaceProps & WidthProps & ColorProps & FontSizeProps>(flex, space, width, color, fontSize)

export const Row = styled(Flex)((props: { gap?: number }) => ({
  "& > *": {
    marginRight: props.gap / 2,
    marginLeft: props.gap / 2,
  }
}))
export const Column = defaultProps({ column: true })(Flex)