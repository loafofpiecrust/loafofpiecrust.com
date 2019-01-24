import React from "react"
import styled from "@emotion/styled"
import Layout from "components/layout/layout"

export default () => (
  <Layout>
    <BigP>
      I'm a <b>Software Developer.</b>
    </BigP>
    <BigP>
      I specialize in <b>creative forms of communication</b>.
    </BigP>
  </Layout>
)

const BigP = styled.p({
  fontSize: 32,
})
