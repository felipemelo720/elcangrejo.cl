"use client"

import { useEffect } from "react"

export default function PageTracker() {
  useEffect(() => {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "page_visit" }),
    })
  }, [])
  return null
}
