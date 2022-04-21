import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'

hydrate(
  <App data='Clover' />,
  document.getElementById('app')
)