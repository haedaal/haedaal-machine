import React, { Component } from 'react'
import './circuit.css'

const COLOR1 = [0, 0, 0]
const COLOR2 = [255, 100, 100]
const DIFFUSION_COEFF = 0.1

let cells = [0, 0, 0, 0, 0, 0, 0, 0, 0]
cells.forEach((v, i) => (cells[i] = Math.random()))

function next(cells: number[]): number[] {
  return cells.map((v, i, arr) => {
    if (i == 0) {
      return 0
    } else if (i == cells.length - 1) {
      return 1
    } else {
      return (
        arr[i] * (1 - 2 * DIFFUSION_COEFF) +
        arr[i - 1] * DIFFUSION_COEFF +
        arr[i + 1] * DIFFUSION_COEFF
      )
    }
  })
}

function getColor(r: number) {
  let c1 = COLOR1.map(c => c * r)
  let c2 = COLOR2.map(c => c * (1 - r))
  return c1.map((c, i) => c + c2[i])
}

interface ColorDiffusionState {
  cells: number[]
}

class ColorDiffusion extends Component<{}, ColorDiffusionState> {
  timerID?: NodeJS.Timeout
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      cells,
    }
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 100)
  }
  componentWillUnmount() {
    clearInterval(this.timerID!)
  }
  tick() {
    this.setState({ cells: next(this.state.cells) })
  }
  render() {
    let cells = this.state.cells
    return (
      <div>
        <h2>Color Diffusion</h2>
        <div>
          {cells.map((cell, i) => {
            let color = getColor(cell)
            let style = {
              backgroundColor: `rgb(${color})`,
            }
            return <div key={i} className="cell" style={style} />
          })}
        </div>
      </div>
    )
  }
}

export default ColorDiffusion
