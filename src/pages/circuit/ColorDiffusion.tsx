import React, { Component } from 'react'
import './circuit.css'

const COLOR1 = [0, 0, 0]
const COLOR2 = [255, 100, 100]
const DIFFUSION_COEFF = 0.01

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

class ColorDiffusion extends Component {
  render() {
    return (
      <div>
        <h2>Color Diffusion</h2>
        <div>
          {cells.map(cell => {
            return <div className="cell" />
          })}
        </div>
      </div>
    )
  }
}

export default ColorDiffusion
