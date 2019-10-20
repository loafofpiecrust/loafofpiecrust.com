import React from "react"
import { Layout } from "components/layout/layout"
import { projects } from "components/projects-pie"

export default () => (
  <Layout title="Projects">
    {projects.map((project) => (
      <section key={project.title}>
        <h3><a href={project.url}>{project.title}</a></h3>
        {project.desc}
      </section>
    ))}
  </Layout>
)
