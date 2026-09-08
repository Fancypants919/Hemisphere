import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SessionPlayer } from "@/components/session-player"
import { getSession, SESSIONS } from "@/lib/sessions"

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return SESSIONS.map((session) => ({ id: session.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const session = getSession(id)
  if (!session) return { title: "Session" }
  return { title: session.title, description: session.summary }
}

export default async function SessionPage({ params }: Props) {
  const { id } = await params
  const session = getSession(id)
  if (!session) notFound()
  return <SessionPlayer session={session} />
}
