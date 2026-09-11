const BASE64_PATTERN = /^[A-Za-z0-9+/]*={0,2}$/

// Gives a specific reason a Base64 string can't be decoded, rather than a
// generic "invalid input" message, so the user knows what to fix.
export function validateBase64(value: string): string | null {
  if (value.length === 0) {
    return "Enter some Base64 text to decode."
  }
  if (!BASE64_PATTERN.test(value)) {
    return "Input contains characters outside the Base64 alphabet (A-Z, a-z, 0-9, +, /, = padding)."
  }
  const unpadded = value.replace(/=+$/, "")
  if (unpadded.length % 4 === 1) {
    return "Base64 input has an invalid length (not a multiple of 4 characters)."
  }
  return null
}
