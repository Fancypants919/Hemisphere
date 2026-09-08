import type { Metadata } from "next"
import Link from "next/link"
import { ARTICLES } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Learn",
}

export default function LearnIndexPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Curriculum</p>
      <h1 className="font-heading mt-3 text-4xl tracking-tight sm:text-5xl">
        Six essays, then headphones.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
        Read in order if this is new. Skip to the CIA paper if that is the itch. Skip to the
        protocol if you already know the lore and keep bouncing off practice.
      </p>
      <ol className="mt-10 space-y-3">
        {ARTICLES.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/learn/${article.slug}`}
              className="block rounded-2xl border border-border/80 bg-card/60 p-5 transition-colors hover:border-primary/50"
            >
              <p className="font-mono text-[11px] text-muted-foreground">
                {String(article.order).padStart(2, "0")} · {article.minutes} min
              </p>
              <p className="font-heading mt-1 text-2xl tracking-tight">{article.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{article.dek}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
