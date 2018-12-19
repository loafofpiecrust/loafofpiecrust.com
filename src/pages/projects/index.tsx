import React from "react"
import { Layout } from "components/layout/layout"
import { ProjectPie } from "components/project-pie-animated"
import { css } from "@emotion/core"
import { Card } from "styles/system/text"
import { Column, Row } from "styles/system/flex";
import theme, { mq } from "styles/theme";
import { flex } from "styles/system/shortcuts"

const ProjectDetails = ({ project }) => {
  if (project) {
    let header = project.title
    if (project.url) {
      header = <a href={project.url}>{header}</a>
    }

    return (
      <>
        <h2 css={styles.projectTitle}>{header}</h2>
        <p>{project.desc}</p>
      </>
    )
  } else {
    return (<h2 css={styles.projectTitle}>Select a project</h2>)
  }
}

export default class extends React.Component {
  state = {
    selected: null,
  }

  render = () => (
    <Layout title="Projects">
      <article css={[flex.row, flex.justifyAround]}>
        <ProjectPie width={600} height={600} onSelect={this.selectProject}/>

        <div css={styles.selectedPage}>
          <ProjectDetails project={this.state.selected} />
        </div>
      </article>
    </Layout>
  )

  selectProject = selected => {
    this.setState({ selected })
  }
}

const styles = {
  selectedPage: css(mq({
    borderRadius: 2,
    boxShadow: theme.shadows[1],
    flex: 1,
    padding: 3,
    animation: "all 0.2s",
  })),
  projectTitle: css({
    textAlign: "center",
  }),
}
