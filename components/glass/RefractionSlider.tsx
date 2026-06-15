"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Droplet } from "lucide-react"
import { useGlass } from "./GlassProvider"

/**
 * Bottom-right floating control that lets visitors dial the Liquid Glass
 * intensity (blur + refraction) up or down. Persisted via GlassProvider.
 */
export function RefractionSlider() {
  const { level, setLevel } = useGlass()
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-[60]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div
        className="glass glass-chrome flex items-center gap-3 rounded-full px-4 py-2.5"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Droplet className="h-4 w-4 shrink-0 text-foreground/70" />
        <motion.div
          className="flex items-center gap-3 overflow-hidden"
          animate={{ width: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          initial={false}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="whitespace-nowrap text-xs font-medium text-foreground/60">
            Liquid&nbsp;Glass
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            aria-label="Liquid Glass intensity"
            className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-foreground/20 accent-foreground
                       [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
