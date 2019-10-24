import Tone from 'tone'

function distortion() {
  let f = new Tone.Distortion({
    distortion: 0,
    oversample: '4x'
  })

  f.wet.value = 0

  return f
}

function autoWah() {
  let f = new Tone.AutoWah({
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

  f.wet.value = 0

  return f
}

function bitCrusher() {
  let f = new Tone.BitCrusher({
    bits: 4
  })

  f.wet.value = 0

  return f
}

function chebyshev() {
  let f = new Tone.Chebyshev({
    order: 50,
    oversample: 'none'
  })

  f.wet.value = 0

  return f
}

function chorus() {
  let f = new Tone.Chorus({
    frequency: 1.5,
    delayTime: 3.5,
    depth: 0.7,
    type: 'sine',
    spread: 180
  })

  f.wet.value = 0

  return f
}

function feedbackEffect() {
  let f = new Tone.FeedbackEffect({
    feedback: 0
  })

  f.wet.value = 0

  return f
}

function freeverb() {
  let f = new Tone.Freeverb({
    roomSize: 0,
    dampening: 3000
  })

  f.wet.value = 0

  return f
}

function jcReverb() {
  let f = new Tone.JCReverb({
    roomSize: 0
  })

  f.wet.value = 0

  return f
}

function phaser() {
  let f = new Tone.Phaser({
    frequency: 0.5,
    octaves: 3,
    stages: 10,
    Q: 10,
    baseFrequency: 350
  })

  f.wet.value = 0

  return f
}

function pitchShift() {
  let f = new Tone.PitchShift({
    pitch: 0,
    windowSize: 0.1,
    delayTime: 0,
    feedback: 0
  })

  f.wet.value = 0

  return f
}

function tremolo() {
  let f = new Tone.Tremolo({
    frequency: 0,
    type: 'sine',
    depth: 2,
    spread: 180
  })

  f.wet.value = 0

  return f
}

function vibrato() {
  let f = new Tone.Vibrato({
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.1,
    type: 'sine'
  })

  f.wet.value = 0

  return f
}

export {
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
}
