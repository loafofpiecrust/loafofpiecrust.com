import styled from "@emotion/styled"
import Layout from "components/layout/layout"
import e from "react-hyperscript"

export default () => e(Layout, [
  e(BigP, ["I'm a ", e("b", "Software Developer.")]),
  e(BigP, [
    "I specialize in",
    e("b", "creative forms of communication.")
  ])
])

const BigP = styled.p({
  fontSize: 32,
})
