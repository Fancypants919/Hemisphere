"use client"

import { useMemo, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { BackupControls } from "@/components/backup-controls"
import { ProgressCharts } from "@/components/progress-charts"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  deleteLog,
  getClientSnapshot,
  getServerSnapshot,
  subscribe,
  updateLog,
  type SessionLog,
} from "@/lib/storage"
import { summarize } from "@/lib/stats"
import { formatClock } from "@/lib/sessions"

export function JournalView() {
  const state = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const logs = state.logs
  const summary = useMemo(() => summarize(logs), [logs])

  return (
    <div className="space-y-8">
      <BackupControls />
      {logs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-8 sm:p-12">
          <p className="font-heading text-3xl tracking-tight">No hours yet</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            History stays on this device — no account. Charts appear after the first session.
            If you already practiced on another browser, import a backup file above.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/practice/first-contact">Do First Contact</Link>
          </Button>
        </div>
      ) : (
        <>
          <ProgressCharts summary={summary} />
          <div>
            <h2 className="font-heading text-2xl tracking-tight">Debrief log</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Three lines while the state is still wet. Edit anytime. {logs.length} kept,
              newest first.
            </p>
            <ol className="mt-5 space-y-4">
              {logs.map((log) => (
                <LogCard key={log.id} log={log} />
              ))}
            </ol>
          </div>
        </>
      )}
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
