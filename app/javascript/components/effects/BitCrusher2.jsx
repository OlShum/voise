import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider2 from '../controls/Slider2'
import Knob from '../controls/Knob'

export default class BitCrusher2 extends React.Component {
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
          <ToggleSwitch value="Btc" current={on} handleClick={toggleEffect} />
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
            property="bits"
            min="0"
            max="100"
            on={on}
            value={effect.bits}
            handleValueChange={changeEffectValue}
          />
        </div>
      </div>
    )
  }
}
