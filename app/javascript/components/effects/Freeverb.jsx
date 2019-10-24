import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class Freeverb extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'freeverb'
    const {
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeFreeverbRoomSizeValue,
      changeFreeverbDampeningValue
    } = this.props
    return (
      <div>
        <div className="inSetBlock">
          <ToggleSwitch value="Frv" current={on} handleClick={toggleEffect} />
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
            value={effect.freeverb}
            handleValueChange={changeFreeverbRoomSizeValue}
          />
          <Slider
            name={name}
            min="0"
            max="10000"
            value={effect.freeverb}
            handleValueChange={changeFreeverbDampeningValue}
          />
        </div>
      </div>
    )
  }
}
