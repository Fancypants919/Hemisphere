import type { Metadata } from "next"
import { JournalView } from "@/components/journal-view"

export const metadata: Metadata = {
  title: "Progress",
}

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Progress</p>
        <h1 className="font-heading mt-3 text-4xl tracking-tight sm:text-5xl">
          Hours, not content.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          No login. This browser remembers your sessions, ratings, and notes, and turns them
          into charts. Download a backup if you switch machines — nothing is stored on a
          server.
        </p>
      </div>
      <JournalView />
    </div>
  )
}
