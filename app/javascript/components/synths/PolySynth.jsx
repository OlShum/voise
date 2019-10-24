import _ from 'lodash'
import React from 'react'
import Tone from 'tone'
import classnames from 'classnames'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider from '../controls/Slider'
import Knob from '../controls/Knob'
import ButtonSet from '../controls/ButtonSet'

export default class PolySynth extends React.Component {
  constructor(props) {
    super(props)
    _.bindAll(this, 'handleValueChange')
  }

  handleValueChange(name, property, value) {
    const { changeSynthValue } = this.props
    changeSynthValue(name, property, value)
  }

  render() {
    const { synth, on, togglePlay } = this.props

    // const { attack, decay, sustain, release } = instrument.envelope

    return (
      <div className="PolySynth">
        <ToggleSwitch value="" current={on} handleClick={togglePlay} />
      </div>
    )
  }
}
