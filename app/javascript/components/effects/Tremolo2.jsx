import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider2 from '../controls/Slider2'
import ButtonSet from '../controls/ButtonSet'

export default class Tremolo2 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const typeSet = ['sine', 'square', 'triangle', 'sawtooth']

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
          <ToggleSwitch value="Trl" current={on} handleClick={toggleEffect} />
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
            property="depth.value"
            min="0"
            max="100"
            on={on}
            value={effect.depth.value}
            handleValueChange={changeEffectValue}
          />
          <ButtonSet
            name={name}
            property="filter.type"
            set={typeSet}
            value={effect.type}
            handleValueChange={changeEffectValue}
          />
        </div>
      </div>
    )
  }
}
