"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, Pause, Play, Square } from "lucide-react"
import { toast } from "sonner"
import { HemisphereVisual } from "@/components/hemisphere-visual"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { BinauralEngine } from "@/lib/audio-engine"
import { bandForHz, formatHz } from "@/lib/brainwaves"
import {
  formatClock,
  getPhaseAt,
  type PracticeSession,
} from "@/lib/sessions"
import { addLog, newId, updateLog } from "@/lib/storage"
import { cn } from "@/lib/utils"

type Status = "idle" | "running" | "paused" | "done"

export function SessionPlayer({
  session,
  lab = false,
}: {
  session: PracticeSession
  lab?: boolean
}) {
  const engineRef = useRef<BinauralEngine | null>(null)
  const logIdRef = useRef<string | null>(null)
  const startedAtRef = useRef<string | null>(null)
  const finishingRef = useRef(false)
  const elapsedRef = useRef(0)
  const [status, setStatus] = useState<Status>("idle")
  const [elapsed, setElapsed] = useState(0)
  const [volume, setVolume] = useState(Math.round((session.defaultVolume / 0.18) * 100))
  const [noise, setNoise] = useState(Math.round((session.defaultNoise / 0.12) * 100))
  const [note, setNote] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const phase = getPhaseAt(session, elapsed)
  const remaining = Math.max(0, session.durationSec - elapsed)
  const progress = Math.min(100, (elapsed / session.durationSec) * 100)
  const beatHz = phase.beatHz
  const carrierHz = phase.carrierHz
  const band = bandForHz(beatHz)

  const engineVolume = useMemo(() => Math.max(0.01, (volume / 100) * 0.18), [volume])
  const engineNoise = useMemo(() => (noise / 100) * 0.12, [noise])

  const finish = useCallback(
    async (completed: boolean, playedSec: number) => {
      if (finishingRef.current) return
      finishingRef.current = true
      setStatus("done")
      await engineRef.current?.stop(completed ? 2.4 : 0.8)
      const id = logIdRef.current ?? newId()
      logIdRef.current = id
      addLog({
        id,
        sessionId: session.id,
        sessionTitle: session.title,
        startedAt: startedAtRef.current ?? new Date().toISOString(),
        durationSec: Math.round(playedSec),
        completed,
        rating: null,
        note: "",
      })
    },
    [session.id, session.title]
  )

  useEffect(() => {
    engineRef.current = new BinauralEngine()
    return () => {
      void engineRef.current?.stop(0.4)
    }
  }, [])

  useEffect(() => {
    elapsedRef.current = elapsed
  }, [elapsed])

  useEffect(() => {
    if (status !== "running") return
    const started = performance.now() - elapsedRef.current * 1000
    let frame = 0
    const tick = (now: number) => {
      const next = (now - started) / 1000
      if (next >= session.durationSec) {
        setElapsed(session.durationSec)
        void finish(true, session.durationSec)
        return
      }
      setElapsed(next)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [status, session.durationSec, finish])

  useEffect(() => {
    if (status !== "running") return
    engineRef.current?.setFrequencies(carrierHz, beatHz)
  }, [status, carrierHz, beatHz])

  useEffect(() => {
    if (status === "running") {
      engineRef.current?.setVolume(engineVolume)
    }
  }, [engineVolume, status])

  useEffect(() => {
    if (status === "running" || status === "paused") {
      engineRef.current?.setNoise(engineNoise)
    }
  }, [engineNoise, status])

  async function play() {
    setError(null)
    try {
      if (!startedAtRef.current) {
        startedAtRef.current = new Date().toISOString()
        logIdRef.current = newId()
      }
      if (status === "paused" && engineRef.current?.isRunning) {
        engineRef.current.mute(false)
        setStatus("running")
        return
      }
      await engineRef.current?.start({
        carrierHz,
        beatHz,
        volume: engineVolume,
        noise: engineNoise,
      })
      setStatus("running")
    } catch {
      setError("The browser blocked audio. Tap Begin once more, and use stereo headphones.")
      toast.error("Audio did not start. Try again after a click.")
    }
  }

  function pause() {
    engineRef.current?.mute(true)
    setStatus("paused")
  }

  async function stopEarly() {
    await finish(false, elapsed)
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.target instanceof HTMLTextAreaElement) return
      if (event.code !== "Space") return
      event.preventDefault()
      if (status === "running") pause()
      else if (status === "idle" || status === "paused") void play()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  const showCues = !lab

  return (
    <div className="mx-auto flex min-h-full max-w-3xl flex-col px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link href={lab ? "/lab" : "/practice"}>
            <ArrowLeft data-icon="inline-start" />
            Back
          </Link>
        </Button>
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          {session.analog}
        </p>
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center">
        {status !== "done" ? (
          <>
            <p className="text-sm text-muted-foreground">{session.kicker}</p>
            <h1 className="font-heading mt-1 text-4xl tracking-tight sm:text-5xl">
              {session.title}
            </h1>
            <HemisphereVisual
              beatHz={beatHz}
              running={status === "running"}
              className="mt-8"
            />
            <p className="font-mono mt-2 text-3xl tabular-nums tracking-tight">
              {formatClock(remaining)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatHz(carrierHz)} Hz carrier · {formatHz(beatHz)} Hz beat · {band.label}
            </p>

            {showCues ? (
              <div className="mt-8 w-full rounded-2xl border border-border/80 bg-card/80 p-5">
                <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
                  {phase.title}
                </p>
                <p className="mt-2 text-base leading-7 text-pretty">{phase.cue}</p>
              </div>
            ) : (
              <p className="mt-8 max-w-md text-center text-sm text-muted-foreground">
                No script in the lab. Stay with the beat. Change the numbers while it runs.
              </p>
            )}

            <div className="mt-6 w-full">
              <div className="h-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {showCues ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {session.phases.map((item) => {
                    const active = item.at === phase.at
                    const past = elapsed > item.at + item.duration
                    return (
                      <span
                        key={`${item.at}-${item.title}`}
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] tracking-wide uppercase",
                          active
                            ? "bg-primary text-primary-foreground"
                            : past
                              ? "bg-secondary text-muted-foreground"
                              : "text-muted-foreground/70"
                        )}
                      >
                        {item.title}
                      </span>
                    )
                  })}
                </div>
              ) : null}
            </div>

            {error ? (
              <p className="mt-4 text-sm text-destructive">{error}</p>
            ) : null}

            <div className="mt-8 flex items-center gap-3">
              {status === "running" ? (
                <Button size="lg" onClick={pause}>
                  <Pause data-icon="inline-start" />
                  Pause
                </Button>
              ) : (
                <Button size="lg" onClick={() => void play()}>
                  <Play data-icon="inline-start" />
                  {status === "paused" ? "Resume" : "Begin"}
                </Button>
              )}
              {status !== "idle" ? (
                <Button size="lg" variant="outline" onClick={() => void stopEarly()}>
                  <Square data-icon="inline-start" />
                  End
                </Button>
              ) : null}
            </div>

            <div className="mt-8 grid w-full gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex justify-between text-xs text-muted-foreground">
                  Tone
                  <span className="font-mono">{volume}</span>
                </span>
                <Slider
                  min={8}
                  max={100}
                  step={1}
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0] ?? volume)}
                />
              </label>
              <label className="block">
                <span className="mb-2 flex justify-between text-xs text-muted-foreground">
                  Noise bed
                  <span className="font-mono">{noise}</span>
                </span>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[noise]}
                  onValueChange={(value) => setNoise(value[0] ?? noise)}
                />
              </label>
            </div>
            <p className="mt-6 max-w-lg text-center text-xs leading-5 text-muted-foreground">
              Stereo headphones required. Do not use this while driving or walking in traffic.
              Space bar toggles play. Keep the tone quieter than you think.
            </p>
          </>
        ) : (
          <CompletionCard
            session={session}
            note={note}
            rating={rating}
            saved={saved}
            onNote={setNote}
            onRating={setRating}
            onSave={() => {
              if (!logIdRef.current) return
              updateLog(logIdRef.current, {
                note: note.trim(),
                rating,
              })
              setSaved(true)
              toast.success("Saved to progress")
            }}
          />
        )}
      </div>
    </div>
  )
}

