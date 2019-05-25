import React, { Component } from 'react'
import './computer0.scss'

interface Computer0State {
  program_counter: number
  instruction_memory: Instruction[]
  registers: number[]
}

enum Opcode {
  Nop,
  Add,
  Eq,
  Jeq,
  Jump,
  Halt,
  Load,
  Mov,
}

class Instruction {
  bits: number
  constructor(opcode: Opcode, operand1: number, operand2?: number) {
    if (operand2 === undefined) {
      this.bits = (opcode << 4) + operand1
    } else {
      this.bits = (opcode << 4) + (operand1 << 2) + operand2
    }
  }
}

function toBin(i: number) {
  return `${i.toString(2).padStart(8, '0')}`
}

export default class Computer0 extends Component<{}, Computer0State> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      program_counter: 0,
      instruction_memory: Array(20).fill(new Instruction(0, 0)),
      registers: Array(4).fill(0),
    }

    this.state.instruction_memory[0] = new Instruction(Opcode.Load, 3)
  }
  render() {
    return (
      <div style={{ position: 'relative' }}>
        <div className="program-counter">
          PC : {toBin(this.state.program_counter)}
        </div>
        <div className="instruction-memory">
          Instruction Memory <hr />
          {this.state.instruction_memory.map((m, idx) => (
            <div className="memory-cell">
              <span className="index">{idx}</span>
              <span className="value">: {toBin(m.bits)}</span>
            </div>
          ))}
        </div>
        <div className="registers">
          Registers
          {this.state.registers.map((r, idx) => (
            <div className="register">
              R{idx} : {toBin(r)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
