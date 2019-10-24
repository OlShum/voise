import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import PlaySwitch from '../components/controls/PlaySwitch'
import ToggleSwitch from '../components/controls/ToggleSwitch'
import Slider from '../components/controls/Slider'
import Knob from '../components/controls/Knob'

import Distortion from '../components/effects/Distortion'
import BitCrusher from '../components/effects/BitCrusher'
import FeedbackEffect from '../components/effects/FeedbackEffect'
import Freeverb from '../components/effects/Freeverb'
import JCReverb from '../components/effects/JcReverb'
import Phaser from '../components/effects/Phaser'
import Tremolo from '../components/effects/Tremolo'
import Vibrato from '../components/effects/Vibrato'
import AutoWah from '../components/effects/AutoWah'
import Chebyshev from '../components/effects/Chebyshev'
import Chorus from '../components/effects/Chorus'
import PitchShift from '../components/effects/PitchShift'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    let autoFilter = new Tone.AutoFilter({
      frequency: 1,
      type: 'sine',
      depth: 1,
      baseFrequency: 200,
      octaves: 2.6,
      filter: {
        type: 'lowpass',
        rolloff: -12,
        Q: 1
      }
    })

    let feedbackDelay = new Tone.FeedbackDelay({
      delayTime: '32n',
      maxDelay: 0.8
    })

    let tremolo = new Tone.Tremolo({
      frequency: 0,
      type: 'sine',
      depth: 2,
      spread: 180
    })

    let distortion = new Tone.Distortion({
      distortion: 0,
      oversample: '4x'
    })

    let autoPanner = new Tone.AutoPanner({
      frequency: 10,
      type: 'sine',
      depth: 100
    })

    let autoWah = new Tone.AutoWah({
      baseFrequency: 100,
      octaves: 6,
      sensitivity: 0,
      Q: 2,
      gain: 2,
      follower: {
        attack: 0.3,
        release: 0.5
      }
    })

    let bitCrusher = new Tone.BitCrusher({
      bits: 4
    })

    let chebyshev = new Tone.Chebyshev({
      order: 50,
      oversample: 'none'
    })

    let chorus = new Tone.Chorus({
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      type: 'sine',
      spread: 180
    })

    let convolver = new Tone.Convolver({
      onload: Tone.noOp,
      normalize: true
    })

    let effect = new Tone.Effect({
      wet: 1
    })

    let feedbackEffect = new Tone.FeedbackEffect({
      feedback: 0
    })

    let freeverb = new Tone.Freeverb({
      roomSize: 0,
      dampening: 3000
    })

    let jcReverb = new Tone.JCReverb({
      roomSize: 0
    })

    let phaser = new Tone.Phaser({
      frequency: 0.5,
      octaves: 3,
      stages: 10,
      Q: 10,
      baseFrequency: 350
    })

    let pingPongDelay = new Tone.PingPongDelay({
      delayTime: 0.25,
      maxDelayTime: 1
    })

    let pitchShift = new Tone.PitchShift({
      pitch: 0,
      windowSize: 0.1,
      delayTime: 0,
      feedback: 0
    })

    let reverb = new Tone.Reverb({
      decay: 1.5,
      preDelay: 0.01
    })

    let stereoWidener = new Tone.StereoWidener({
      width: 0.5
    })

    let vibrato = new Tone.Vibrato({
      maxDelay: 0.005,
      frequency: 5,
      depth: 0.1,
      type: 'sine'
    })

    distortion.wet.value = 0
    autoFilter.wet.value = 0
    feedbackDelay.wet.value = 0
    tremolo.wet.value = 0
    autoPanner.wet.value = 0
    autoWah.wet.value = 0
    bitCrusher.wet.value = 0
    chebyshev.wet.value = 0
    chorus.wet.value = 0
    convolver.wet.value = 0
    effect.wet.value = 0
    feedbackEffect.wet.value = 0
    freeverb.wet.value = 0
    jcReverb.wet.value = 0
    phaser.wet.value = 0
    pingPongDelay.wet.value = 0
    pitchShift.wet.value = 0
    reverb.wet.value = 0
    stereoWidener.wet.value = 0
    vibrato.wet.value = 0

    let synth1 = new Tone.PolySynth(1, Tone.Synth, {
      volume: -10,
      oscillator: {
        // fatsawtooth
        type: 'square'
        // count: 1,
        // spread: 30
        // phase: 10
        // fadeIn: 4
      },
      envelope: {
        attack: 0.3,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
        attackCurve: 'exponential'
      }
    })
    let synth2 = new Tone.PolySynth({ volume: -10 })
    let synth3 = new Tone.PolySynth(1, Tone.Synth, {
      envelope: {
        attack: 0.1,
        decay: 0.3,
        release: 2
      },
      filterEnvelope: {
        attack: 0.001,
        decay: 0.01,
        sustain: 0.5,
        baseFrequency: 200,
        octaves: 2.6
      }
    })
    let synth4 = new Tone.PolySynth(1, Tone.Synth, {
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0.01,
        release: 1.4,
        attackCurve: 'exponential'
      }
    })

    let notes = [
      'C3',
      [null, 'Eb3'],
      'G3',
      'Bb3',
      [null, 'G3', 'E4'],
      'C4',
      'E4',
      'G4',
      'C3',
      [null, 'G3'],
      'G3'
    ]
    //   {
    //   polyphony: 4,
    //   volume: 0,
    //   detune: 0,
    //   voice: Tone.MembraneSynth
    // } //.toMaster()

    // Loop
    let loop1 = new Tone.Loop(function(time) {
      synth1.triggerAttackRelease(['A2', 'C3', 'E3', 'G3'], '8n', time)
    }, '2n')

    let loop2 = new Tone.Loop(function(time) {
      synth2.triggerAttackRelease('E4', '16n', time)
    }, '4n')

    let loop3 = new Tone.Sequence(
      function(time, note) {
        synth3.triggerAttackRelease(note, '2n', time)
      },
      ['Bbm2', 'Ab2', 'Db2', 'F2']
    )

    let loop4 = new Tone.Sequence(
      function(time, note) {
        synth4.triggerAttackRelease(note, '15hz', time)
      },
      notes,
      '4n'
    )

    synth1.chain(
      distortion,
      autoFilter,
      feedbackDelay,
      tremolo,
      autoPanner,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      convolver,
      effect,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pingPongDelay,
      pitchShift,
      reverb,
      stereoWidener,
      vibrato,
      Tone.Master
    )

    synth2.chain(
      distortion,
      autoFilter,
      feedbackDelay,
      tremolo,
      autoPanner,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      convolver,
      effect,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pingPongDelay,
      pitchShift,
      reverb,
      stereoWidener,
      vibrato,
      Tone.Master
    )

    synth3.chain(
      distortion,
      autoFilter,
      feedbackDelay,
      tremolo,
      autoPanner,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      convolver,
      effect,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pingPongDelay,
      pitchShift,
      reverb,
      stereoWidener,
      vibrato,
      Tone.Master
    )

    synth4.chain(
      distortion,
      autoFilter,
      feedbackDelay,
      tremolo,
      autoPanner,
      autoWah,
      bitCrusher,
      chebyshev,
      chorus,
      convolver,
      effect,
      feedbackEffect,
      freeverb,
      jcReverb,
      phaser,
      pingPongDelay,
      pitchShift,
      reverb,
      stereoWidener,
      vibrato,
      Tone.Master
    )

    this.state = {
      lastChange: Date.now(),
      randomDelay: 100,
      autoFilter: {
        effect: autoFilter,
        wet: 0,
        on: false
      },
      feedbackDelay: {
        effect: feedbackDelay,
        wet: 0,
        on: false
      },
      tremolo: {
        effect: tremolo,
        wet: 0,
        on: false
      },
      distortion: {
        effect: distortion,
        wet: 0,
        on: false
      },
      autoPanner: {
        effect: autoPanner,
        wet: 0,
        on: false
      },
      autoWah: {
        effect: autoWah,
        wet: 0,
        on: false
      },
      bitCrusher: {
        effect: bitCrusher,
        wet: 0,
        on: false
      },
      chebyshev: {
        effect: chebyshev,
        wet: 0,
        on: false
      },
      chorus: {
        effect: chorus,
        wet: 0,
        on: false
      },
      convolver: {
        effect: convolver,
        wet: 0,
        on: false
      },
      effect: {
        effect: effect,
        wet: 0,
        on: false
      },
      feedbackEffect: {
        effect: feedbackEffect,
        wet: 0,
        on: false
      },
      freeverb: {
        effect: freeverb,
        wet: 0,
        on: false
      },
      jcReverb: {
        effect: jcReverb,
        wet: 0,
        on: false
      },
      phaser: {
        effect: phaser,
        wet: 0,
        on: false
      },
      pingPongDelay: {
        effect: pingPongDelay,
        wet: 0,
        on: false
      },
      pitchShift: {
        effect: pitchShift,
        wet: 0,
        on: false
      },
      reverb: {
        effect: reverb,
        wet: 0,
        on: false
      },
      stereoWidener: {
        effect: stereoWidener,
        wet: 0,
        on: false
      },
      vibrato: {
        effect: vibrato,
        wet: 0,
        on: false
      },
      synth1: {
        instrument: synth1,
        on: false
      },
      synth2: {
        instrument: synth2,
        on: false
      },
      synth3: {
        instrument: synth3,
        on: false
      },
      synth4: {
        instrument: synth4,
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
      // 'getRandomArbitrary',
      // 'generateRandom',
      'toggleLoop',
      'toggleEffect',
      'changeEffectWetValue',
      'changeDistortionValue',
      'changeBitCrusherValue',
      'changeFeedbackEffectValue',
      'changeFreeverbRoomSizeValue',
      'changeFreeverbDampeningValue',
      'changeJcReverbValue',
      'changePhaserFrequencyValue',
      'changeTremoloDepthValue',
      'changeVibratoDepthValue',
      'changeAutoWahBaseFrequencyValue',
      'changeAutoWahSensitivityValue',
      'changeChebyshevValue',
      'changeChorusFrequencyValue',
      'changeChorusDepthValue',
      'changePitchShiftPitchValue',
      'changePitchShiftWindowSizeValue'
    )

    Tone.Transport.bpm.value = 80
    Tone.Transport.start()
  }

  // componentDidMount() {
  //   this.generateRandom()
  // }
  //
  // getRandomArbitrary(min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min
  // }
  //
  // generateRandom() {
  //   const { lastChange, randomDelay } = this.state
  //
  //   if (Data.now() - lastChange >= randomDelay) {
  //     this.setState({
  //       lastChange: Date.now(),
  //       randomDelay: this.getRandomArbitrary(100, 3000)
  //     })
  //     // this.generateRandom()
  //   }
  // }

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
    let { effect, wet, on } = this.state[effectName]

    console.log(this.state[effectName])

    effect.wet.value = on == true ? 0 : wet
    on = !on

    this.setState({
      [`${effectName}`]: {
        effect,
        wet,
        on
      }
    })
  }

  changeEffectWetValue(effectName, value) {
    let { effect, wet, on } = this.state[effectName]

    effect.wet.value = on == true ? value : 0
    wet = value

    this.setState({
      [`${effectName}`]: {
        effect,
        wet,
        on
      }
    })
  }

  changeDistortionValue(effectName, value) {
    let { effect, wet, on } = this.state.distortion

    effect.distortion = value

    this.setState({
      distortion: {
        effect,
        wet,
        on
      }
    })
  }

  // toggleDistortion100() {
  //   let { distortion } = this.state
  //   distortion.distortion = 100
  //
  //   this.setState({
  //     distortion: distortion
  //   })
  // }

  changeBitCrusherValue(effectName, value) {
    let { effect, wet, on } = this.state.bitCrusher

    effect.bits = Math.round(value)

    this.setState({
      bitCrusher: {
        effect,
        wet,
        on
      }
    })
  }

  changeFeedbackEffectValue(effectName, value) {
    let { effect, wet, on } = this.state.feedbackEffect
    console.log('yo', value)

    effect.feedback.value = value

    this.setState({
      feedbackEffect: {
        effect,
        wet,
        on
      }
    })
  }

  changeFreeverbRoomSizeValue(effectName, value) {
    let { effect, wet, on } = this.state.freeverb

    effect.roomSize.value = value

    this.setState({
      freeverb: {
        effect,
        wet,
        on
      }
    })
  }

  changeFreeverbDampeningValue(effectName, value) {
    let { effect, wet, on } = this.state.freeverb

    effect.dampening.value = value

    this.setState({
      freeverb: {
        effect,
        wet,
        on
      }
    })
  }

  changeJcReverbValue(effectName, value) {
    let { effect, wet, on } = this.state.jcReverb

    effect.roomSize.value = value

    this.setState({
      jcReverb: {
        effect,
        wet,
        on
      }
    })
  }

  changePhaserFrequencyValue(effectName, value) {
    let { effect, wet, on } = this.state.phaser

    console.log(value)

    effect.frequency.value = value

    this.setState({
      phaser: {
        effect,
        wet,
        on
      }
    })
  }

  changeTremoloDepthValue(effectName, value) {
    let { effect, wet, on } = this.state.tremolo

    console.log(value)

    effect.depth.value = value

    this.setState({
      tremolo: {
        effect,
        wet,
        on
      }
    })
  }

  changeVibratoDepthValue(effectName, value) {
    let { effect, wet, on } = this.state.vibrato

    effect.depth.value = value

    this.setState({
      vibrato: {
        effect,
        wet,
        on
      }
    })
  }

  changeAutoWahBaseFrequencyValue(effectName, value) {
    let { effect, wet, on } = this.state.autoWah

    effect.baseFrequency = value

    this.setState({
      autoWah: {
        effect,
        wet,
        on
      }
    })
  }

  changeAutoWahSensitivityValue(effectName, value) {
    let { effect, wet, on } = this.state.autoWah

    effect.sensitivity = value

    this.setState({
      autoWah: {
        effect,
        wet,
        on
      }
    })
  }

  changeChebyshevValue(effectName, value) {
    let { effect, wet, on } = this.state.chebyshev

    effect.order = value

    this.setState({
      chebyshev: {
        effect,
        wet,
        on
      }
    })
  }

  changeChorusFrequencyValue(effectName, value) {
    let { effect, wet, on } = this.state.chorus

    effect.frequency.value = value

    this.setState({
      chorus: {
        effect,
        wet,
        on
      }
    })
  }

  changeChorusDepthValue(effectName, value) {
    let { effect, wet, on } = this.state.chorus

    effect.depth = value

    this.setState({
      chorus: {
        effect,
        wet,
        on
      }
    })
  }

  changePitchShiftPitchValue(effectName, value) {
    let { effect, wet, on } = this.state.pitchShift

    effect.pitch = value

    this.setState({
      pitchShift: {
        effect,
        wet,
        on
      }
    })
  }

  changePitchShiftWindowSizeValue(effectName, value) {
    let { effect, wet, on } = this.state.pitchShift

    effect.windowSize = value

    this.setState({
      pitchShift: {
        effect,
        wet,
        on
      }
    })
  }

  render() {
    let {
      synth1,
      synth2,
      synth3,
      synth4,
      loop1,
      loop2,
      loop3,
      loop4
    } = this.state
    let { toggleEffect } = this
    return (
      <div className="body">
        <div className="pageBlock">
          <div className="loopBlock">
            <div className="playLoop">
              <PlaySwitch
                name="play"
                value={loop1.on}
                handleToggleClick={() => this.toggleLoop('loop1')}
              />
            </div>
            <div className="playLoop">
              <PlaySwitch
                name="play"
                value={loop2.on}
                handleToggleClick={() => this.toggleLoop('loop2')}
              />
            </div>
            <div className="playLoop">
              <PlaySwitch
                name="play"
                value={loop3.on}
                handleToggleClick={() => this.toggleLoop('loop3')}
              />
            </div>
            <div className="playLoop">
              <PlaySwitch
                name="play"
                value={loop4.on}
                handleToggleClick={() => this.toggleLoop('loop4')}
              />
            </div>
          </div>
        </div>

        <div className="pageBlock">
          <div className="allSetBlocks">
            <div className="setBlock">
              <Distortion
                {...this.state.distortion}
                toggleEffect={() => toggleEffect('distortion')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeDistortionValue={this.changeDistortionValue}
              />
            </div>
            <div className="setBlock">
              <BitCrusher
                {...this.state.bitCrusher}
                toggleEffect={() => toggleEffect('bitCrusher')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeBitCrusherValue={this.changeBitCrusherValue}
              />
            </div>
            <div className="setBlock">
              <FeedbackEffect
                Effect
                {...this.state.feedbackEffect}
                toggleEffect={() => toggleEffect('feedbackEffect')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeFeedbackEffectValue={this.changeFeedbackEffectValue}
              />
            </div>
            <div className="setBlock">
              <Freeverb
                Effect
                {...this.state.freeverb}
                toggleEffect={() => toggleEffect('freeverb')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeFreeverbRoomSizeValue={this.changeFreeverbRoomSizeValue}
                changeFreeverbDampeningValue={this.changeFreeverbDampeningValue}
              />
            </div>
            <div className="setBlock">
              <JCReverb
                Effect
                {...this.state.jcReverb}
                toggleEffect={() => toggleEffect('jcReverb')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeJcReverbValue={this.changeJcReverbValue}
              />
            </div>
            <div className="setBlock">
              <Phaser
                Effect
                {...this.state.phaser}
                toggleEffect={() => toggleEffect('phaser')}
                changeEffectWetValue={this.changeEffectWetValue}
                changePhaserFrequencyValue={this.changePhaserFrequencyValue}
              />
            </div>
            <div className="setBlock">
              <Tremolo
                Effect
                {...this.state.tremolo}
                toggleEffect={() => toggleEffect('tremolo')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeTremoloDepthValue={this.changeTremoloDepthValue}
              />
            </div>
            <div className="setBlock">
              <Vibrato
                Effect
                {...this.state.vibrato}
                toggleEffect={() => toggleEffect('vibrato')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeVibratoDepthValue={this.changeVibratoDepthValue}
              />
            </div>
            <div className="setBlock">
              <AutoWah
                Effect
                {...this.state.autoWah}
                toggleEffect={() => toggleEffect('autoWah')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeAutoWahBaseFrequencyValue={
                  this.changeAutoWahBaseFrequencyValue
                }
                changeAutoWahSensitivityValue={
                  this.changeAutoWahSensitivityValue
                }
              />
            </div>
            <div className="setBlock">
              <Chebyshev
                Effect
                {...this.state.chebyshev}
                toggleEffect={() => toggleEffect('chebyshev')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeChebyshevValue={this.changeChebyshevValue}
              />
            </div>
            <div className="setBlock">
              <Chorus
                Effect
                {...this.state.chorus}
                toggleEffect={() => toggleEffect('chorus')}
                changeEffectWetValue={this.changeEffectWetValue}
                changeChorusFrequencyValue={this.changeChorusFrequencyValue}
                changeChorusDepthValue={this.changeChorusDepthValue}
              />
            </div>
            <div className="setBlock">
              <PitchShift
                Effect
                {...this.state.pitchShift}
                toggleEffect={() => toggleEffect('chorus')}
                changeEffectWetValue={this.changeEffectWetValue}
                changePitchShiftPitchValue={this.changePitchShiftPitchValue}
                changePitchShiftWindowSizeValue={
                  this.changePitchShiftWindowSizeValue
                }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
