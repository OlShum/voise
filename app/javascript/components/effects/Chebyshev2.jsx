import React from 'react'

import PlaySwitch from '../controls/PlaySwitch'
import ToggleSwitch from '../controls/ToggleSwitch'
import Slider2 from '../controls/Slider2'
import ButtonSet from '../controls/ButtonSet'

export default class Chebyshev2 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const set = ['none', '2x', '4x']

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
          <ToggleSwitch value="Che" current={on} handleClick={toggleEffect} />
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
            property="order"
            min="0"
            max="100"
            on={on}
            value={effect.order}
            handleValueChange={changeEffectValue}
          />
          <ButtonSet
            name={name}
            property="filter.oversample"
            set={set}
            value={effect.oversample}
            handleValueChange={changeEffectValue}
          />
        </div>
      </div>
    )
  }
}
