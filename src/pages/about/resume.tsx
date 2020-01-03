import React from "react"
import Layout from "components/layout/layout"
import styled from "@emotion/styled"
import {css} from "@emotion/core"
import theme, {mq} from "styles/theme"
import {
  flex,
  paddingX,
  paddingY,
  contrastBackground,
} from "styles/system/shortcuts"
import siteMeta from "content/metadata"
import h from "components/markup"

export default () => (
  h(Layout, {unpadded: true, title: "Resume"}, [
    h(ResumeContents, [
      h(ResumeHeader, [
        h.div({css: {flex: 1}}, [
          h.h1({css: {margin: 0}}, "Taylor Snead"),
          h.i({css: {margin: 0}}, "Available July – December 2020"),
        ]),

        h.div({css: [flex.column, flex.alignEnd]}, [
          h.span("Boston, MA 02130"),
          h.span("taylorsnead@gmail.com"),
          h.span("Cell: 504-442-0219"),
          h.span({}, h.a({href: siteMeta.siteUrl}, "loafofpiecrust.com")),
          h.span([
            "GitHub: ",
            h.a({href: "https://github.com/loafofpiecrust"}, "loafofpiecrust"),
          ]),
        ]),
      ]),

      h(LeftSection, [
        h(SectionHeader, "Education"),
        h.div({css: [flex.row, flex.justifyBetween, flex.wrap]}, [
          h.header({css: {flexGrow: 1}}, [
            h.b("Northeastern University"),
            " – Boston, MA",
          ]),

          h.div({css: {flexGrow: 1}}, [
            "Candidate for Bachelor of Science", h.br(),
            "in Computer Science", h.br(),
            "Minor in Linguistics",
          ]),
          h.i({css: {textAlign: "right"}}, [
            "GPA: 3.4", h.br(),
            "Graduation: 2021",
          ]),
        ]),
        h.div([
          h.br(),
          h.i(null, h.b("Honors: ")),
          "University Scholar (top 1% of incoming class)",
          h.br(),
          h.i(null, h.b("Relevant Coursework:")),
          h.div(
            {css: [flex.row, flex.wrap, flex.justifyBetween]},
            courses.map((name) => h.span({key: name}, name)),
          ),
        ]),
      ]),

      h(LeftSection, [
        h(SectionHeader, "Skills"),
        skills.map((item) => (
          h.section({css: flex.column, key: item.title}, [
            h.h4(item.title),
            item.desc,
          ])
        )),
      ]),

      h(LeftSection, [
        h(SectionHeader, "Personal Projects"),
        personalProjects
          .filter((x) => !x.hidden)
          .map((proj) => (
            h.section({css: flex.column, key: proj.title}, [
              h.h4([proj.title]),
              proj.desc,
            ])
          )),
      ]),

      h(RightSection, [
        h(SectionHeader, "Work Experience"),
        workExperience
          .filter((j) => !j.hidden)
          .map((job) =>
            h(JobSection, {key: job.timeFrame}, [
              h.b([job.title]),
              h.i([job.timeFrame]),
              h.span([
                h.b([job.organization]),
                job.location ? ` – ${job.location}` : null,
              ]),
              h.p({css: {gridArea: "main"}}, job.desc),
            ])
          ),
      ]),

      h.h4({css: [paddingX(20), {paddingBottom: 20, textAlign: "center", gridArea: "bottom"}]}, [
        "References Available Upon Request",
      ]),
    ]),
  ])
)

const JobSection = styled.section({
  display: "grid",
  grid: "repeat(3, auto) / 1fr auto",
  gridAutoFlow: "row",
  gridTemplateAreas: `
    "topleft topright"
    "byline byline"
    "main main"
  `,
})

const ResumeContents = styled.article(mq({
  display: "grid",
  gridColumnGap: [2, 4],
  gridAutoFlow: "column dense",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "repeat(5, auto)",
  gridTemplateAreas: `
    "header header"
    "topleft right"
    "midleft right"
    "btmleft right"
    "bottom bottom"
  `,
}))

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

