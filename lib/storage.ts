export type SessionLog = {
  id: string
  sessionId: string
  sessionTitle: string
  startedAt: string
  durationSec: number
  completed: boolean
  rating: number | null
  note: string
}

export type HemisphereState = {
  logs: SessionLog[]
}

const KEY = "hemisphere:v1"

const listeners = new Set<() => void>()
const emptyState: HemisphereState = { logs: [] }
let memory: HemisphereState = emptyState
let hydrated = false

function emit() {
  listeners.forEach((listener) => listener())
}

export function loadState(): HemisphereState {
  if (typeof window === "undefined") return emptyState
  if (!hydrated) {
    try {
      const raw = window.localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as HemisphereState
        if (Array.isArray(parsed.logs)) memory = parsed
      }
    } catch {
      memory = emptyState
    }
    hydrated = true
  }
  return memory
}

export function getClientSnapshot() {
  return loadState()
}

export function getServerSnapshot() {
  return emptyState
}

export function saveState(next: HemisphereState) {
  memory = next
  hydrated = true
  window.localStorage.setItem(KEY, JSON.stringify(next))
  emit()
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function addLog(entry: SessionLog) {
  const state = loadState()
  saveState({ logs: [entry, ...state.logs].slice(0, 200) })
}

export function updateLog(id: string, patch: Partial<SessionLog>) {
  const state = loadState()
  saveState({
    logs: state.logs.map((log) => (log.id === id ? { ...log, ...patch } : log)),
  })
}

export function deleteLog(id: string) {
  const state = loadState()
  saveState({ logs: state.logs.filter((log) => log.id !== id) })
}

export function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function streakDays(logs: SessionLog[], now = new Date()) {
  const days = new Set(
    logs.map((log) => new Date(log.startedAt).toISOString().slice(0, 10))
  )
  let streak = 0
  const cursor = new Date(now)
  for (;;) {
    const key = cursor.toISOString().slice(0, 10)
    if (!days.has(key)) break
    streak += 1
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }
  return streak
}

export function totalMinutes(logs: SessionLog[]) {
  return Math.round(logs.reduce((sum, log) => sum + log.durationSec, 0) / 60)
}
