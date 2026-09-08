"use client"

import type { DayBucket, ProgressSummary, RatedPoint, SessionMix } from "@/lib/stats"
import { cn } from "@/lib/utils"

export function ProgressCharts({ summary }: { summary: ProgressSummary }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Time on the cushion" value={summary.hoursLabel} />
        <Stat label="Sessions" value={String(summary.sessions)} />
        <Stat
          label="Streak"
          value={`${summary.currentStreak}d`}
          hint={summary.longestStreak ? `longest ${summary.longestStreak}d` : "start today"}
        />
        <Stat
          label="Attention"
          value={summary.avgRating == null ? "—" : `${summary.avgRating}`}
          hint={summary.avgRating == null ? "rate a session after" : `avg · ${summary.completionPct}% finished`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Last 14 days" kicker="Minutes">
          <MinuteBars days={summary.last14} />
        </Panel>
        <Panel title="28-day field" kicker="Presence">
          <Heatmap days={summary.last28} />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Attention ratings" kicker="1–5 after sessions">
          <RatingLine points={summary.ratings} />
        </Panel>
        <Panel title="What you actually run" kicker="Minutes by session">
          <MixBars items={summary.mix} />
        </Panel>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card/60 px-4 py-3">
      <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">{label}</p>
      <p className="font-heading mt-1 text-3xl tracking-tight">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function Panel({
  title,
  kicker,
  children,
}: {
  title: string
  kicker: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border/80 bg-card/70 p-5">
      <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
        {kicker}
      </p>
      <h2 className="font-heading mt-1 text-xl tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

function MinuteBars({ days }: { days: DayBucket[] }) {
  const max = Math.max(...days.map((day) => day.minutes), 1)
  const total = days.reduce((sum, day) => sum + day.minutes, 0)

  if (total === 0) {
    return <EmptyChart text="Bars fill in as you complete sessions." />
  }

  return (
    <div>
      <div className="flex h-36 items-end gap-1">
        {days.map((day) => (
          <div key={day.key} className="flex min-w-0 flex-1 flex-col items-center gap-1">
            <div
              className={cn(
                "w-full rounded-t-sm",
                day.minutes > 0 ? "bg-primary" : "bg-muted"
              )}
              style={{ height: `${Math.max(day.minutes > 0 ? 8 : 3, (day.minutes / max) * 100)}%` }}
              title={`${day.label}: ${day.minutes} min`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1">
        {days.map((day) => (
          <span
            key={day.key}
            className="min-w-0 flex-1 text-center font-mono text-[9px] text-muted-foreground"
          >
            {day.weekday}
          </span>
        ))}
      </div>
    </div>
  )
}

function Heatmap({ days }: { days: DayBucket[] }) {
  const max = Math.max(...days.map((day) => day.minutes), 1)
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => {
          const t = day.minutes / max
          const fill =
            day.minutes === 0
              ? "bg-muted"
              : t > 0.75
                ? "bg-primary"
                : t > 0.4
                  ? "bg-primary/70"
                  : t > 0.15
                    ? "bg-primary/40"
                    : "bg-primary/20"
          return (
            <div
              key={day.key}
              title={`${day.label}: ${day.minutes} min · ${day.count} session${day.count === 1 ? "" : "s"}`}
              className={cn("aspect-square rounded-sm", fill)}
            />
          )
        })}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Each square is a day, oldest at the top-left. Darker copper means more minutes.
      </p>
    </div>
  )
}

function RatingLine({ points }: { points: RatedPoint[] }) {
  if (points.length === 0) {
    return <EmptyChart text="After a session, tap 1–5 for how clear attention was. That becomes this line." />
  }

  const width = 320
  const height = 92
  const pad = 10
  const innerW = width - pad * 2
  const innerH = height - pad * 2
  const coords = points.map((point, index) => {
    const x =
      points.length === 1 ? pad + innerW / 2 : pad + (index / (points.length - 1)) * innerW
    const y = pad + innerH - ((point.rating - 1) / 4) * innerH
    return { x, y, point }
  })
  const d = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-28 w-full overflow-visible" role="img">
      <title>Attention ratings over recent sessions</title>
      {[1, 2, 3, 4, 5].map((n) => {
        const y = pad + innerH - ((n - 1) / 4) * innerH
        return (
          <line
            key={n}
            x1={pad}
            x2={width - pad}
            y1={y}
            y2={y}
            className="stroke-border"
            strokeWidth="1"
          />
        )
      })}
      <path d={d} fill="none" className="stroke-primary" strokeWidth="2" />
      {coords.map((c) => (
        <circle key={c.point.id} cx={c.x} cy={c.y} r="3.5" className="fill-primary" />
      ))}
    </svg>
  )
}

function MixBars({ items }: { items: SessionMix[] }) {
  if (items.length === 0) {
    return <EmptyChart text="Session types show up once you have a few hours." />
  }
  const max = Math.max(...items.map((item) => item.minutes), 1)
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.sessionId}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span>{item.title}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {item.minutes}m · {item.count}
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.max(6, (item.minutes / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

function EmptyChart({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-dashed border-border px-3 py-8 text-center text-sm text-muted-foreground">
      {text}
    </p>
  )
}
