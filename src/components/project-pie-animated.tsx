 import React from "react"
import { Stage, Layer, Text, Arc, Wedge, Circle, Line, Group } from "react-konva"
import { Project, projects } from "./projects-pie"
import { Spring, animated } from "react-spring/dist/konva"
import Victor from "victor"
import { ContainerConfig } from "konva"
import topCrust from "images/pie-fillings/top-crust2.svg"
import outerCrust from "images/pie-fillings/basic-crust.svg"

export class ProjectPie extends React.Component<{
  width: number
  height: number
  onSelect?: (Project) => void
}> {
  state = { selected: null }

  render() {
    const radius = 200
    let currLines = 0
    let totalLines = projects.reduce((acc, proj) => acc + proj.linesOfCode, 0)
    return <Stage
      width={this.props.width}
      height={this.props.height}
    >
      <Layer x={this.props.width / 2} y={this.props.height / 2}>
        <Circle radius={radius} fill={colors.pan} />
        {projects.map(project => {
          const slice = <PieSlice key={project.title}
            project={project}
            startLineNumber={currLines}
            totalLines={totalLines}
            radius={radius}
            selected={project === this.state.selected}
            onClick={() => {
              if (this.props.onSelect) {
                this.props.onSelect(project)
              }
              this.setState({ selected: project })
            }}
          />
          currLines += project.linesOfCode
          return slice
        })}
      </Layer>
    </Stage>
  }
}

const PieSlice = (props: {
  project: Project
  startLineNumber: number
  totalLines: number
  radius: number
  selected?: boolean
  onClick?: (Event) => void
}) => {
  const { onClick, selected, project } = props
  const maxJutDist = 50
  const crustThickness = 15
  const baseRadius = props.radius
  const angularWidth = (props.project.linesOfCode / props.totalLines) * 360
  const startAngle = (props.startLineNumber / props.totalLines) * 360
  const middleAngle = (startAngle * 2 + angularWidth) / 2

  const normalState = { jutDist: 0, crustOpacity: 1 }
  const selectedState = { jutDist: maxJutDist, crustOpacity: 0 }
  
  let from
  let to
  if (selected) {
    from = normalState
    to = selectedState
  } else {
    from = selectedState
    to = normalState
  }

  // animate the offset!
  return (
    <Spring to={to}>
      {props => {
        const middle = new Victor(1, 0).rotateDeg(middleAngle)
        const offset = middle.clone().multiplyScalar(props.jutDist)
        return <Group {...offset} onClick={onClick}>
          {/* Filling */}
          <Wedge
            radius={baseRadius}
            angle={angularWidth}
            rotation={startAngle}
            fillPatternImage={image(project.filling)}
            fillPatternScale={{ x: 0.38, y: 0.38 }}
            fillPatternRepeat="repeat"
            fillPatternRotation={middleAngle}
          />
          {/* Top crust */}
          <Wedge
            radius={baseRadius}
            angle={angularWidth}
            rotation={startAngle}
            opacity={props.crustOpacity}
            fillPatternImage={image(topCrust)}
            fillPatternScale={{ x: 1.3, y: 1.3 }}
            fillPatternRepeat="repeat"
          />
          {/* Outer crust */}
          <Arc
            outerRadius={baseRadius + (crustThickness / 2)}
            innerRadius={baseRadius - (crustThickness / 2)}
            angle={angularWidth}
            rotation={startAngle}
            fill={colors.crust}
          />
          {angularWidth > 35 ?
            <WhippedCream
              {...middle.clone().multiplyScalar(baseRadius / 2)}
              rotation={middleAngle}
              opacity={props.crustOpacity}
            />
          : null}
        </Group>
      }}
    </Spring>
  )
}

const WhippedCream = (props: ContainerConfig) => {
  const r = 20
  return <Group {...props}>
    <Circle
      radius={r}
      fill="#fff2cd"
    />
    <Line x={0} y={r/2}
        points={spiralPoints(r, 12)}
        stroke="#ffe7a1"
        tension={5/9}
        lineCap="round"
        lineJoin="bevel"
        strokeWidth={6}
      />
  </Group>
}


const colors = {
  // filling: "#e96a09",
  filling: "rebeccapurple",
  crust: "#fcc987",
  topCrust: "#f6ac41",
  pan: "transparent",
}


function spiralPoints(radius: number, dist: number): number[] {
  const points = []
  let top = { x: 0, y: 0 }
  let currRadius = 0

  while (currRadius < radius) {
    top = {
      x: top.x,
      y: top.y - dist,
    }

    points.push(top.x, top.y)
    points.push(top.x - currRadius, top.y + currRadius)
    points.push(top.x, top.y + (currRadius * 2))
    points.push(top.x + currRadius, top.y + currRadius)

    currRadius = Math.abs(top.y)
  }

  return points
}

function image(src: string, width?: number, height?: number) {
  const i = new Image(width, height)
  i.src = src
  return i
}