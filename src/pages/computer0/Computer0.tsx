import React, { Component } from 'react'
import './computer0.scss'

interface Computer0State {
  program_counter: number
  instruction_memory: Instruction[]
  registers: number[]
}

function next(state: Computer0State): Computer0State {
  let { program_counter, instruction_memory, registers } = state
  let fetched = instruction_memory[program_counter]
  switch (fetched.opcode) {
    case Opcode.Load: {
      registers[0] = fetched.operand1
      break
    }
    case Opcode.Mov: {
      registers[fetched.operand2!] = registers[fetched.operand1]
      break
    }
    case Opcode.Add: {
      registers[0] = registers[fetched.operand1] + registers[fetched.operand2!]
      break
    }
    case Opcode.Gt: {
      registers[0] =
        registers[fetched.operand1] > registers[fetched.operand2!] ? 0 : 1
      break
    }
    case Opcode.Jz: {
      if (registers[0] == 0) {
        program_counter += fetched.operand1
      }
      break
    }
    case Opcode.JumpBack: {
      program_counter -= fetched.operand1
      break
    }
    case Opcode.Halt: {
      alert(`program halted with r0 ${registers[0]}`)
      program_counter -= 1
      break
    }
    default: {
      alert(`opcode ${OpcodeMap[fetched.opcode]} not implemented`)
    }
  }
  return {
    program_counter: program_counter + 1,
    instruction_memory,
    registers,
  }
}

enum Opcode {
  Nop,
  Add,
  Eq,
  Gt,
  Jz,
  Jump,
  JumpBack,
  Load,
  Mov,
  Halt,
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

const fibProgram = [
  // a0 = 1, a1 = 1, b = 15
  new Instruction(Opcode.Load, 1),
  new Instruction(Opcode.Mov, 0, 1),
  new Instruction(Opcode.Mov, 0, 2),
  new Instruction(Opcode.Load, 15),
  new Instruction(Opcode.Mov, 0, 3),
  // do a(n+2) = a(n+1) + a(n)
  new Instruction(Opcode.Add, 1, 2),
  // while a(n+2) < b
  new Instruction(Opcode.Mov, 2, 1),
  new Instruction(Opcode.Mov, 0, 2),
  new Instruction(Opcode.Gt, 2, 3),
  new Instruction(Opcode.Jz, 1),
  new Instruction(Opcode.JumpBack, 6),
  // return a(n+2)
  new Instruction(Opcode.Mov, 2, 0),
  new Instruction(Opcode.Halt, 0),
]

const simpleAddProgram = [
  new Instruction(Opcode.Load, 3),
  new Instruction(Opcode.Mov, 0, 1),
  new Instruction(Opcode.Load, 5),
  new Instruction(Opcode.Add, 0, 1),
]

export default class Computer0 extends Component<{}, Computer0State> {
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      program_counter: 0,
      instruction_memory: Array(20).fill(new Instruction(0, 0)),
      registers: Array(4).fill(0),
    }

    let program = fibProgram

    this.state.instruction_memory.splice(0, program.length, ...program)
  }
  reset = () => {
    this.setState({
      program_counter: 0,
    })
  }
  step = () => {
    this.setState(next(this.state))
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
          <button onClick={this.step}>Step</button>
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
