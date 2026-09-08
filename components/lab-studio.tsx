"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Pause, Play, Square } from "lucide-react"
import { toast } from "sonner"
import { HemisphereVisual } from "@/components/hemisphere-visual"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { BANDS, bandForHz, formatHz } from "@/lib/brainwaves"
import { BinauralEngine } from "@/lib/audio-engine"
import { formatClock } from "@/lib/sessions"
import { addLog, newId } from "@/lib/storage"

const PRESETS = [
  { label: "Delta rest", beat: 2, carrier: 140 },
  { label: "Theta drift", beat: 6, carrier: 160 },
  { label: "Alpha still", beat: 10, carrier: 200 },
  { label: "Low beta", beat: 15, carrier: 220 },
  { label: "Study", beat: 18, carrier: 224 },
]

export function LabStudio() {
  const engineRef = useRef<BinauralEngine | null>(null)
  const [running, setRunning] = useState(false)
  const [beat, setBeat] = useState(10)
  const [carrier, setCarrier] = useState(200)
  const [minutes, setMinutes] = useState(15)
  const [volume, setVolume] = useState(50)
  const [noise, setNoise] = useState(30)
  const [elapsed, setElapsed] = useState(0)

  const durationSec = minutes * 60
  const remaining = Math.max(0, durationSec - elapsed)
  const band = bandForHz(beat)
  const engineVolume = useMemo(() => Math.max(0.01, (volume / 100) * 0.18), [volume])
  const engineNoise = useMemo(() => (noise / 100) * 0.12, [noise])

  useEffect(() => {
    engineRef.current = new BinauralEngine()
    return () => {
      void engineRef.current?.stop(0.3)
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const started = performance.now() - elapsed * 1000
    let frame = 0
    const tick = (now: number) => {
      const next = (now - started) / 1000
      if (next >= durationSec) {
        setElapsed(durationSec)
        void stop(true)
        return
      }
      setElapsed(next)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // elapsed captured at the moment running flips true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, durationSec])

  useEffect(() => {
    if (!running) return
    engineRef.current?.setFrequencies(carrier, beat)
  }, [running, carrier, beat])

  useEffect(() => {
    if (running) engineRef.current?.setVolume(engineVolume)
  }, [running, engineVolume])

  useEffect(() => {
    if (running) engineRef.current?.setNoise(engineNoise)
  }, [running, engineNoise])

  async function start() {
    try {
      if (engineRef.current?.isRunning) {
        engineRef.current.mute(false)
        setRunning(true)
        return
      }
      await engineRef.current?.start({
        carrierHz: carrier,
        beatHz: beat,
        volume: engineVolume,
        noise: engineNoise,
      })
      setRunning(true)
    } catch {
      toast.error("Audio did not start. Click again, headphones on.")
    }
  }

  function pause() {
    engineRef.current?.mute(true)
    setRunning(false)
  }

  async function stop(completed: boolean) {
    setRunning(false)
    await engineRef.current?.stop(1.2)
    if (elapsed > 20 || completed) {
      addLog({
        id: newId(),
        sessionId: "lab",
        sessionTitle: `Lab · ${formatHz(beat)} Hz`,
        startedAt: new Date().toISOString(),
        durationSec: Math.round(completed ? durationSec : elapsed),
        completed,
        rating: null,
        note: "",
      })
    }
    setElapsed(0)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-border/80 bg-card/70 p-6 sm:p-8">
        <HemisphereVisual beatHz={beat} running={running} />
        <p className="font-mono mt-4 text-center text-4xl tabular-nums">
          {formatClock(remaining)}
        </p>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {formatHz(carrier)} Hz left · {formatHz(carrier + beat)} Hz right · {band.label}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          {running ? (
            <>
              <Button size="lg" onClick={pause}>
                <Pause data-icon="inline-start" />
                Pause
              </Button>
              <Button size="lg" variant="outline" onClick={() => void stop(false)}>
                <Square data-icon="inline-start" />
                Stop
              </Button>
            </>
          ) : (
            <Button size="lg" onClick={() => void start()}>
              <Play data-icon="inline-start" />
              Run this mix
            </Button>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Pause only freezes the clock. Stop fades the tone out. Lab sessions longer than 20
          seconds land in the journal.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Presets</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <Button
                key={preset.label}
                type="button"
                size="sm"
                variant={beat === preset.beat ? "default" : "outline"}
                onClick={() => {
                  setBeat(preset.beat)
                  setCarrier(preset.carrier)
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        <Field
          label="Beat"
          value={`${formatHz(beat)} Hz`}
          hint={band.felt}
        >
          <Slider
            min={1}
            max={30}
            step={0.5}
            value={[beat]}
            onValueChange={(value) => setBeat(value[0] ?? beat)}
          />
        </Field>
        <Field label="Carrier" value={`${formatHz(carrier)} Hz`} hint="The pitch you actually hear">
          <Slider
            min={100}
            max={280}
            step={1}
            value={[carrier]}
            onValueChange={(value) => setCarrier(value[0] ?? carrier)}
          />
        </Field>
        <Field label="Duration" value={`${minutes} min`} hint="Timer only. You can stop early.">
          <Slider
            min={5}
            max={40}
            step={1}
            value={[minutes]}
            onValueChange={(value) => setMinutes(value[0] ?? minutes)}
          />
        </Field>
        <Field label="Tone" value={`${volume}`}>
          <Slider
            min={8}
            max={100}
            step={1}
            value={[volume]}
            onValueChange={(value) => setVolume(value[0] ?? volume)}
          />
        </Field>
        <Field label="Noise bed" value={`${noise}`}>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[noise]}
            onValueChange={(value) => setNoise(value[0] ?? noise)}
          />
        </Field>

        <div className="rounded-2xl border border-border/70 p-4">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            EEG neighborhoods
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {BANDS.filter((item) => item.id !== "gamma").map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span className={item.id === band.id ? "text-primary" : "text-muted-foreground"}>
                  {item.label} · {item.range}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  hint,
  children,
}: {
  label: string
  value: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{value}</span>
      </span>
      {children}
      {hint ? <span className="mt-2 block text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  )
}
