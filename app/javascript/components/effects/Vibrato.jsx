import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class Vibrato extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'vibrato'
    const {
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeVibratoDepthValue
    } = this.props
    return (
      <div>
        <div className="inSetBlock">
          <ToggleSwitch value="Vbr" current={on} handleClick={toggleEffect} />
        </div>
        <div className="changeSetBlock">
          <Slider
            name={name}
            min="0"
            max="1"
            value={effect.wet.value}
            handleValueChange={changeEffectWetValue}
          />
          <Slider
            name={name}
            min="0"
            max="1"
            value={effect.vibrato}
            handleValueChange={changeVibratoDepthValue}
          />
        </div>
      </div>
    )
  }
}