function CompletionCard({
  session,
  note,
  rating,
  saved,
  onNote,
  onRating,
  onSave,
}: {
  session: PracticeSession
  note: string
  rating: number | null
  saved: boolean
  onNote: (value: string) => void
  onRating: (value: number) => void
  onSave: () => void
}) {
  return (
    <div className="w-full max-w-lg py-8">
      <p className="text-sm text-muted-foreground">Session closed</p>
      <h1 className="font-heading mt-1 text-4xl tracking-tight">{session.title}</h1>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">
        Three lines while the state is still wet: body, mind, one image or phrase. Do not
        write a theory.
      </p>
      <p className="mt-6 text-xs tracking-[0.18em] text-muted-foreground uppercase">
        How clear was attention
      </p>
      <div className="mt-2 flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onRating(value)}
            className={cn(
              "size-10 rounded-full border text-sm transition-colors",
              rating === value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border hover:bg-secondary"
            )}
          >
            {value}
          </button>
        ))}
      </div>
      <Textarea
        className="mt-5 min-h-32"
        placeholder="Body felt… Mind did… One leftover image…"
        value={note}
        onChange={(event) => onNote(event.target.value)}
      />
      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={onSave} disabled={saved}>
          {saved ? "Saved" : "Save to progress"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/journal">See progress</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/practice">Another session</Link>
        </Button>
      </div>
    </div>
  )
}
