import styled from "@emotion/styled"
import Layout from "components/layout/layout"
import h from "components/markup"
import { css } from "@emotion/core"

export default () => h(Layout, { title: "" }, [
  h.p({ css: style.big }, ["I'm a ", h.b("Software Engineer"), " and ", h.b("Linguist.")]),
  h.p({ css: style.big }, [
    "I specialize in ",
    h.b("creative forms of communication."),
  ]),
])

const style = {
  big: css({
    fontSize: 32,
  }),
}
