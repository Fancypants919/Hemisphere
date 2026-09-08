import type { SessionLog } from "@/lib/storage"

export type DayBucket = {
  key: string
  label: string
  weekday: string
  minutes: number
  count: number
}

export type SessionMix = {
  sessionId: string
  title: string
  minutes: number
  count: number
}

export type RatedPoint = {
  id: string
  at: string
  rating: number
}

export type ProgressSummary = {
  sessions: number
  minutes: number
  hoursLabel: string
  currentStreak: number
  longestStreak: number
  avgRating: number | null
  completionPct: number
  last14: DayBucket[]
  last28: DayBucket[]
  ratings: RatedPoint[]
  mix: SessionMix[]
}

export function localDayKey(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function shiftDay(key: string, delta: number) {
  const [year, month, day] = key.split("-").map(Number)
  const next = new Date(year, month - 1, day)
  next.setDate(next.getDate() + delta)
  return localDayKey(next)
}

function formatDayLabel(key: string) {
  const [year, month, day] = key.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })
}

function weekdayLabel(key: string) {
  const [year, month, day] = key.split("-").map(Number)
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "narrow",
  })
}

export function totalMinutes(logs: SessionLog[]) {
  return Math.round(logs.reduce((sum, log) => sum + log.durationSec, 0) / 60)
}

export function formatHours(minutes: number) {
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`
}

export function practicedDays(logs: SessionLog[]) {
  return new Set(logs.map((log) => localDayKey(log.startedAt)))
}

export function currentStreak(logs: SessionLog[], now = new Date()) {
  const days = practicedDays(logs)
  const today = localDayKey(now)
  const yesterday = shiftDay(today, -1)
  let cursor = days.has(today) ? today : days.has(yesterday) ? yesterday : null
  if (!cursor) return 0
  let streak = 0
  while (days.has(cursor)) {
    streak += 1
    cursor = shiftDay(cursor, -1)
  }
  return streak
}

export function longestStreak(logs: SessionLog[]) {
  const days = [...practicedDays(logs)].sort()
  if (days.length === 0) return 0
  let best = 1
  let run = 1
  for (let i = 1; i < days.length; i += 1) {
    if (days[i] === shiftDay(days[i - 1], 1)) {
      run += 1
      best = Math.max(best, run)
    } else {
      run = 1
    }
  }
  return best
}

function rangeDays(endKey: string, count: number, logs: SessionLog[]): DayBucket[] {
  const byDay = new Map<string, { minutes: number; count: number }>()
  for (const log of logs) {
    const key = localDayKey(log.startedAt)
    const current = byDay.get(key) ?? { minutes: 0, count: 0 }
    current.minutes += log.durationSec / 60
    current.count += 1
    byDay.set(key, current)
  }
  const start = shiftDay(endKey, -(count - 1))
  return Array.from({ length: count }, (_, index) => {
    const key = shiftDay(start, index)
    const bucket = byDay.get(key) ?? { minutes: 0, count: 0 }
    return {
      key,
      label: formatDayLabel(key),
      weekday: weekdayLabel(key),
      minutes: Math.round(bucket.minutes),
      count: bucket.count,
    }
  })
}

export function summarize(logs: SessionLog[], now = new Date()): ProgressSummary {
  const minutes = totalMinutes(logs)
  const rated = logs.filter((log): log is SessionLog & { rating: number } => log.rating != null)
  const completed = logs.filter((log) => log.completed).length
  const mixMap = new Map<string, SessionMix>()
  for (const log of logs) {
    const current = mixMap.get(log.sessionId) ?? {
      sessionId: log.sessionId,
      title: log.sessionTitle,
      minutes: 0,
      count: 0,
    }
    current.minutes += log.durationSec / 60
    current.count += 1
    mixMap.set(log.sessionId, current)
  }
  const today = localDayKey(now)
  return {
    sessions: logs.length,
    minutes,
    hoursLabel: formatHours(minutes),
    currentStreak: currentStreak(logs, now),
    longestStreak: longestStreak(logs),
    avgRating:
      rated.length === 0
        ? null
        : Math.round((rated.reduce((sum, log) => sum + log.rating, 0) / rated.length) * 10) / 10,
    completionPct: logs.length === 0 ? 0 : Math.round((completed / logs.length) * 100),
    last14: rangeDays(today, 14, logs),
    last28: rangeDays(today, 28, logs),
    ratings: [...rated]
      .sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime())
      .slice(-16)
      .map((log) => ({ id: log.id, at: log.startedAt, rating: log.rating })),
    mix: [...mixMap.values()]
      .map((item) => ({ ...item, minutes: Math.round(item.minutes) }))
      .sort((a, b) => b.minutes - a.minutes),
  }
}
