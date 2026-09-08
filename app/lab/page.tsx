import type { Metadata } from "next"
import { LabStudio } from "@/components/lab-studio"

export const metadata: Metadata = {
  title: "Lab",
  description: "Mix your own binaural beat: carrier, difference frequency, noise, duration.",
}

export default function LabPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Mixer</p>
        <h1 className="font-heading mt-3 text-4xl tracking-tight sm:text-5xl">
          Build the beat yourself.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Left ear gets the carrier. Right ear gets carrier plus the beat. Change the
          numbers while it runs. If a preset feels like home, that is data — write it in the
          journal, do not assume it rewired your EEG.
        </p>
      </div>
      <LabStudio />
    </div>
  )
}
