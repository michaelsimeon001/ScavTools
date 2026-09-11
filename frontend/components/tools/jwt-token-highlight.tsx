"use client"

interface JwtTokenHighlightProps {
  token: string
}

// Renders the raw JWT with each of its three dot-separated segments
// color-coded and labeled, so the header/payload/signature structure
// is visible at a glance even before decoding.
export function JwtTokenHighlight({ token }: JwtTokenHighlightProps) {
  const parts = token.split(".")
  if (parts.length !== 3) return null

  const [header, payload, signature] = parts
  const segments = [
    { label: "Header", value: header, className: "text-rose-500" },
    { label: "Payload", value: payload, className: "text-violet-500" },
    { label: "Signature", value: signature, className: "text-sky-500" },
  ]

  return (
    <div className="space-y-2">
      <p className="break-all font-mono text-xs sm:text-sm">
        {segments.map((segment, i) => (
          <span key={segment.label}>
            <span className={segment.className}>{segment.value}</span>
            {i < segments.length - 1 && <span className="text-muted-foreground">.</span>}
          </span>
        ))}
      </p>
      <div className="flex flex-wrap gap-3 text-xs">
        {segments.map((segment) => (
          <span key={segment.label} className={`font-medium ${segment.className}`}>
            ● {segment.label}
          </span>
        ))}
      </div>
    </div>
  )
}
