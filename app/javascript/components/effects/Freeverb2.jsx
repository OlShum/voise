import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider2 from '../controls/Slider2'
import Knob from '../controls/Knob'

export default class Freeverb2 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      name,
      effect,
      wet,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeEffectValue
    } = this.props

    return (
      <div>
        <div className="inSetBlock">
          <ToggleSwitch value="Frv" current={on} handleClick={toggleEffect} />
        </div>
        <div className="changeSetBlock">
          <Slider2
            name={name}
            property="wet"
            min="0"
            max="1"
            value={wet}
            handleValueChange={changeEffectWetValue}
          />
          <Slider2
            name={name}
            property="roomSize.value"
            min="0"
            max="100"
            on={on}
            value={effect.roomSize.value}
            handleValueChange={changeEffectValue}
          />
          <Slider2
            name={name}
            property="dampening.value"
            min="0"
            max="5000"
            on={on}
            value={effect.dampening.value}
            handleValueChange={changeEffectValue}
          />
        </div>
      </div>
    )
  }
}
