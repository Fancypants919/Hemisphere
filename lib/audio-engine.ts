export type EngineOptions = {
  carrierHz: number
  beatHz: number
  volume: number
  noise: number
}

function makePinkNoise(ctx: AudioContext) {
  const length = Math.floor(ctx.sampleRate * 3)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let b0 = 0
  let b1 = 0
  let b2 = 0
  let b3 = 0
  let b4 = 0
  let b5 = 0
  let b6 = 0
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + white * 0.0555179
    b1 = 0.99332 * b1 + white * 0.0750759
    b2 = 0.969 * b2 + white * 0.153852
    b3 = 0.8665 * b3 + white * 0.3104856
    b4 = 0.55 * b4 + white * 0.5329522
    b5 = -0.7616 * b5 - white * 0.016898
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
    b6 = white * 0.115926
  }
  return buffer
}

export class BinauralEngine {
  private ctx: AudioContext | null = null
  private leftOsc: OscillatorNode | null = null
  private rightOsc: OscillatorNode | null = null
  private leftGain: GainNode | null = null
  private rightGain: GainNode | null = null
  private merger: ChannelMergerNode | null = null
  private master: GainNode | null = null
  private noiseSource: AudioBufferSourceNode | null = null
  private noiseFilter: BiquadFilterNode | null = null
  private noiseGain: GainNode | null = null
  private volume = 0.08
  private noise = 0.03
  private running = false

  get isRunning() {
    return this.running
  }

  private async context() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
    }
    if (this.ctx.state === "suspended") {
      await this.ctx.resume()
    }
    return this.ctx
  }

  private teardownGraph() {
    try {
      this.leftOsc?.stop()
      this.rightOsc?.stop()
      this.noiseSource?.stop()
    } catch {
      // already stopped
    }
    this.leftOsc?.disconnect()
    this.rightOsc?.disconnect()
    this.leftGain?.disconnect()
    this.rightGain?.disconnect()
    this.merger?.disconnect()
    this.noiseSource?.disconnect()
    this.noiseFilter?.disconnect()
    this.noiseGain?.disconnect()
    this.master?.disconnect()
    this.leftOsc = null
    this.rightOsc = null
    this.leftGain = null
    this.rightGain = null
    this.merger = null
    this.noiseSource = null
    this.noiseFilter = null
    this.noiseGain = null
    this.master = null
    this.running = false
  }

  async start(options: EngineOptions) {
    const ctx = await this.context()
    this.teardownGraph()
    this.volume = options.volume
    this.noise = options.noise

    this.master = ctx.createGain()
    this.master.gain.value = 0
    this.master.connect(ctx.destination)

    this.merger = ctx.createChannelMerger(2)
    this.merger.connect(this.master)

    this.leftGain = ctx.createGain()
    this.rightGain = ctx.createGain()
    this.leftGain.gain.value = 0.9
    this.rightGain.gain.value = 0.9
    this.leftGain.connect(this.merger, 0, 0)
    this.rightGain.connect(this.merger, 0, 1)

    this.leftOsc = ctx.createOscillator()
    this.rightOsc = ctx.createOscillator()
    this.leftOsc.type = "sine"
    this.rightOsc.type = "sine"
    this.leftOsc.frequency.value = options.carrierHz
    this.rightOsc.frequency.value = options.carrierHz + options.beatHz
    this.leftOsc.connect(this.leftGain)
    this.rightOsc.connect(this.rightGain)
    this.leftOsc.start()
    this.rightOsc.start()

    this.noiseFilter = ctx.createBiquadFilter()
    this.noiseFilter.type = "lowpass"
    this.noiseFilter.frequency.value = 520
    this.noiseFilter.Q.value = 0.4
    this.noiseGain = ctx.createGain()
    this.noiseGain.gain.value = options.noise
    this.noiseSource = ctx.createBufferSource()
    this.noiseSource.buffer = makePinkNoise(ctx)
    this.noiseSource.loop = true
    this.noiseSource.connect(this.noiseFilter)
    this.noiseFilter.connect(this.noiseGain)
    this.noiseGain.connect(this.master)
    this.noiseSource.start()

    const now = ctx.currentTime
    this.master.gain.setValueAtTime(0, now)
    this.master.gain.linearRampToValueAtTime(options.volume, now + 2.4)
    this.running = true
  }

  setFrequencies(carrierHz: number, beatHz: number) {
    if (!this.ctx || !this.leftOsc || !this.rightOsc) return
    const t = this.ctx.currentTime + 1.1
    this.leftOsc.frequency.linearRampToValueAtTime(carrierHz, t)
    this.rightOsc.frequency.linearRampToValueAtTime(carrierHz + beatHz, t)
  }

  setVolume(volume: number) {
    this.volume = volume
    if (!this.ctx || !this.master) return
    this.master.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.12)
  }

  setNoise(noise: number) {
    this.noise = noise
    if (!this.ctx || !this.noiseGain) return
    this.noiseGain.gain.linearRampToValueAtTime(noise, this.ctx.currentTime + 0.12)
  }

  mute(muted: boolean) {
    if (!this.ctx || !this.master) return
    this.master.gain.linearRampToValueAtTime(
      muted ? 0.0001 : this.volume,
      this.ctx.currentTime + 0.18
    )
  }

  async playStereoCheck() {
    const ctx = await this.context()
    const beep = (channel: 0 | 1, frequency: number, when: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const merger = ctx.createChannelMerger(2)
      osc.frequency.value = frequency
      osc.type = "sine"
      gain.gain.setValueAtTime(0.0001, when)
      gain.gain.linearRampToValueAtTime(0.08, when + 0.04)
      gain.gain.linearRampToValueAtTime(0.0001, when + 0.55)
      osc.connect(gain)
      gain.connect(merger, 0, channel)
      merger.connect(ctx.destination)
      osc.start(when)
      osc.stop(when + 0.6)
    }
    const t = ctx.currentTime + 0.05
    beep(0, 220, t)
    beep(1, 277, t + 0.85)
  }

  async stop(fadeSec = 2.2) {
    if (!this.ctx || !this.master) {
      this.teardownGraph()
      return
    }
    const t = this.ctx.currentTime
    const current = this.master.gain.value
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setValueAtTime(current, t)
    this.master.gain.linearRampToValueAtTime(0.0001, t + fadeSec)
    await new Promise((resolve) => setTimeout(resolve, fadeSec * 1000 + 40))
    this.teardownGraph()
  }
}
