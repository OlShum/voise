import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class Tremolo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'tremolo'
    const {
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeTremoloDepthValue
    } = this.props
    return (
      <div>
        <div className="inSetBlock">
          <ToggleSwitch value="Trm" current={on} handleClick={toggleEffect} />
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
            value={effect.tremolo}
            handleValueChange={changeTremoloDepthValue}
          />
        </div>
      </div>
    )
  }
}
