import React from 'react'
import ReactDOM from 'react-dom'

import Synth2 from '../containers/Synth2'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Synth2 />,
    document.body.appendChild(document.createElement('div'))
  )
})
