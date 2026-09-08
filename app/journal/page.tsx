import type { Metadata } from "next"
import { JournalView } from "@/components/journal-view"

export const metadata: Metadata = {
  title: "Journal",
}

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Debrief</p>
        <h1 className="font-heading mt-3 text-4xl tracking-tight sm:text-5xl">
          Hours, not content.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Gateway was picky about writing things down because unwritten states get captured
          by your usual personality. Notes live only in this browser.
        </p>
      </div>
      <JournalView />
    </div>
  )
}
