import React from "react"
import Layout from "components/layout/layout"
import styled from "@emotion/styled"
import theme, { mq } from "styles/theme";
import { flex, paddingX, paddingY, contrastBackground } from "styles/system/shortcuts";
import color from "color"

export default () => (
  <Layout unpadded title="Resume">
    <ResumeHeader>
      <div css={[flex.row, flex.alignCenter]}>
        <h2 css={{ flex: 1, margin: 0 }}>
          Taylor Snead
        </h2>
        
        <div css={[flex.column, flex.alignEnd]}>
          {/* <span>275 Lamartine St #1, Jamaica Plain, MA 02130</span> */}
          <span>taylorsnead@gmail.com</span>
          <span>Cell: 504-442-0219</span>
          <span><a href="/">loafofpiecrust.com</a></span>
          <span>GitHub: <a href="https://github.com/loafofpiecrust">loafofpiecrust</a></span>
        </div>
      </div>
    </ResumeHeader>

    <div css={[flex.row, flex.wrap]}>
      <div css={[flex.column, mq({ flex: ["1 0 100%", 1], marginRight: [2, 4] })]}>
        <LeftSection>
          <SectionHeader>Education</SectionHeader>
          <div css={[flex.row, flex.justifyBetween]}>
            <p css={{ flex: 1 }}>
              <b>Northeastern University</b> (Boston, MA)<br />
              Candidate for Bachelor of Science<br />
              in Computer Science
            </p>
          </div>
          <div>
            <i>
              <b>Honors:</b>
            </i>{" "}
            University Scholar, Honors Program
            <br />
            <i>
              <b>Relevant Coursework:</b>
            </i>
            <div css={mq({ display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: 2 })}>
              {courses.map(name => <span key={name}>{name}</span>)}
            </div>
          </div>
        </LeftSection>

        <LeftSection>
          <SectionHeader>Freelance Projects</SectionHeader>
          {freelanceProjects.map(proj => (
            <div css={flex.column} key={proj.timeFrame}>
              <span><b>{proj.title}</b></span>
              <span><b>{proj.organization}</b> - {proj.location}</span>
              {proj.desc}
            </div>
          ))}
        </LeftSection>
      </div>

      <div css={[flex.column, mq({ flex: ["1 0", 1] })]}>
        <RightSection>
          <SectionHeader>Work Experience</SectionHeader>
          {workExperience.filter(j => !j.hidden).map(job => (
            <div css={flex.column} key={job.timeFrame}>
              <span>
                <b>{job.position}</b>
                <i style={{ float: "right" }}>{job.timeFrame}</i>
              </span>
              <span>
                <b>{job.organization}</b>
                {job.location ? ` - ${job.location}` : null}
              </span>

              {job.desc}
            </div>
          ))}
        </RightSection>

        <RightSection>
          <SectionHeader>Personal Projects</SectionHeader>
          {personalProjects.map(proj => (
            <div css={flex.column} key={proj.title}>
              <span><b>{proj.title}</b></span>
              <p>{proj.desc}</p>
            </div>
          ))}
        </RightSection>
      </div>
    </div>
  </Layout>
)

const inset = [3, 4, 5]
const verticalInset = 3

const coloredLink = (color) => ({
  borderColor: color,
  "&:hover": {
    color: color,
  }
})

const ResumeHeader = styled("div")(mq({
  ...paddingX(inset),
  ...paddingY(4),
  ...contrastBackground(theme.colors.link),
  marginBottom: 4,
  a: coloredLink(color(theme.colors.background).darken(0.25).string()),
}))

const SectionHeader = styled("h3")(mq({
  ...paddingX(inset),
  ...paddingY(verticalInset),
  ...contrastBackground(theme.colors.background),
  boxShadow: theme.shadows[1],
}))


