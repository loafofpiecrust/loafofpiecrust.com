import React from "react"
import Layout from "components/layout/layout"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import theme, { mq } from "styles/theme"
import { flex, paddingX, paddingY, contrastBackground } from "styles/system/shortcuts"
import { siteMeta } from "config/metadata"

export default () => <Layout unpadded title="Resume">
  <div css={ResumeHeader}>
    <div css={[flex.row, flex.alignCenter]}>
      <header css={{ flex: 1 }}>
        <h1 css={{ margin: 0 }}>
          Taylor Snead
        </h1>
        <i css={{ margin: 0 }}>
          Available July &ndash; December 2019
        </i>
      </header>

      <div css={[flex.column, flex.alignEnd]}>
        <span>Boston, MA 02130</span>
        <span>taylorsnead@gmail.com</span>
        <span>Cell: 504-442-0219</span>
        <span><a href={siteMeta.siteUrl}>loafofpiecrust.com</a></span>
        <span>GitHub: <a href="https://github.com/loafofpiecrust">loafofpiecrust</a></span>
      </div>
    </div>
  </div>

  <div css={[flex.row, flex.wrap]}>
    <div css={LeftColumn}>
      <LeftSection>
        <h3 css={SectionHeader}>Education</h3>
        <div css={[flex.row, flex.justifyBetween, flex.wrap]}>
          <header css={{ flexGrow: 1 }}>
            <b>Northeastern University</b> &ndash; Boston, MA<br />
          </header>

          <div css={{ flexGrow: 1 }}>
            Candidate for Bachelor of Science<br />
            in Computer Science<br />
            Minor in Linguistics
          </div>
          <i css={{ textAlign: "right" }}>
            GPA: 3.4<br/>
            Graduation: 2021
          </i>
        </div>
        <div>
          <br/>
          <i><b>Honors: </b></i>
          University Scholar (top 1% of incoming class)
          <br/>
          <i><b>Relevant Coursework:</b></i>
          <div css={[flex.row, flex.wrap, flex.justifyBetween]}>
            {courses.map((name) => <span key={name}>{name}</span>)}
          </div>
        </div>
      </LeftSection>

      <LeftSection>
        <h3 css={SectionHeader}>Skills</h3>
        {skills.map((item) => (
          <div css={flex.column} key={item.title}>
            <header><b>{item.title}</b></header>
            {item.desc}
          </div>
        ))}
      </LeftSection>

      <LeftSection>
        <h3 css={SectionHeader}>Personal Projects</h3>
        {personalProjects.filter((x) => !x.hidden).map((proj) => (
          <div css={flex.column} key={proj.title}>
            <header><b>{proj.title}</b></header>
            {proj.desc}
          </div>
        ))}
      </LeftSection>
    </div>

    <div css={RightColumn}>
      <RightSection>
        <h3 css={SectionHeader}>Work Experience</h3>
        {workExperience.filter((j) => !j.hidden).map((job) => (
          <div css={flex.column} key={job.timeFrame}>
            <header>
              <b>{job.title}</b>
              <i style={{ float: "right" }}>{job.timeFrame}</i>
            </header>
            <header>
              <b>{job.organization}</b>
              {job.location ? ` – ${job.location}` : null}
            </header>

            {job.desc}
          </div>
        ))}
      </RightSection>
    </div>
  </div>

  <h4 css={{ ...paddingX(20), paddingBottom: 20, textAlign: "center" }}>
    References Available Upon Request
  </h4>
</Layout>

const LeftColumn = css(
  flex.column,
  mq({
    flex: ["1 0 100%", 1],
    marginRight: [2, 4],
  }),
)

const RightColumn = css(
  flex.column,
  mq({
    flex: ["1 0", 1],
  }),
)

const inset = [3, 4, 5]
const verticalInset = 3

const coloredLink = (activeColor) => css({
  borderColor: activeColor,
  "&:hover": {
    color: activeColor,
  },
  "@media print": {
    borderBottom: "none",
  },
})

const cleanLink = css({
  borderBottom: "none",
  "&:hover": {
    color: "initial",
  },
})

const ResumeHeader = css(mq({
  ...paddingX(inset),
  ...paddingY(26),
  ...contrastBackground(theme.colors.link),
  marginBottom: 24,
  a: coloredLink("navy"),
  // a: cleanLink,
  fontFamily: theme.fonts.header,
}))

const SectionHeader = css(mq({
  ...paddingX(inset),
  ...paddingY(verticalInset),
  ...contrastBackground(theme.colors.background),
  // boxShadow: theme.shadows[1],
}))

