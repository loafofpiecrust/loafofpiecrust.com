import React from "react"
import Layout from "components/layout/layout"
import styled from "@emotion/styled"
import theme, { mq } from "styles/theme"
import { flex, paddingX, paddingY, contrastBackground } from "styles/system/shortcuts"

export default () => <Layout unpadded title="Resume">
  <ResumeHeader>
    <div css={[flex.row, flex.alignCenter]}>
      <h2 css={{ flex: 1, margin: 0 }}>
        Taylor Snead
      </h2>

      <div css={[flex.column, flex.alignEnd]}>
        {/* <span>275 Lamartine St #1, Jamaica Plain, MA 02130</span> */}
        <span>taylorsnead@gmail.com</span>
        <span>Cell: 504-442-0219</span>
        <span><a href="https://loafofpiecrust.com">loafofpiecrust.com</a></span>
        <span>GitHub: <a href="https://github.com/loafofpiecrust">loafofpiecrust</a></span>
      </div>
    </div>
  </ResumeHeader>

  <div css={[flex.row, flex.wrap]}>
    <LeftColumn>
      <LeftSection>
        <SectionHeader>Education</SectionHeader>
        <div css={[flex.row, flex.justifyBetween]}>
          <p css={{ flex: 1 }}>
            <b>Northeastern University</b> - Boston, MA<br />
            Candidate for Bachelor of Science<br />
            in Computer Science
          </p>
          <p>GPA: 3.4</p>
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
          <div css={[flex.row, flex.wrap, flex.justifyBetween]}>
            {courses.map((name) => <span key={name}>{name}</span>)}
          </div>
        </div>
      </LeftSection>

      <LeftSection>
        <SectionHeader>Personal Projects</SectionHeader>
        {personalProjects.map((proj) => (
          <div css={flex.column} key={proj.title}>
            <span><b>{proj.title}</b></span>
            {proj.desc}
          </div>
        ))}
      </LeftSection>

      {/* <LeftSection>
        <SectionHeader>Freelance Projects</SectionHeader>
        {freelanceProjects.filter((j) => !j.hidden).map((proj) => (
          <div css={flex.column} key={proj.timeFrame}>
            <span><b>{proj.title}</b></span>
            <span><b>{proj.organization}</b> - {proj.location}</span>
            {proj.desc}
          </div>
        ))}
      </LeftSection> */}
    </LeftColumn>

    <RightColumn>
      <RightSection>
        <SectionHeader>Experience</SectionHeader>
        {workExperience.filter((j) => !j.hidden).map((job) => (
          <div css={flex.column} key={job.timeFrame}>
            <span>
              <b>{job.title}</b>
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
    </RightColumn>
  </div>
</Layout>


const LeftColumn = styled("div")(
  flex.column,
  mq({
    flex: ["1 0 100%", 1],
    marginRight: [2, 4],
  }),
)

const RightColumn = styled("div")(
  flex.column,
  mq({
    flex: ["1 0", 1],
  }),
)

const inset = [3, 4, 5]
const verticalInset = 3

const coloredLink = (activeColor) => ({
  borderColor: activeColor,
  "&:hover": {
    color: activeColor,
  },
})

const ResumeHeader = styled("div")(mq({
  ...paddingX(inset),
  ...paddingY(4),
  ...contrastBackground(theme.colors.link),
  marginBottom: 4,
  a: coloredLink("navy"),
}))

const SectionHeader = styled("h3")(mq({
  ...paddingX(inset),
  ...paddingY(verticalInset),
  ...contrastBackground(theme.colors.background),
  // boxShadow: theme.shadows[1],
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
  },
}))

const LeftSection = ResumeSection("left")
const RightSection = ResumeSection("right")

const courses: string[] = [
  "Software Development",
  "Algorithms & Data",
  "Programming Languages",
  "Computer Systems",
  "Theory of Computation",
  "Embedded Design",
  "Object-Oriented Design",
  "Linear Algebra",
  "Machine Structure & Assembly",
  "Linguistic Analysis",
  "3D Fundamentals",
]

const workExperience: Array<{
  title: any
  organization: any
  location?: string
  timeFrame: string
  desc: any
  hidden?: boolean
}> = [
  {
    title: "Software Developer",
    organization: <a href="https://www.autodesk.com">Autodesk</a>,
    location: "Boston, MA",
    timeFrame: "July '18 — May '19",
    desc: <p>
      Work on cloud content project for Autodesk Revit in React and TypeScript.
      Interact with remote services using JSON schemas for structured data.
      Devise solution for representing content taxonomy mapping content into node graph.
      Collaborate with UX designer on scalable Content Browser UI.
      Present at quarterly check-in representing my team, and present our work for a customer demo.
      Cooperate with another team on shared data management library.
    </p>,
  },
  {
    title: "iOS Developer",
    organization: <a href="https://roundware.org">Roundware</a>,
    location: "Boston, MA",
    timeFrame: "Dec '17 — Now",
    desc: <p>
      Architect client-side audio mixing system to
      decrease server load by >90% and facilitate more complex projects.
      Use device location and gyroscope data to augment
      audio experiences in a 3D environment.
    </p>,
  },
  {
    title: "Laser Technician",
    organization: "Northeastern University",
    location: "Boston, MA",
    timeFrame: "Jan '18 — May '18",
    desc: <p>
      Operate Makerspace laser cutters and assist students
      with fabrication projects in various mediums, including paper, wood, and acrylic.
      Proficient in using hand and power tools.
    </p>,
  },
  {
    title: <a href="https://paletteapp.city">City Palette</a>,
    organization: <>Chloe Bass &amp; <a href="https://antenna.works">Antenna</a></>,
    location: "New Orleans, LA",
    timeFrame: "Oct '17 — Jan '18",
    desc: <p>
      Implement mobile app allowing users to name and publish
      dominant colors from photos, geotagged to where the photo was taken.

      Developed natively for iOS (Swift) and Android (Kotlin, JVM),
      storing published colors in a MongoDB instance.
    </p>,
  },
  {
    hidden: true,
    title: "Research Assistant",
    organization: "Northeastern University",
    location: "Boston, MA",
    timeFrame: "Jan '17 — May '17",
    desc: <p>
      Edited and assembled footage and created digital stop-motion
      animation in the Adobe suite.
    </p>,
  },
  {
    title: "Software Developer",
    organization: <a href="http://www.gameloft.com/en/">Gameloft</a>,
    location: "New Orleans, LA",
    timeFrame: "Jan '15 — Aug '15",
    desc: <p>
      Implemented and tested user interfaces in C++ and
      Scaleform for a mobile game.
      Introduced to basic AGILE methodology on 8-person team.
    </p>,
  },
]

const personalProjects: Array<{
  title: any
  subtitle?: string
  desc: any
}> = [
  {
    title: <><a href="https://loafofpiecrust.com/projects/turntable">Turntable</a> (Android, Kotlin)</>,
    desc: <p>
      Mobile music player allowing users to share synced listening sessions,
      so two people across the Earth from each other can listen to
      the same song, album, or playlist together.<br/>
      Allows user search on several music databases to facilitate discovery.
      Handles local files and includes free music streaming.
    </p>,
  },
  {
    title: "Hobbies",
    desc: <p>
      Sewing, Accordion, Global Travel, Linguistics, Woodworking, Cooking &amp; Baking
    </p>,
  },
  {
    title: "Community Service",
    desc: <p>
      Volunteer weekly at Boston Building Resources, assembling fixtures and preparing donations for display.
    </p>,
  }
]

const freelanceProjects: Array<{
  title: any
  organization: string
  location: string
  timeFrame?: string
  desc: any
  hidden?: boolean
}> = [
  {
    title: <a href="https://paletteapp.city">City Palette</a>,
    organization: "Chloe Bass & Antenna",
    location: "New Orleans, LA",
    timeFrame: "Oct '17 — Jan '18",
    desc: <p>
      Mobile app that allows users to name and publish
      dominant colors from photos, geotagged to where the photo was taken. Developed on my own, natively for both iOS
      (Swift) and Android (Java and Kotlin), using a
      MongoDB instance to store submitted colors.
    </p>,
  },
  {
    hidden: true,
    title: <a href="https://antenna.works">Antenna.works</a>,
    organization: "Antenna",
    location: "New Orleans, LA",
    timeFrame: "8/16 — 10/16",
    desc: <p>
      Built the new website for Antenna, "antenna.works."
      Reorganized and integrated the MySQL database from
      their old website.
    </p>,
  },
  {
    title: "You Belong Here",
    organization: "Tavares Strachan & Antenna",
    location: "New Orleans, LA",
    timeFrame: "9/14 — 2/15",
    desc: <p>
      Mobile app in JavaScript/Cordova that maps stories of
      belonging through photos and videos on Instagram. Wrote
      companion software that tracked a barge involved in the
      project.
    </p>,
  },
]
