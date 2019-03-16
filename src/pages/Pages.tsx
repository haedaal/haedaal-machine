import React from 'react'

function Index() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Users() {
  return <h2>Users</h2>
}

interface Page {
  name: string
  pagef: any
}

const pages: Page[] = [
  {
    name: 'Index_Name',
    pagef: Index,
  },
  {
    name: 'About_Name',
    pagef: About,
  },
  {
    name: 'Users_Name',
    pagef: Users,
  },
]

export default pages