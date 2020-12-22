import {Layout} from "components/layout/layout"
import {projects} from "components/projects-pie"
import h from "components/markup"

export default () =>
  h(
    Layout,
    {title: "Projects"},
    projects.map((project) =>
      h.section({key: project.title}, [
        h.h3(null, h.a({href: project.url}, project.title)),
        project.desc,
      ])
    )
  )
