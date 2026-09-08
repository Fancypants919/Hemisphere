import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { articleBody, ARTICLES, getArticle } from "@/lib/articles"
import { Button } from "@/components/ui/button"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: "Essay" }
  return { title: article.title, description: article.dek }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()
  const sections = articleBody(slug)
  const index = ARTICLES.findIndex((item) => item.slug === slug)
  const next = ARTICLES[index + 1]
  const prev = ARTICLES[index - 1]

  return (
    <article className="mx-auto max-w-2xl">
      <p className="font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        {String(article.order).padStart(2, "0")} · {article.minutes} min
      </p>
      <h1 className="font-heading mt-3 text-4xl leading-tight tracking-tight sm:text-5xl">
        {article.title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-muted-foreground">{article.dek}</p>
      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.heading ?? section.paragraphs[0]?.slice(0, 24)}>
            {section.heading ? (
              <h2 className="font-heading text-2xl tracking-tight">{section.heading}</h2>
            ) : null}
            <div className={section.heading ? "mt-3 space-y-4" : "space-y-4"}>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-base leading-7 text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-3 border-t border-border/70 pt-6">
        {prev ? (
          <Button variant="outline" asChild>
            <Link href={`/learn/${prev.slug}`}>Previous</Link>
          </Button>
        ) : null}
        {next ? (
          <Button asChild>
            <Link href={`/learn/${next.slug}`}>Next: {next.title}</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/practice/first-contact">Practice First Contact</Link>
          </Button>
        )}
      </div>
    </article>
  )
}