const ResumeHeader = styled.header(mq({
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
  gridArea: "header",
  marginBottom: 24,
  fontFamily: theme.fonts.header,
  ...paddingX(inset),
  ...paddingY(26),
  ...contrastBackground(theme.colors.link),
  a: coloredLink("navy"),
}))

const SectionHeader = styled.h3(mq({
  ...paddingX(inset),
  ...paddingY(verticalInset),
  ...contrastBackground(theme.colors.background),
}))

const ResumeSection = (side: "left" | "right") =>
  styled.section(
    {marginBottom: 30},
    mq({
      "& > *": {
        paddingLeft: side === "left" ? inset : 2,
        paddingRight: side === "left" ? 2 : inset,
      },
      h3: {
        textAlign: side,
        borderRadius: side === "left" ? "0 3px 3px 0" : "3px 0 0 3px",
      },
      h4: {
        marginBottom: 0,
      },
      a: coloredLink(theme.colors.link),
    }),
  )

const LeftSection = ResumeSection("left")
const RightSection = styled(ResumeSection("right"))({
  gridArea: "right",
})

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
  // "Intro to Linguistics",
  // "3D Fundamentals",
]

const workExperience: Array<{
  title: any;
  organization: any;
  location?: string;
  timeFrame: string;
  desc: any;
  hidden?: boolean;
}> = [
    {
      title: "Software Engineer",
      organization: "PlacePass",
      location: "Boston, MA",
      timeFrame: "July '19 – Present",
      desc: `
          Rebuild search results pages in React. Use terraform to provision cloud
          infrastructure for backend services. Improve GraphQL search service in
          Go, part of tech stack transition. Learn ML basics and improve
          Tensorflow models for product categorization.
      `,
    },
    {
      title: "Software Engineer",
      organization: "Autodesk",
      location: "Boston, MA",
      timeFrame: "July '18 – April '19",
      desc: `
          Build cloud content browser for Autodesk Revit in React and Typescript.
          Devise solution for representing content taxonomy with node graph.
          Collaborate with UX designer on responsive UI. Presented at quarterly
          company check-in representing my team.
      `,
    },
    {
      title: "iOS Developer",
      organization: <a href="https://roundware.org">Roundware</a>,
      location: "Boston, MA",
      timeFrame: "Jan '18 – Present",
      desc: `
          Mobile app where users share their stories by voice, so that others
          walking around in the same space hear the voices of past visitors in
          stereo, literally walking in their footsteps. Rebuild the iOS framework
          to facilitate complex projects with decreased audio and network latency.
      `,
    },
    {
      title: "Laser Technician",
      organization: "Northeastern University",
      location: "Boston, MA",
      timeFrame: "Jan '18 – May '18",
      desc: `
          Operated Makerspace laser cutters and assisted students with fabrication
          projects in various mediums including paper, wood, and acrylic.
      `,
    },
    {
      title: <a href="https://paletteapp.city">City Palette</a>,
      organization: "Chloe Bass & Antenna",
      location: "New Orleans, LA",
      timeFrame: "Oct '17 – Jan '18",
      desc: `
          Implemented mobile app allowing users to name and publish dominant
          colors from photos, geotagged to where the photo was taken. Developed
          natively for iOS (Swift) and Android (Kotlin, JVM), storing published
          colors in a MongoDB instance.
      `,
    },
    {
      hidden: true,
      title: "Research Assistant",
      organization: "Northeastern University",
      location: "Boston, MA",
      timeFrame: "Jan '17 – May '17",
      desc: `
          Edited and assembled footage. Created 10 digital stop-motion animation
          sequences in the Adobe suite.
      `,
    },
    {
      hidden: true,
      title: "Software Developer",
      organization: "Gameloft",
      location: "New Orleans, LA",
      timeFrame: "Jan '15 – Aug '15",
      desc: `
          Implemented and tested user interfaces in C++ and Scaleform for a mobile
          game. Learned foundational AGILE methodology on eight person team.
          Updated team to C++11 standards for increased efficiency.
      `,
    },
    {
      hidden: false,
      title: "You Belong Here",
      organization: "T. Strachan & Antenna",
      location: "New Orleans, LA",
      timeFrame: "Sept '14 – Feb '15",
      desc: `
        Developed mobile app in JavaScript mapping stories of belonging through
        user photos and videos. Integrated with Instagram and Google Places
        APIs.
      `,
    },
  ]

