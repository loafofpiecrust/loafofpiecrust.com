import React from "react"
import Layout from "components/layout"
import styled from "react-emotion"
import { Box, Text, Card } from "styles/system/text"
import { Flex, Column, Row } from "styles/system/flex"
import withProps from "recompose/withProps"
import { mq } from "styles/theme";
import { themed } from "styles/system/theming";


export default () => (
  <Layout unpadded title="Resume">
    <ResumeHeader>
      <Flex alignCenter>
        <Text as="h2" color="white" flex={1} m={0}>
          Taylor Snead
        </Text>
        
        <Flex column alignEnd>
          {/* <span>275 Lamartine St #1, Jamaica Plain, MA 02130</span> */}
          <span>taylorsnead@gmail.com</span>
          <span>Cell: 504-442-0219</span>
          <span><a href="/">loafofpiecrust.com</a></span>
          <span>GitHub: <a href="https://github.com/loafofpiecrust">loafofpiecrust</a></span>
        </Flex>
      </Flex>
    </ResumeHeader>

    <Flex wrap>
      <Flex column flex={1} mr={[2, 4]}>
        <LeftSection>
          <SectionHeader>Education</SectionHeader>
          <Flex justifyBetween>
            <Text as="p" flex={1}>
              <b>Northeastern University</b><br />
              Candidate for Bachelor of Science<br />
              in Computer Science
            </Text>
            <Text as="i" textAlign="right">
              Boston, MA<br />
              GPA: 3.4<br />
              Graduation: 2021
            </Text>
          </Flex>
          <p>
            <i>
              <b>Honors:</b>
            </i>{" "}
            University Scholar, Honors Program
            <br />
            <i>
              <b>Relevant Coursework:</b>
            </i>
            <Flex wrap justifyBetween>
              {courses.map(name => <span key={name}>{name}</span>)}
            </Flex>
          </p>
        </LeftSection>

        <LeftSection>
          <SectionHeader>Freelance Projects</SectionHeader>
          {freelanceProjects.map(proj => (
            <Flex column key={proj.timeFrame}>
              <span><b>{proj.title}</b></span>
              <span><b>{proj.organization}</b> - {proj.location}</span>
              {proj.desc}
            </Flex>
          ))}
        </LeftSection>
      </Flex>

      <Flex column flex={1}>
        <RightSection>
          <SectionHeader>Work Experience</SectionHeader>
          {workExperience.filter(j => !j.hidden).map(job => (
            <Flex column key={job.timeFrame}>
              <span>
                <b>{job.position}</b>
                <i style={{ float: "right" }}>{job.timeFrame}</i>
              </span>
              <span>
                <b>{job.organization}</b>
                {job.location ? ` - ${job.location}` : null}
              </span>

              {job.desc}
            </Flex>
          ))}
        </RightSection>

        <RightSection>
          <SectionHeader>Personal Projects</SectionHeader>
          {personalProjects.map(proj => (
            <Flex column key={proj.title}>
              <span><b>{proj.title}</b></span>
              <p>{proj.desc}</p>
            </Flex>
          ))}
        </RightSection>
      </Flex>
    </Flex>
  </Layout>
)

const inset = [3, 4, 5]
const verticalInset = 3

const coloredLink = (color) => ({
  color: color,
  borderColor: color,
  "&:hover": {
    borderColor: "transparent",
  }
})

const ResumeHeader = withProps({
  mb: 4,
  color: "whiteText",
  // bg: "rgb(255, 12, 70)",
  bg: "coral",
})(styled(Text)(mq({
  px: inset,
  py: 4,
  marginBottom: 4,
  a: coloredLink("mediumspringgreen"),
})))

const SectionHeader = withProps({
  as: "h3",
  bg: "mediumseagreen",
  boxShadow: 1,
})(styled(Card)(mq({
  fontWeight: "normal",
  color: "whiteText",
  py: verticalInset,
  px: inset,
})))

const ResumeSection = (side: "left" | "right") => withProps({
  as: "section",
  mb: 4
})(styled(Box)(mq({
  "& > *": {
    paddingLeft: side === "left" ? inset : 2,
    paddingRight: side === "left" ? 2 : inset,
  },
  h3: {
    textAlign: side,
    borderRadius: side === "left" ? "0 3px 3px 0" : "3px 0 0 3px",
  }
})))

const LeftSection = ResumeSection("left")
const RightSection = ResumeSection("right")

const courses: string[] = [
  "Programming Languages",
  "Algorithms & Data",
  "Logic & Computation",
  "Computer Systems",
  "Object-Oriented Design",
  "Linear Algebra",
  "Machine Structure & x86 Assembly",
]

const workExperience: {
  position: string
  organization: string
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
    position: "Junior iOS Developer (Remote)",
    organization: "Roundware",
    location: null,
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
    title: "Turntable",
    desc: `
    Music player for Android that allows users to sync their
    listening sessions over the internet, playing the music from
    accessible free sources: the device itself, YouTube, and P2P
    transfer from the other user themselves.
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
