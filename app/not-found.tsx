import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-[11px] tracking-[0.28em] text-primary uppercase">Missing</p>
      <h1 className="font-heading mt-3 text-4xl tracking-tight">This page is not a Focus level.</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The route does not exist. Back to the lab.
      </p>
      <Button className="mt-6" asChild>
        <Link href="/">Home</Link>
      </Button>
    </div>
  )
}
