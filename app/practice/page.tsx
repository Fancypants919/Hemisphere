import type { Metadata } from "next"
import Link from "next/link"
import { formatDuration, SESSIONS } from "@/lib/sessions"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Practice",
}

const WEEK = [
  "First Contact",
  "First Contact again",
  "Still Body",
  "Still Body",
  "Still Body + five sentences",
  "Study Lock on a real assignment",
  "Sleep Slope or another Still Body",
]

export default function PracticePage() {
  return (
    <div className="space-y-10">
      <div className="max-w-2xl">
        <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Practice</p>
        <h1 className="font-heading mt-3 text-4xl tracking-tight sm:text-5xl">
          Train a state, not a story.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Original guided sessions, binaural audio generated on your machine. The Gateway
          labels in the corner are historical nicknames. The words on screen are not Monroe
          scripts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SESSIONS.map((session) => (
          <Link
            key={session.id}
            href={`/practice/${session.id}`}
            className="rounded-2xl border border-border/80 bg-card/65 p-6 transition-colors hover:border-primary/50"
          >
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              {session.difficulty} · {formatDuration(session.durationSec)} · {session.analog}
            </p>
            <h2 className="font-heading mt-2 text-3xl tracking-tight">{session.title}</h2>
            <p className="mt-1 text-sm text-primary/90">{session.kicker}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{session.summary}</p>
          </Link>
        ))}
      </div>

      <aside className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8">
        <h2 className="font-heading text-2xl tracking-tight">A week you can copy</h2>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {WEEK.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm leading-6">
              <span className="font-mono text-primary">D{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <Button className="mt-6" asChild>
          <Link href="/practice/first-contact">Begin the week</Link>
        </Button>
      </aside>
    </div>
  )
}
