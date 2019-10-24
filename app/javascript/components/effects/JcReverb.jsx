import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class JCReverb extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'jcReverb'
    const {
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeJcReverbValue
    } = this.props
    return (
      <div>
        <div className="inSetBlock">
          <ToggleSwitch value="JCR" current={on} handleClick={toggleEffect} />
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
            value={effect.jcReverb}
            handleValueChange={changeJcReverbValue}
          />
        </div>
      </div>
    )
  }
}
