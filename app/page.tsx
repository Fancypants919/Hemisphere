import Link from "next/link"
import { ArrowRight, Headphones } from "lucide-react"
import { StereoCheck } from "@/components/stereo-check"
import { Button } from "@/components/ui/button"
import { ARTICLES } from "@/lib/articles"
import { formatDuration, SESSIONS } from "@/lib/sessions"

export default function HomePage() {
  return (
    <div className="space-y-16 pb-8">
      <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-primary uppercase">
            Personal practice lab
          </p>
          <h1 className="font-heading mt-4 max-w-xl text-5xl leading-[1.05] tracking-tight text-pretty sm:text-6xl">
            Two ears, one beat, a mind that stays.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            You probably mean Hemi-Sync — Monroe Institute audio that the CIA wrote a 1983
            memo about under the name Gateway. This is a small, honest version you can use:
            binaural tones in the browser, the public ideas taught clearly, original sessions
            for stillness, study, and sleep.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="/practice/first-contact">
                First session
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/learn/the-short-version">Read the short version</Link>
            </Button>
            <StereoCheck />
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
            <Headphones className="mt-0.5 size-3.5 shrink-0" />
            Stereo headphones are the method. Speakers collapse the trick. Not medical care,
            not the Monroe Institute, not a promise you will leave your body.
          </p>
        </div>
        <aside className="rounded-3xl border border-border/80 bg-card/70 p-6">
          <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            Start tonight
          </p>
          <ol className="mt-4 space-y-4">
            {[
              "Run the stereo check. Left beep, then right.",
              "Lie down. Eight minutes of First Contact.",
              "One sentence in the journal: what the body did.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3 text-sm leading-6">
                <span className="font-mono text-primary">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl tracking-tight">Sessions</h2>
          <Link href="/practice" className="text-sm text-primary hover:underline">
            All practice
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SESSIONS.map((session) => (
            <Link
              key={session.id}
              href={`/practice/${session.id}`}
              className="group rounded-2xl border border-border/80 bg-card/60 p-5 transition-colors hover:border-primary/50"
            >
              <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                {session.difficulty} · {formatDuration(session.durationSec)}
              </p>
              <p className="font-heading mt-2 text-2xl tracking-tight group-hover:text-primary">
                {session.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{session.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8">
          <h2 className="font-heading text-3xl tracking-tight">Learn it like a craft</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The viral version of Gateway is a physics cartoon. The usable version is closer
            to flight hours: a still body, a watching mind, a debrief. Six short essays, no
            lorem, no secret-page mythology.
          </p>
          <ul className="mt-5 space-y-2">
            {ARTICLES.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/learn/${article.slug}`}
                  className="flex items-baseline justify-between gap-3 text-sm hover:text-primary"
                >
                  <span>{article.title}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {article.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border/80 bg-card/60 p-6 sm:p-8">
          <h2 className="font-heading text-3xl tracking-tight">What you can test</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Binaural beats are a real brainstem phenomenon. Whether they retune your EEG on
            command is much less settled. Use this for state change you can feel: rumination
            dropping, a study block holding, sleep arriving with less argument. Keep the CIA
            memo as history, not as a user manual for the universe.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/learn/what-science-says">What science says</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/lab">Open the mixer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