const ResumeSection = (side: "left" | "right") => styled("section")(mq({
  marginBottom: 4,
  "& > *": {
    paddingLeft: side === "left" ? inset : 2,
    paddingRight: side === "left" ? 2 : inset,
  },
  h3: {
    textAlign: side,
    borderRadius: side === "left" ? "0 3px 3px 0" : "3px 0 0 3px",
  }
}))

const LeftSection = ResumeSection("left")
const RightSection = ResumeSection("right")

const courses: string[] = [
  "Software Development",
  "Algorithms & Data",
  "Programming Languages",
  "Computer Systems",
  "Logic & Computation",
  "Linear Algebra",
  "Object-Oriented Design",
  "Embedded Design",
  "Machine Structure & x86 Assembly",
]

const workExperience: {
  position: string
  organization: any
  location?: string
  timeFrame: string
  desc: any
  hidden?: boolean
}[] = [
  {
    position: "Software Developer",
    organization: "Autodesk",
    location: "Boston, MA",
    timeFrame: "7/2018 - 12/2018",
    desc: <p>
      Worked as a member of Team Goldmine on the Autodesk
      content delivery project, pushing production code and
      participating in major decision-making every day.
    </p>
  },
  {
    position: "iOS Developer",
    organization: <a href="https://roundware.org">Roundware</a>,
    location: "Remote",
    timeFrame: "12/2017 - Now",
    desc: <p>
      Integrate new server features into iOS Swift applications
      that use location and gyroscope data. 
    </p>
  },
  {
    position: "Laser Technician",
    organization: "Northeastern University",
    location: "Boston, MA",
    timeFrame: "Spring 2018",
    desc: <p>
      Operate Makerspace laser cutters and assist students
      with fabrication projects.
    </p>
  },
  {
    hidden: true,
    position: "Research Assistant",
    organization: "Northeastern University",
    location: "Boston, MA",
    timeFrame: "1/2017 - 5/2017",
    desc: <p>
      Edited and assembled footage and created digital stop-motion
      animation in the Adobe suite.
    </p>
  },
  {
    position: "Software Development Intern",
    organization: "Gameloft",
    location: "New Orleans, LA",
    timeFrame: "1/2015 - 8/2015",
    desc: <p>
      Implemented and tested user interfaces in C++ and 
      Scaleform as a main member of the programming team for a
      mobile game project.
    </p>,
  },
]

const personalProjects: {
  title: any
  subtitle?: string
  desc: any
}[] = [
  {
    title: <a href="/projects/turntable">Turntable</a>,
    desc: `
    Music player for Android that allows users to sync their
    listening sessions over the internet, playing the music from
    accessible free sources: the device itself, YouTube, and hopefully more.
    `,
  },
]

const freelanceProjects: {
  title: any
  organization: string
  location: string
  timeFrame?: string
  desc: any
}[] = [
  {
    title: <a href="https://paletteapp.city">City Palette</a>,
    organization: "Chloe Bass & Antenna",
    location: "New Orleans, LA",
    timeFrame: "10/2017 - 1/2018",
    desc: <p>
      Mobile app that allows users to name and publish
      dominant colors from photos, geotagged to where the photo was taken. Developed on my own, natively for both iOS
      (Swift) and Android (Java and Kotlin), using a
      MongoDB instance to track colors and palettes.
    </p>
  },
  {
    title: <a href="https://antenna.works">Antenna.works</a>,
    organization: "Antenna",
    location: "New Orleans, LA",
    timeFrame: "8/2016 - 10/2016",
    desc: <p>
      Built the new website for Antena, "antenna.works."
      Reorganized and integrated the MySQL database from
      their old website.
    </p>
  },
  {
    title: "You Belong Here",
    organization: "Tavares Strachan & Antenna",
    location: "New Orleans, LA",
    timeFrame: "9/2014 - 2/2015",
    desc: <p>
      Mobile app in JavaScript/Cordova that maps stories of
      belonging through photos and videos on Instagram. Wrote
      companion software that tracked a barge involved in the
      project.
    </p>
  },
]
