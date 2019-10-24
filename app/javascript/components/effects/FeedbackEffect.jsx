import React from 'react'

import PlaySwitch from '../PlaySwitch'
import ToggleSwitch from '../ToggleSwitch'
import Slider from '../Slider'
import Knob from '../Knob'

export default class FeedbackEffect extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let name = 'feedbackEffect'
    const {
      feedbackEffect,
      effect,
      on,
      toggleEffect,
      changeEffectWetValue,
      changeFeedbackEffectValue
    } = this.props
    return (
      <div>
        <div className="inSetBlock">
          <ToggleSwitch value="Fdb" current={on} handleClick={toggleEffect} />
        </div>
        <div className="changeSetBlock">
          <Slider
            name={name}
            min="0"
            max="1"
            value={effect.wet.value}
            handleValueChange={changeEffectWetValue}
          />
          <Knob
            min="-3"
            max="3"
            value={effect.feedbackEffect}
            handleValueChange={changeFeedbackEffectValue}
          />
        </div>
      </div>
    )
  }
}
