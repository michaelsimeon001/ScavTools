"use client"

import { useState } from "react"
import { Copy, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyJsonButtonProps {
  value: string
}

// Copies the formatted/minified JSON output and surfaces both success and
// failure feedback, since clipboard writes can be rejected (e.g. insecure
// context or denied permission) and previously failed silently.
export function CopyJsonButton({ value }: CopyJsonButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setState("copied")
    } catch {
      setState("failed")
    } finally {
      setTimeout(() => setState("idle"), 2000)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={copy} className="h-8">
      {state === "copied" && (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied
        </>
      )}
      {state === "failed" && (
        <>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Copy failed
        </>
      )}
      {state === "idle" && (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  )
}
