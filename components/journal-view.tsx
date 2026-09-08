"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  deleteLog,
  getClientSnapshot,
  getServerSnapshot,
  streakDays,
  subscribe,
  totalMinutes,
  updateLog,
  type SessionLog,
} from "@/lib/storage"
import { formatClock } from "@/lib/sessions"
import Link from "next/link"

export function JournalView() {
  const state = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const logs = state.logs

  const stats = useMemo(
    () => ({
      count: logs.length,
      minutes: totalMinutes(logs),
      streak: streakDays(logs),
    }),
    [logs]
  )

  if (logs.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border p-8 sm:p-12">
        <p className="font-heading text-3xl tracking-tight">No hours yet</p>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Sessions and notes stay in this browser. Nothing is uploaded. After First Contact,
          write one physical sentence. That is how the practice becomes yours instead of a
          video you watched.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/practice/first-contact">Do First Contact</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="Sessions" value={String(stats.count)} />
        <Stat label="Minutes" value={String(stats.minutes)} />
        <Stat label="Day streak" value={String(stats.streak)} />
      </div>
      <ol className="space-y-4">
        {logs.map((log) => (
          <LogCard key={log.id} log={log} />
        ))}
      </ol>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 px-4 py-3">
      <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">{label}</p>
      <p className="font-heading mt-1 text-3xl">{value}</p>
    </div>
  )
}

function LogCard({ log }: { log: SessionLog }) {
  const [note, setNote] = useState(log.note)
  const date = new Date(log.startedAt)

  return (
    <li className="rounded-2xl border border-border/80 bg-card/70 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-heading text-xl">{log.sessionTitle}</p>
        <p className="font-mono text-[11px] text-muted-foreground">
          {date.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}{" "}
          · {formatClock(log.durationSec)}
          {log.completed ? "" : " · ended early"}
        </p>
      </div>
      {log.rating ? (
        <p className="mt-1 text-xs text-muted-foreground">Attention {log.rating}/5</p>
      ) : null}
      <Textarea
        className="mt-4"
        value={note}
        placeholder="Body, mind, one image."
        onChange={(event) => setNote(event.target.value)}
        onBlur={() => updateLog(log.id, { note: note.trim() })}
      />
      <div className="mt-3 flex justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={() => deleteLog(log.id)}>
          Delete
        </Button>
      </div>
    </li>
  )
}
