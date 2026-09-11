import { test } from "node:test"
import assert from "node:assert/strict"
import { validateStarknetAddress, shortenAddress } from "./starknet-address.ts"

test("accepts a typical address", () => {
  assert.equal(validateStarknetAddress("0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc6"), null)
})

test("accepts the shortest valid address", () => {
  assert.equal(validateStarknetAddress("0x1"), null)
})

test("rejects missing 0x prefix", () => {
  assert.match(validateStarknetAddress("1234")!, /must start with 0x/)
})

test("rejects empty hex part", () => {
  assert.match(validateStarknetAddress("0x")!, /hex digits after 0x/)
})

test("rejects non-hex characters", () => {
  assert.match(validateStarknetAddress("0xzz")!, /only hex characters/)
})

test("rejects addresses longer than 64 hex digits", () => {
  assert.match(validateStarknetAddress("0x" + "f".repeat(65))!, /too long/)
})

test("shortenAddress keeps requested prefix and suffix lengths", () => {
  assert.equal(shortenAddress("0x1234567890abcdef", 6, 4), "0x1234...cdef")
})
