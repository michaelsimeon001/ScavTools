"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyHashButtonProps {
  hash: string
}

// Copies a single hash value and shows a brief success confirmation,
// since the previous copy button gave no feedback that the click worked.
export function CopyHashButton({ hash }: CopyHashButtonProps) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={copy}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">{copied ? "Copied" : "Copy to clipboard"}</span>
    </Button>
  )
}
