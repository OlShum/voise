import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class Distortion extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'distortion'
    const {
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeDistortionValue
    } = this.props
    return (
      <div className="theInSetBlock">
        <div className="inSetBlock">
          <ToggleSwitch value="Dis" current={on} handleClick={toggleEffect} />
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
            max="100"
            value={effect.distortion}
            handleValueChange={changeDistortionValue}
          />
        </div>
      </div>
    )
  }
}
