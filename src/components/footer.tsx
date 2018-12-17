import React from 'react'
import { css } from 'emotion';
import theme, { mq } from 'styles/theme';
import { Box, Text } from "styles/system/text"
import { Row, Flex } from "styles/system/flex"
import { hideOnPrint } from 'styles/global';
import styled from 'react-emotion';

export const Footer = () => (
  <Flex as="footer" className={hideOnPrint} width={theme.fullWidth} px={3} py={4} mx="auto" color="snow" justifyBetween>
    <span>Powered by MAGIC</span>
    <span css={{ textAlign: "right" }}>
      Made with
      <Text as="span" color="red">{" <3 "}</Text>
      in New Orleans
    </span>
  </Flex>
)

const Container = styled(Flex)(mq({
  width: theme.fullWidth,
  px: 3,
  py: 4,
}))