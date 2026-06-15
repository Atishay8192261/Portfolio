"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

interface GlassContextValue {
  /** 0–100 master "liquid glass" intensity */
  level: number
  setLevel: (v: number) => void
  /** derived SVG feDisplacementMap scale (refraction) */
  refraction: number
}

const GlassContext = createContext<GlassContextValue>({
  level: 55,
  setLevel: () => {},
  refraction: 33,
})

export const useGlass = () => useContext(GlassContext)

const STORAGE_KEY = "glassLevel"

function applyLevel(level: number) {
  const blur = 4 + (level / 100) * 14 // 4px → 18px
  document.documentElement.style.setProperty("--glass-blur", `${blur.toFixed(1)}px`)
}

export function GlassProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevelState] = useState(55)

  // Enable real SVG lensing only on Chromium (Safari/Firefox keep clean frosted glass)
  useEffect(() => {
    const isChromium = typeof window !== "undefined" && "chrome" in window
    if (isChromium) document.documentElement.dataset.glass = "on"

    const stored = Number(localStorage.getItem(STORAGE_KEY))
    const initial = Number.isFinite(stored) && stored > 0 ? stored : 55
    setLevelState(initial)
    applyLevel(initial)
  }, [])

  const setLevel = useCallback((v: number) => {
    setLevelState(v)
    applyLevel(v)
    localStorage.setItem(STORAGE_KEY, String(v))
  }, [])

  const refraction = (level / 100) * 60 // 0 → 60

  return (
    <GlassContext.Provider value={{ level, setLevel, refraction }}>
      {children}
    </GlassContext.Provider>
  )
}
