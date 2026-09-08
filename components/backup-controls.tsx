"use client"

import { useRef } from "react"
import { Download, Upload } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { exportBackup, importBackup } from "@/lib/storage"

export function BackupControls() {
  const inputRef = useRef<HTMLInputElement>(null)

  function download() {
    const backup = exportBackup()
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const stamp = new Date().toISOString().slice(0, 10)
    const link = document.createElement("a")
    link.href = url
    link.download = `hemisphere-${stamp}.json`
    link.click()
    URL.revokeObjectURL(url)
    toast.success("Backup downloaded. Keep that file if you switch browsers.")
  }

  async function onFile(file: File | undefined) {
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text()) as unknown
      const result = importBackup(parsed)
      if (result.added === 0) {
        toast("Nothing new in that file. Those sessions were already here.")
      } else {
        toast.success(
          `Restored ${result.added} session${result.added === 1 ? "" : "s"}${
            result.skipped ? ` · ${result.skipped} already saved` : ""
          }`
        )
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not read that backup.")
    } finally {
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" size="sm" onClick={download}>
        <Download data-icon="inline-start" />
        Download backup
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => inputRef.current?.click()}>
        <Upload data-icon="inline-start" />
        Import
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        className="sr-only"
        onChange={(event) => void onFile(event.target.files?.[0])}
      />
    </div>
  )
}