const ResumeSection = (side: "left" | "right") => styled("section")(mq({
  marginBottom: 30,
  "& > *": {
    paddingLeft: side === "left" ? inset : 2,
    paddingRight: side === "left" ? 2 : inset,
  },
  h3: {
    textAlign: side,
    borderRadius: side === "left" ? "0 3px 3px 0" : "3px 0 0 3px",
  },
  a: coloredLink(theme.colors.link),
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
  "Machine Structure & x86 Assembly",
  "Biostatistics",
  "Linguistic Analysis",
  "Physics 1 & 2",
  // "3D Fundamentals",
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
    title: "Software Engineer",
    organization: "PlacePass",
    location: "Boston, MA",
    timeFrame: "July '19 – Present",
    desc: <p>
      Rebuild search results pages in React.
      Use terraform to provision cloud infrastructure for backend services.
      Improve GraphQL search service in Go, part of tech stack transition.
      Learn ML basics and improve Tensorflow models for product
      categorization.
    </p>
  },
  {
    title: "Software Developer",
    organization: "Autodesk",
    location: "Boston, MA",
    timeFrame: "July '18 – April '19",
    desc: <p>
      Build cloud content browser for Autodesk Revit in React and Typescript, on team of six.
      Devise solution for representing content taxonomy with node graph.
      Collaborate with UX designer on responsive UI.
      Cooperate with another team on shared data management library.
      Presented at quarterly company check-in and customer demo representing my team.
    </p>,
  },
  {
    title: "iOS Developer",
    organization: <a href="https://roundware.org">Roundware</a>,
    location: "Boston, MA",
    timeFrame: "Jan '18 – Present",
    desc: <p>
      Architect client-side audio mixing system to
      decrease server load by >90% and facilitate more complex projects.
      Augment audio experiences in 3D environments using device location and gyroscope.
    </p>,
  },
  {
    title: "Laser Technician",
    organization: "Northeastern University",
    location: "Boston, MA",
    timeFrame: "Jan '18 – May '18",
    desc: <p>
      Operated Makerspace laser cutters and assisted students
      with fabrication projects in various mediums including paper, wood, and acrylic.
    </p>,
  },
  {
    title: <a href="https://paletteapp.city">City Palette</a>,
    organization: "Chloe Bass & Antenna",
    location: "New Orleans, LA",
    timeFrame: "Oct '17 – Jan '18",
    desc: <p>
      Implemented mobile app allowing users to name and publish
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
    timeFrame: "Jan '17 – May '17",
    desc: <p>
      Edited and assembled footage. Created 10 digital stop-motion
      animation sequences in the Adobe suite.
    </p>,
  },
  {
    title: "Software Developer",
    organization: "Gameloft",
    location: "New Orleans, LA",
    timeFrame: "Jan '15 – Aug '15",
    desc: <p>
      Implemented and tested user interfaces in C++ and
      Scaleform for a mobile game.
      Learned foundational AGILE methodology on eight person team.
      Updated team to C++11 standards for increased efficiency.
    </p>,
  },
  {
    hidden: true,
    title: "You Belong Here",
    organization: "T. Strachan & Antenna",
    location: "New Orleans, LA",
    timeFrame: "Sept '14 – Feb '15",
    desc: <p css={{ marginBottom: 0 }}>
      Developed mobile app in JavaScript mapping stories of
      belonging through user photos and videos. Integrated with Instagram and Google Places APIs.
    </p>,
  },
]

const skills: Array<{
  title: any
  desc: any
  hidden?: boolean
}> = [
  {
    title: "Technical Proficiencies",
    desc: <p>
      Kotlin, Rust, Swift, C++, Go, Java, JS, x86 Assembly,
      LaTeX, HTML/CSS, React, Node.js,
      Linux, Git, OpenGL, Terraform,
      MongoDB, AWS, Firebase, Adobe suite
    </p>
  },
  {
    title: "Hobbies",
    desc: <div>
      Linguistics,
      Global Travel,
      Sewing,
      Playing Accordion,
      Baking,
      Woodworking
      <br/>
      Volunteer weekly at Boston Building Resources.
    </div>,
  },
]

const personalProjects: Array<{
  title: any
  subtitle?: string
  desc: any
  hidden?: boolean
}> = [
  {
    title: <><a href="/projects/turntable">Turntable</a> (Android, Kotlin)</>,
    desc: <p>
      Mobile music player allowing users across the Earth from each other to listen to an album or playlist together.
      Facilitates discovery by allowing users to search several music databases in one place.
      Handles local files and includes free music streaming.
      Uses Firebase for queued messaging and playlist storage.
    </p>,
  },
  {
    title: "Lovebug (In Progress, Rust)",
    desc: <>
    <i>"I was just another virus... until I met you."</i>
    <p css={{ marginBottom: 0 }}>
      Benign virus that interacts with users
      through the OS UI and exhibits complex romantic feelings,
      which may or may not be reciprocated.
    </p></>
  },
  {
    hidden: true,
    title: "Community Service",
    desc: <div>
      Volunteer weekly at Boston Building Resources, assembling fixtures and preparing items for display.
    </div>,
  },
]

const freelanceProjects: Array<{
  title: any
  organization: any
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
