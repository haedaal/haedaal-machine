import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import pages from './pages/Pages'

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              {pages.map((page, idx) => {
                return (
                  <li key={idx}>
                    <Link to={'/' + page.name}>{page.name}</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          {pages.map((page, idx) => {
            return (
              <Route
                key={idx}
                path={'/' + page.name + '/'}
                component={page.pagef}
              />
            )
          })}
        </div>
      </Router>
    )
  }
}

export default AppRouter
