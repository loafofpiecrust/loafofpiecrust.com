import React from "react"
import { Layout } from "components/layout/layout"
import { ProjectPie } from "components/project-pie-animated"
import { css } from "@emotion/core"
import theme, { mq } from "styles/theme";
import { flex } from "styles/system/shortcuts"
import { graphql } from "gatsby"
import { projects } from "components/projects-pie";

// export default class extends React.Component {
//   state = {
//     selected: null,
//   }

//   render = () => (
//     <Layout title="Projects">
//       <article css={[flex.row, flex.justifyAround]}>
//         <ProjectPie width={600} height={600} onSelect={this.selectProject}/>

//         <div css={styles.selectedPage}>
//           <ProjectDetails project={this.state.selected} />
//         </div>
//       </article>
//     </Layout>
//   )

//   selectProject = selected => {
//     this.setState({ selected })
//   }
// }

// const ProjectDetails = ({ project }) => {
//   if (project) {
//     let header = project.title
//     if (project.url) {
//       header = <a href={project.url}>{header}</a>
//     }

//     return (
//       <>
//         <h2 css={styles.projectTitle}>{header}</h2>
//         {project.desc}
//       </>
//     )
//   } else {
//     return (<h2 css={styles.projectTitle}>Select a project</h2>)
//   }
// }

// const styles = {
//   selectedPage: css(mq({
//     borderRadius: 2,
//     boxShadow: theme.shadows[1],
//     flex: 1,
//     padding: 3,
//     animation: "all 0.2s",
//   })),
//   projectTitle: css({
//     textAlign: "center",
//   }),
// }


export default ({ data }) => (
  <Layout title="Projects">
    {projects.map(project => (
      <section>
        <h3><a href={project.url}>{project.title}</a></h3>
        {project.desc}
      </section>
    ))}
  </Layout>
)