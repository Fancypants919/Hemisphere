"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { BinauralEngine } from "@/lib/audio-engine"

const engine = new BinauralEngine()

export function StereoCheck() {
  const [busy, setBusy] = useState(false)

  async function run() {
    setBusy(true)
    try {
      await engine.playStereoCheck()
      toast("Left beep, then right beep. If both live in one place, the headphones are not stereo.")
    } catch {
      toast.error("The browser blocked audio. Click again after interacting with the page.")
    } finally {
      setTimeout(() => setBusy(false), 1800)
    }
  }

  return (
    <Button type="button" variant="outline" size="lg" onClick={run} disabled={busy}>
      {busy ? "Listening…" : "Stereo check"}
    </Button>
  )
}
