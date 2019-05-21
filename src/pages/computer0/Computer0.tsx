import React, { Component } from 'react'
import './computer0.scss'

interface Computer0State {
  program_counter: number
  instruction_memory: number[]
  registers: number[]
}

export default class Computer0 extends Component<{}, Computer0State> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      program_counter: 0,
      instruction_memory: Array(20).fill(0),
      registers: Array(4).fill(0),
    }
  }
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div className="program-counter">PC : {this.state.program_counter}</div>
        <div className="instruction-memory">
          Instruction Memory <hr />
          {this.state.instruction_memory.map((m, idx) => (
            <div className="memory-cell">
              <span className="index">{idx}</span>
              <span className="value">: {m}</span>
            </div>
          ))}
        </div>
        <div className="registers">
          Registers
          {this.state.registers.map((r, idx) => (
            <div className="register">
              R{idx} : {r}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