const skills: Array<{
  title: any;
  desc: any;
  hidden?: boolean;
}> = [
  {
    title: "Technical Proficiencies",
    desc: (
      <p>
        Kotlin, Rust, Swift, C++, Go, Java, JS, x86 Assembly, LaTeX, HTML/CSS,
        React, Node.js, Linux, Git, OpenGL, Terraform, MongoDB, AWS, Firebase,
        Adobe suite
    </p>
    ),
  },
  {
    title: "Hobbies",
    desc: (
      <div>
        Mandarin, Travel, Sewing, Accordion, Baking, Woodworking, Biking
      <br />
        Volunteer weekly at Boston Building Resources.
    </div>
    ),
  },
]

const personalProjects: Array<{
  title: any;
  subtitle?: string;
  desc: any;
  hidden?: boolean;
}> = [
  {
    title: (
      <>
        <a href="/projects/turntable">Turntable</a> (Android, Kotlin)
    </>
    ),
    desc: (
      <p>
        Mobile music player allowing users across the Earth from each other to
        listen to an album or playlist together. Facilitates discovery by
        allowing users to search several music databases in one place. Handles
        local files and includes free music streaming. Uses Firebase for queued
        messaging and playlist storage.
    </p>
    ),
  },
  {
    title: "Lovebug (In Progress, Rust)",
    desc: (
      <>
        <i>"I was just another virus... until I met you."</i>
        <p css={{marginBottom: 0}}>
          Benign virus that interacts with users through the OS UI and exhibits
          complex romantic feelings, which may or may not be reciprocated.
      </p>
      </>
    ),
  },
  {
    hidden: true,
    title: "Community Service",
    desc: (
      <div>
        Volunteer weekly at Boston Building Resources, assembling fixtures and
        preparing items for display.
    </div>
    ),
  },
]

const freelanceProjects: {
  title: any;
  organization: any;
  location: string;
  timeFrame?: string;
  desc: any;
  hidden?: boolean;
}[] = [
    {
      title: <a href="https://paletteapp.city">City Palette</a>,
      organization: "Chloe Bass & Antenna",
      location: "New Orleans, LA",
      timeFrame: "Oct '17 — Jan '18",
      desc: (
        <p>
          Mobile app that allows users to name and publish dominant colors from
          photos, geotagged to where the photo was taken. Developed on my own,
          natively for both iOS (Swift) and Android (Java and Kotlin), using a
          MongoDB instance to store submitted colors.
      </p>
      ),
    },
    {
      hidden: true,
      title: <a href="https://antenna.works">Antenna.works</a>,
      organization: "Antenna",
      location: "New Orleans, LA",
      timeFrame: "8/16 — 10/16",
      desc: (
        <p>
          Built the new website for Antenna, "antenna.works." Reorganized and
          integrated the MySQL database from their old website.
      </p>
      ),
    },
    {
      title: "You Belong Here",
      organization: "Tavares Strachan & Antenna",
      location: "New Orleans, LA",
      timeFrame: "9/14 — 2/15",
      desc: (
        <p>
          Mobile app in JavaScript/Cordova that maps stories of belonging through
          photos and videos on Instagram. Wrote companion software that tracked a
          barge involved in the project.
      </p>
      ),
    },
  ]
