import React from "react"
import { Layout } from "components/layout"
import { ProjectPie } from "components/project-pie-animated"
import { css, cx } from "emotion"
import { Card } from "styles/system/text"
import { Column, Row } from "styles/system/flex";
import { mq } from "styles/theme";

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
      <Row justifyAround as="article">
        <ProjectPie width={600} height={600} onSelect={this.selectProject}/>

        <Card css={styles.selectedPage}>
          <ProjectDetails project={this.state.selected} />
        </Card>
      </Row>
    </Layout>
  )

  selectProject = selected => {
    this.setState({ selected })
  }
}

const styles = {
  selectedPage: css(mq({
    flex: 1,
    padding: 3,
    animation: "all 0.2s",
  })),
  projectTitle: css({
    textAlign: "center",
  }),
}
