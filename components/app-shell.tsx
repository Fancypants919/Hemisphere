"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpenText,
  ChartNoAxesColumn,
  FlaskConical,
  Headphones,
} from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/learn", label: "Learn", icon: BookOpenText },
  { href: "/practice", label: "Practice", icon: Headphones },
  { href: "/lab", label: "Lab", icon: FlaskConical },
  { href: "/journal", label: "Progress", icon: ChartNoAxesColumn },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideChrome = pathname.startsWith("/practice/")

  if (hideChrome) {
    return <div className="min-h-full">{children}</div>
  }

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="hemisphere-mark" aria-hidden="true" />
            <span className="font-heading text-lg tracking-tight">
              Hemisphere
            </span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-8 sm:pb-12">
        {children}
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 backdrop-blur-md sm:hidden">
        <div className="grid grid-cols-4 px-2 py-2">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`)
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg py-1 text-[11px]",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
