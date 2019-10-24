import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import * as effects from '../tunes/effects'
import * as synths from '../tunes/synths'

import ToggleSwitch from '../components/controls/ToggleSwitch'
import Slider from '../components/controls/Slider'
import Slider2 from '../components/controls/Slider2'
import ButtonSet from '../components/controls/ButtonSet'
import BPMSlider from '../components/controls/BPMSlider'
import VolumeSlider from '../components/controls/VolumeSlider'

import PolySynth from '../components/synths/PolySynth'

import Distortion2 from '../components/effects/Distortion2'
import AutoWah2 from '../components/effects/AutoWah2'
import BitCrusher2 from '../components/effects/BitCrusher2'
import Chebyshev2 from '../components/effects/Chebyshev2'
import Chorus2 from '../components/effects/Chorus2'
import FeedbackEffect2 from '../components/effects/FeedbackEffect2'
import Freeverb2 from '../components/effects/Freeverb2'
import JcReverb2 from '../components/effects/JcReverb2'
import Phaser2 from '../components/effects/Phaser2'
import PitchShift2 from '../components/effects/PitchShift2'
import Tremolo2 from '../components/effects/Tremolo2'
import Vibrato2 from '../components/effects/Vibrato2'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    const defaultWetValue = 0

    let synth1 = synths.synth1()
    let synth2 = synths.synth2()
    let synth3 = synths.synth3()
    let synth4 = synths.synth4()

    let distortion = effects.distortion()
    let autoWah = effects.autoWah()
    let bitCrusher = effects.bitCrusher()
    let chebyshev = effects.chebyshev()
    let chorus = effects.chorus()
    let feedbackEffect = effects.feedbackEffect()
    let freeverb = effects.freeverb()
    let jcReverb = effects.jcReverb()
    let phaser = effects.phaser()
    let pitchShift = effects.pitchShift()
    let tremolo = effects.tremolo()
    let vibrato = effects.vibrato()

    // Loop
    let loop1 = new Tone.Loop(function(time) {
      synth1.triggerAttackRelease(['A2', 'C3', 'E3', 'G3'], '8n', time)
    }, '2n')

    let loop2 = new Tone.Loop(function(time) {
      synth2.triggerAttackRelease('E1', '16n', time)
    }, '4n')

    let loop3 = new Tone.Sequence(
      function(time, note) {
        synth3.triggerAttackRelease(note, '2n', time)
      },
      ['Bb2', 'Ab2', 'Db2', 'F2']
    )

    let notes = [
      'C3',
      null,
      null,
      ['Eb3', null, 'Eb3'],
      'C3',
      null,
      null,
      'Bb3',
      null,
      [null, 'C3', 'Eb3'],
      null,
      'C3',
      null,
      'Eb3',
      null,
      'C3',
      null,
      'C3',
      [null, 'C3'],
      null,
      'C3',
      null,
      null
    ]

    let loop4 = new Tone.Sequence(
      function(time, note) {
        synth4.triggerAttackRelease(note, '15hz', time)
      },
      notes,
      '4n'
    )

    synth1.chain(
      distortion,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pitchShift,
      tremolo,
      vibrato,
      Tone.Master
    )
    synth2.chain(
      distortion,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pitchShift,
      tremolo,
      vibrato,
      Tone.Master
    )
    synth3.chain(
      distortion,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pitchShift,
      tremolo,
      vibrato,
      Tone.Master
    )
    synth4.chain(
      distortion,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pitchShift,
      tremolo,
      vibrato,
      Tone.Master
    )

    this.state = {
      tempo: 60,
      volume: 60,
      synth1,
      synth2,
      synth3,
      synth4,
      lastChange: Date.now(),
      randomDelay: 100,
      distortion: {
        name: 'distortion',
        effect: distortion,
        wet: defaultWetValue,
        on: false
      },
      autoWah: {
        name: 'autoWah',
        effect: autoWah,
        wet: defaultWetValue,
        on: false
      },
      bitCrusher: {
        name: 'bitCrusher',
        effect: bitCrusher,
        wet: defaultWetValue,
        on: false
      },
      chebyshev: {
        name: 'chebyshev',
        effect: chebyshev,
        wet: defaultWetValue,
        on: false
      },
      chorus: {
        name: 'chorus',
        effect: chorus,
        wet: defaultWetValue,
        on: false
      },
      feedbackEffect: {
        name: 'feedbackEffect',
        effect: feedbackEffect,
        wet: defaultWetValue,
        on: false
      },
      freeverb: {
        name: 'freeverb',
        effect: freeverb,
        wet: defaultWetValue,
        on: false
      },
      jcReverb: {
        name: 'jcReverb',
        effect: jcReverb,
        wet: defaultWetValue,
        on: false
      },
      phaser: {
        name: 'phaser',
        effect: phaser,
        wet: defaultWetValue,
        on: false
      },
      pitchShift: {
        name: 'pitchShift',
        effect: pitchShift,
        wet: defaultWetValue,
        on: false
      },
      tremolo: {
        name: 'tremolo',
        effect: tremolo,
        wet: defaultWetValue,
        on: false
      },
      vibrato: {
        name: 'vibrato',
        effect: vibrato,
        wet: defaultWetValue,
        on: false
      },
      loop1: {
        loop: loop1,
        on: false
      },
      loop2: {
        loop: loop2,
        on: false
      },
      loop3: {
        loop: loop3,
        on: false
      },
      loop4: {
        loop: loop4,
        on: false
      }
    }

    _.bindAll(
      this,
      'volumeChange',
      'bpmChange',
      'toggleLoop',
      'changeSynthValue',
      'toggleEffect',
      'changeEffectWetValue',
      'changeEffectValue'
    )

    Tone.Transport.start()
  }

  bpmChange(value) {
    let { tempo } = this.state
    tempo = Math.round(value)
    Tone.Transport.bpm.value = tempo
    console.log('new bpm', Tone.Transport.bpm.value)

    this.setState({
      tempo
    })
  }

  volumeChange(value) {
    Tone.Master.volume.value = Math.round(value)
    console.log('new volume', Tone.Master.volume.value)

    this.setState({
      volume: Math.round(value)
    })
  }

  toggleLoop(loopName) {
    let { loop, on } = this.state[loopName]

    on == true ? loop.stop() : loop.start('0m')

    this.setState({
      [`${loopName}`]: {
        loop: loop,
        on: !on
      }
    })
  }

  changeSynthValue(synthName, effectName, value) {
    let synth = this.state[synthName]
    let envelope = synth.instrument.envelope
    envelope[effectName] = value

    this.setState({
      [`${effectName}`]: {
        oscillator: synth.instrument.oscillator,
        envelope: envelope
      }
    })
  }

  // toggleFilter() {
  //   if (this.state.autoFilterIsOn == true) {
  //     this.state.autoFilter.wet.value = 0
  //
  //     this.setState({
  //       autoFilterIsOn: false
  //     })
  //   } else {
  //     this.state.autoFilter.wet.value = 1
  //   }
  //
  //   this.setState({
  //     autoFilterIsOn: true
  //   })
  //
  //   // let { synth } = this.state.synth.connect(autoFilter)
  // }

  toggleEffect(effectName) {
    let { name, effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? 0 : wet
    on = !on

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  changeEffectWetValue(effectName, effectProperty, value) {
    let { name, effect, wet, on } = this.state[effectName]

    effect[effectProperty].value = on == true ? value : 0
    wet = value

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  changeEffectValue(effectName, effectProperty, value) {
    let { name, effect, wet, on } = this.state[effectName]

    if (effectProperty == 'order') {
      value = Math.round(value)
    }

    effect[effectProperty] = value

    this.setState({
      [`${effectName}`]: {
        name,
        effect,
        wet,
        on
      }
    })
  }

  render() {
    let {
      tempo,
      volume,
      synth1,
      synth2,
      synth3,
      synth4,
      loop1,
      loop2,
      loop3,
      loop4,
      distortion,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pitchShift,
      tremolo,
      vibrato
    } = this.state
    let {
      toggleEffect,
      toggleLoop,
      changeSynthValue,
      changeEffectWetValue,
      changeEffectValue
    } = this
    return (
      <div>
        <h1 className="title">voise_</h1>
        <div className="lineGreen"></div>
        <div className="lineOrange"></div>
        <div className="lineBlue"></div>
        <div className="lineYellow"></div>
        <div className="body">
          <div className="pageBlock sliderAndLoopBlock">
            <div className="sliderBlock">
              <BPMSlider
                min="0"
                max="220"
                value={tempo}
                handleValueChange={this.bpmChange}
              />
              <VolumeSlider
                min="0"
                max="220"
                value={volume}
                handleValueChange={this.volumeChange}
              />
            </div>
            <div className="loopBlock">
              <div className="playLoop">
                <PolySynth
                  synth="synth1"
                  instrument={synth1}
                  on={loop1.on}
                  togglePlay={() => toggleLoop('loop1')}
                  changeSynthValue={changeSynthValue}
                />
              </div>
              <div className="playLoop">
                <PolySynth
                  synth="synth2"
                  instrument={synth1}
                  on={loop2.on}
                  togglePlay={() => toggleLoop('loop2')}
                  changeSynthValue={changeSynthValue}
                />
              </div>
              <div className="playLoop">
                <PolySynth
                  synth="synth3"
                  instrument={synth3}
                  on={loop3.on}
                  togglePlay={() => toggleLoop('loop3')}
                  changeSynthValue={changeSynthValue}
                />
              </div>
              <div className="playLoop">
                <PolySynth
                  synth="synth4"
                  instrument={synth4}
                  on={loop4.on}
                  togglePlay={() => toggleLoop('loop4')}
                  changeSynthValue={changeSynthValue}
                />
              </div>
            </div>
          </div>

          <div className="pageBlock">
            <div className="allSetBlocks">
              <div className="setBlock">
                <Distortion2
                  {...distortion}
                  toggleEffect={() => toggleEffect('distortion')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <AutoWah2
                  {...autoWah}
                  toggleEffect={() => toggleEffect('autoWah')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <BitCrusher2
                  {...bitCrusher}
                  toggleEffect={() => toggleEffect('bitCrusher')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <Chebyshev2
                  {...chebyshev}
                  toggleEffect={() => toggleEffect('chebyshev')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <Chorus2
                  {...chorus}
                  toggleEffect={() => toggleEffect('chorus')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <FeedbackEffect2
                  {...feedbackEffect}
                  toggleEffect={() => toggleEffect('feedbackEffect')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <Freeverb2
                  {...freeverb}
                  toggleEffect={() => toggleEffect('freeverb')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <JcReverb2
                  {...jcReverb}
                  toggleEffect={() => toggleEffect('jcReverb')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <Phaser2
                  {...phaser}
                  toggleEffect={() => toggleEffect('phaser')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <PitchShift2
                  {...pitchShift}
                  toggleEffect={() => toggleEffect('pitchShift')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <Tremolo2
                  {...tremolo}
                  toggleEffect={() => toggleEffect('tremolo')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
              <div className="setBlock">
                <Vibrato2
                  {...vibrato}
                  toggleEffect={() => toggleEffect('vibrato')}
                  changeEffectWetValue={changeEffectWetValue}
                  changeEffectValue={changeEffectValue}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
