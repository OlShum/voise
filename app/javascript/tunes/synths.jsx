import Tone from 'tone'

function synth1() {
  return new Tone.PolySynth(1, Tone.Synth, {
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
}

function synth2() {
  return new Tone.PolySynth(1, Tone.Synth, {
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.001,
      decay: 0.8,
      sustain: 0.81,
      release: 1,
      attackCurve: 'exponential'
    }
  })
}

function synth3() {
  return new Tone.PolySynth(1, Tone.Synth, {
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
}

function synth4() {
  return new Tone.PolySynth(1, Tone.Synth, {
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
}

export { synth1, synth2, synth3, synth4 }
