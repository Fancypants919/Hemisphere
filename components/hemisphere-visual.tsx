"use client"

import { bandForHz, formatHz } from "@/lib/brainwaves"
import { cn } from "@/lib/utils"

export function HemisphereVisual({
  beatHz,
  running,
  className,
}: {
  beatHz: number
  running: boolean
  className?: string
}) {
  const period = Math.max(0.2, 1 / Math.max(beatHz, 0.5))
  const band = bandForHz(beatHz)

  return (
    <div className={cn("relative mx-auto aspect-[1.4/1] w-full max-w-md", className)}>
      <div
        className="absolute inset-0"
        style={
          {
            "--pulse": `${period}s`,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            "hemisphere-lobe hemisphere-lobe-left",
            running && "is-running"
          )}
        />
        <div
          className={cn(
            "hemisphere-lobe hemisphere-lobe-right",
            running && "is-running"
          )}
        />
        <div className="hemisphere-join" />
      </div>
      <div className="absolute inset-x-0 bottom-1 text-center">
        <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
          {formatHz(beatHz)} Hz · {band.label}
        </p>
      </div>
    </div>
  )
}
