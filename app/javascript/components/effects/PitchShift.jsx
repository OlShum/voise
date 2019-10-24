import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class PitchShift extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'pitchShift'
    const {
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changePitchShiftPitchValue,
      changePitchShiftWindowSizeValue
    } = this.props
    return (
      <div className="theInSetBlock">
        <div className="inSetBlock">
          <ToggleSwitch value="PtS" current={on} handleClick={toggleEffect} />
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
            value={effect.pitchShift}
            handleValueChange={changePitchShiftPitchValue}
          />
          <Slider
            name={name}
            min="0"
            max="100"
            value={effect.pitchShift}
            handleValueChange={changePitchShiftWindowSizeValue}
          />
        </div>
      </div>
    )
  }
}
