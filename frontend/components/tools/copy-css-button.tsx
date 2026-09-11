"use client"

import { useState } from "react"
import { Copy, Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyCssButtonProps {
  css: string
  className?: string
}

// Copies the generated CSS declaration and gives a visible confirmation,
// handling clipboard rejections gracefully instead of failing silently.
export function CopyCssButton({ css, className }: CopyCssButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle")

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(css)
      setState("copied")
    } catch {
      setState("failed")
    } finally {
      setTimeout(() => setState("idle"), 2000)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={copy} title="Copy CSS" className={className}>
      {state === "copied" && <Check className="h-4 w-4" />}
      {state === "failed" && <AlertTriangle className="h-4 w-4" />}
      {state === "idle" && <Copy className="h-4 w-4" />}
      <span className="sr-only">
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy to clipboard"}
      </span>
    </Button>
  )
}
