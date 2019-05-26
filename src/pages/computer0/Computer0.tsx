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

const OpcodeMap = Object.keys(Opcode).slice(Object.keys(Opcode).length / 2)

class Instruction {
  constructor(
    public opcode: Opcode,
    public operand1: number,
    public operand2?: number,
  ) {}

  get bits() {
    if (this.operand2 === undefined) {
      return (this.opcode << 4) + this.operand1
    } else {
      return (this.opcode << 4) + (this.operand1 << 2) + this.operand2
    }
  }
}

function toBin(i: number, digits: number = 8) {
  return `${i.toString(2).padStart(digits, '0')}`
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
    this.state.instruction_memory[1] = new Instruction(Opcode.Mov, 0, 1)
    this.state.instruction_memory[2] = new Instruction(Opcode.Load, 5)
    this.state.instruction_memory[3] = new Instruction(Opcode.Add, 0, 1)
  }
  reset = () => {
    this.setState({
      program_counter: 0,
    })
  }
  next = () => {
    let fetched = this.state.instruction_memory[this.state.program_counter]
    switch (fetched.opcode) {
      case Opcode.Load: {
        this.state.registers[0] = fetched.operand1
        break
      }
      case Opcode.Mov: {
        this.state.registers[fetched.operand2!] = this.state.registers[
          fetched.operand1
        ]
        break
      }
      case Opcode.Add: {
        this.state.registers[0] =
          this.state.registers[fetched.operand1] +
          this.state.registers[fetched.operand2!]
        break
      }
    }
    this.setState({
      ...this.state,
      program_counter: this.state.program_counter + 1,
    })
  }
  render() {
    let { program_counter, instruction_memory, registers } = this.state
    let fetched = instruction_memory[program_counter]
    let opcode = OpcodeMap[fetched.opcode]
    let operand1 = fetched.operand1
    let operand2 = fetched.operand2
    return (
      <div style={{ position: 'relative' }}>
        <div id="controller">
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.next}>Next</button>
        </div>
        <div className="program-counter rowbox1">
          PC : {toBin(this.state.program_counter)}
        </div>
        <div className="fetched-instruction rowbox1">
          <div>Fetched Instruction:</div>
          {toBin(fetched.bits)}
        </div>
        <div className="parsed-instruction rowbox1">
          <div>Parsed Instruction:</div>
          <div>
            {toBin(fetched.opcode, 4)} => {opcode}
          </div>
          <div>
            {operand2 === undefined
              ? `${toBin(operand1, 4)} => ${operand1}`
              : `${toBin(operand1, 2)} => ${operand1}`}
          </div>
          <div>
            {operand2 === undefined
              ? `-`
              : `${toBin(operand2, 2)} => ${operand2}`}
          </div>
        </div>
        <div className="instruction-memory">
          Instruction Memory <hr />
          {this.state.instruction_memory.map((m, idx) => (
            <div
              key={idx}
              className={`memory-cell${
                idx == program_counter ? ' active' : ''
              }`}
            >
              <span className="index">{idx}</span>
              <span className="value">: {toBin(m.bits)}</span>
            </div>
          ))}
        </div>
        <div className="registers rowbox1">
          Registers
          {this.state.registers.map((r, idx) => (
            <div key={idx} className="register">
              R{idx} : {toBin(r)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
