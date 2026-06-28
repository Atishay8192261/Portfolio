"use client"

import { useEffect } from "react"

/** A styled greeting for anyone who opens DevTools. Only the curious find it. */
export function EasterEggs() {
  useEffect(() => {
    console.log(
      "%c△ti⌗hay %c— you opened the console. fellow tinkerer? 👀",
      "color:#bd03f7;font-weight:700;font-size:14px",
      "color:#9ca3af;font-size:13px",
    )
    console.log("%clet's build something → atishayjain@atie.dev", "color:#6d5efc")
  }, [])
  return null
}
