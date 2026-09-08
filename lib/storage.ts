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

export type BackupFile = {
  version: 1
  exportedAt: string
  logs: SessionLog[]
}

export const MAX_LOGS = 500
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
        if (Array.isArray(parsed.logs)) {
          memory = {
            logs: parsed.logs
              .map(coerceLog)
              .filter((log): log is SessionLog => log !== null),
          }
        }
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

function sortLogs(logs: SessionLog[]) {
  return [...logs].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
  )
}

function coerceLog(value: unknown): SessionLog | null {
  if (!value || typeof value !== "object") return null
  const raw = value as Partial<SessionLog>
  if (typeof raw.id !== "string" || !raw.id) return null
  if (typeof raw.sessionId !== "string") return null
  if (typeof raw.sessionTitle !== "string") return null
  if (typeof raw.startedAt !== "string" || Number.isNaN(new Date(raw.startedAt).getTime())) {
    return null
  }
  if (typeof raw.durationSec !== "number" || !Number.isFinite(raw.durationSec)) return null
  const rating =
    raw.rating === null || raw.rating === undefined
      ? null
      : typeof raw.rating === "number" && raw.rating >= 1 && raw.rating <= 5
        ? raw.rating
        : null
  return {
    id: raw.id,
    sessionId: raw.sessionId,
    sessionTitle: raw.sessionTitle,
    startedAt: raw.startedAt,
    durationSec: Math.max(0, Math.round(raw.durationSec)),
    completed: Boolean(raw.completed),
    rating,
    note: typeof raw.note === "string" ? raw.note : "",
  }
}

export function addLog(entry: SessionLog) {
  const state = loadState()
  saveState({ logs: sortLogs([entry, ...state.logs]).slice(0, MAX_LOGS) })
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

export function exportBackup(): BackupFile {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    logs: loadState().logs,
  }
}

export function importBackup(raw: unknown): { added: number; skipped: number } {
  const logs = extractLogs(raw)
  if (logs.length === 0) {
    throw new Error("That file has no Hemisphere sessions in it.")
  }
  const state = loadState()
  const seen = new Set(state.logs.map((log) => log.id))
  let added = 0
  let skipped = 0
  const merged = [...state.logs]
  for (const log of logs) {
    if (seen.has(log.id)) {
      skipped += 1
      continue
    }
    seen.add(log.id)
    merged.push(normalizeLog(log))
    added += 1
  }
  saveState({ logs: sortLogs(merged).slice(0, MAX_LOGS) })
  return { added, skipped }
}

function extractLogs(raw: unknown): SessionLog[] {
  const list = Array.isArray(raw)
    ? raw
    : raw && typeof raw === "object" && "logs" in raw && Array.isArray(raw.logs)
      ? raw.logs
      : []
  return list.map(coerceLog).filter((log): log is SessionLog => log !== null)
}

function normalizeLog(log: SessionLog): SessionLog {
  return {
    id: log.id,
    sessionId: log.sessionId,
    sessionTitle: log.sessionTitle,
    startedAt: new Date(log.startedAt).toISOString(),
    durationSec: Math.max(0, Math.round(log.durationSec)),
    completed: log.completed,
    rating: log.rating,
    note: log.note,
  }
}
