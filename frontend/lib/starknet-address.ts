// StarkNet addresses are 0x-prefixed hex felts: up to 64 hex digits (252 bits),
// and unlike Ethereum addresses they are not required to be exactly 40 digits
// or zero-padded to a fixed width.
export function validateStarknetAddress(value: string): string | null {
  if (!value.startsWith("0x")) {
    return "Address must start with 0x"
  }
  const hexPart = value.slice(2)
  if (hexPart.length === 0) {
    return "Address must contain hex digits after 0x"
  }
  if (!/^[a-fA-F0-9]+$/.test(hexPart)) {
    return "Address must contain only hex characters (0-9, a-f)"
  }
  if (hexPart.length > 64) {
    return "Address is too long for a StarkNet felt (max 64 hex digits)"
  }
  return null
}

export function shortenAddress(address: string, prefixLength: number, suffixLength: number): string {
  return `${address.substring(0, prefixLength)}...${address.substring(address.length - suffixLength)}`
}
