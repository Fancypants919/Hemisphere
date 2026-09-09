import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { AppShell } from "@/components/app-shell"
import { Providers } from "@/components/providers"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: {
    default: "Hemisphere — a personal Hemi-Sync lab",
    template: "%s · Hemisphere",
  },
  description:
    "Learn CIA Gateway / Hemi-Sync style hemisphere synchronization, then practice original binaural sessions in the browser.",
  applicationName: "Hemisphere",
  appleWebApp: {
    capable: true,
    title: "Hemisphere",
    statusBarStyle: "black-translucent",
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
