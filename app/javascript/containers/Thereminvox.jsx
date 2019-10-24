import React from 'react'
import Tone from 'tone'

export default class Thereminvox extends React.Component {
  constructor(props) {
    super(props)

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    let oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'

    let analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    oscillator.connect(analyser)

    this.state = {
      audioContext: audioContext,
      oscillator: oscillator,
      analyser: analyser,
      playing: false,
      x: 0,
      y: 0,
      fftData: []
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleStartOrStopClick = this.handleStartOrStopClick.bind(this)
    this.handleSynthPlay = this.handleSynthPlay.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.changeDetune = this.changeDetune.bind(this)
    this.changeVisualization = this.changeVisualization.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })

    this.changeFrequency()
    this.changeDetune()
    this.changeVisualization()
  }

  handleStartOrStopClick() {
    let { playing } = this.state

    if (playing) {
      this.handleStop()
    } else {
      this.handleStart()
    }
  }

  handleSynthPlay() {
    // const synth = new Tone.MembraneSynth().toMaster()
    // const loop = new Tone.Loop(function(time) {
    //   synth.triggerAttackRelease('C2', '2n')
    // }, '2n').start(0)

    // let melody = new Tone.Synth().toMaster()
    // let notes = [
    //   ['C4', '1/8'],
    //   ['C4', '1/8'],
    //   ['G4', '1/8'],
    //   ['G4', '1/8'],
    //   ['A4', '1/8'],
    //   ['A4', '1/8'],
    //   ['G4', '1/4'],
    //   ['F4', '1/8'],
    //   ['F4', '1/8'],
    //   ['E4', '1/8'],
    //   ['E4', '1/8'],
    //   ['D4', '1/8'],
    //   ['D4', '1/8'],
    //   ['C4', '1/4'],
    //
    //   ['G4', '1/8'],
    //   ['G4', '1/8'],
    //   ['F4', '1/8'],
    //   ['F4', '1/8'],
    //   ['E4', '1/8'],
    //   ['E4', '1/8'],
    //   ['D4', '1/4'],
    //   ['G4', '1/8'],
    //   ['G4', '1/8'],
    //   ['F4', '1/8'],
    //   ['F4', '1/8'],
    //   ['E4', '1/8'],
    //   ['E4', '1/8'],
    //   ['D4', '1/4'],
    //
    //   ['C4', '1/8'],
    //   ['C4', '1/8'],
    //   ['G4', '1/8'],
    //   ['G4', '1/8'],
    //   ['A4', '1/8'],
    //   ['A4', '1/8'],
    //   ['G4', '1/4'],
    //   ['F4', '1/8'],
    //   ['F4', '1/8'],
    //   ['E4', '1/8'],
    //   ['E4', '1/8'],
    //   ['D4', '1/8'],
    //   ['D4', '1/8'],
    //   ['C4', '1/4']
    // ]
    // let synthPart = new Tone.Sequence(function(time, note) {
    //   synth.triggerAttackRelease(note, '10hz', time)
    // }, notes)

    let synth = new Tone.MembraneSynth().toMaster()
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
    let synthPart = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '15hz', time)
      },
      notes,
      '4n'
    )
    //
    // let polySynth = new Tone.PolySynth(4, Tone.Synth, {
    //   volume: -30,
    //   oscillator: {
    //     partials: [1, 2, 1]
    //   },
    //   portamento: 0.05
    // }).toMaster()
    // let polyPattern = new Tone.Pattern(function(time, note) {
    //   polySynth.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], '16n')
    // })

    let bass = new Tone.MonoSynth({
      volume: -15,
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
    }).toMaster()

    let bassPart = new Tone.Sequence(
      function(time, note) {
        bass.triggerAttackRelease(note, '16n', time)
      },
      ['D4', 'C4', 'D4', 'F4']
    ).start(0)

    bassPart.probability = 0.9

    let melody = new Tone.Synth({
      volume: -25,
      oscillator: {
        type: 'sine',
        modulationFrequency: 0.5
      },
      envelope: {
        attack: 0.1,
        decay: 0.5,
        sustain: 0.5,
        release: 0.5
      }
    }).toMaster()
    let freeverb = new Tone.Freeverb().toMaster()
    let pattern = new Tone.Pattern(
      function(time, note) {
        melody.triggerAttackRelease(note, 0.5)
      },
      ['B4', 'A4', 'D4', 'F4', 'B4', 'A4']
    )

    // loop.start('1m').stop('4m')
    // let synth = new Tone.Synth({
    //   oscillator: {
    //     type: 'pwm',
    //     modulationFrequency: 0.2
    //   },
    //   envelope: {
    //     attack: 0.02,
    //     decay: 0.1,
    //     sustain: 0.2,
    //     release: 0.9
    //   }
    // }).toMaster()
    //
    // synth.triggerAttack('D3', '+1')
    // let polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster()
    // polySynth.triggerAttackRelease(['C4', 'E4', 'G4', 'B4'], '2n')
    //
    // let distortion = new Tone.Distortion(0.4).toMaster()
    // polySynth.connect(distortion)
    //
    // let pwm = new Tone.PWMOscillator('Bb3').toMaster().start()
    // Tone.Transport.scheduleRepeat(
    //   function(time) {
    //     note.triggerAttack(time)
    //   },
    //   '8n',
    //   '1m'
    // )
    // Tone.Transport.bpm.value = 220

    pattern.start(0)
    synthPart.start()
    // polyPattern.start()
    Tone.Transport.start()
  }

  handleStart() {
    let { audioContext, oscillator, analyser, x, y } = this.state

    oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(y, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
    oscillator.start()

    analyser = audioContext.createAnalyser()
    analyser.fftSize = 2048
    oscillator.connect(analyser)

    this.setState({
      oscillator: oscillator,
      analyser: analyser,
      playing: true
    })
  }

  handleStop() {
    let { oscillator } = this.state
    oscillator.stop()

    this.setState({
      oscillator: oscillator,
      playing: false
    })
  }

  changeFrequency() {
    let { audioContext, oscillator, x, y } = this.state

    oscillator.frequency.setValueAtTime(y, audioContext.currentTime)
  }

  changeDetune() {
    let { audioContext, oscillator, x, y } = this.state

    oscillator.detune.setValueAtTime(x, audioContext.currentTime)
  }

  changeVisualization() {
    const { analyser, playing } = this.state

    if (playing) {
      const bufferLength = analyser.frequencyBinCount
      let dataArray = new Uint8Array(bufferLength)
      analyser.getByteTimeDomainData(dataArray)

      this.setState({
        fftData: dataArray
      })
    }
  }

  render() {
    const { playing, analyser, fftData } = this.state
    let button = 'Start'

    if (playing) {
      button = 'Stop'
    }

    let elements = []

    if (fftData != undefined) {
      fftData.map(function(fftParam, i) {
        elements.push(
          <div
            key={i}
            className="analyserCol"
            style={{ height: fftParam + 'px' }}
          />
        )
      })
    }

    return (
      <div>
        <div onClick={this.handleSynthPlay}>Synth</div>
        <div onClick={this.handleStartOrStopClick}>{button}</div>

        <div className="analyser">{elements}</div>
      </div>
    )
  }
}
