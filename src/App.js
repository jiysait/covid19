import  React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Main from './components/Main'

import './App.scss'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Main} />
      </Switch>
    </Router>
  )
}