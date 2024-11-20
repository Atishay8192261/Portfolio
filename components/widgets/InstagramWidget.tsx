'use client'

import { Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { motion } from 'framer-motion'

interface InstagramWidgetProps {
  isDark: boolean
}

export function InstagramWidget({ isDark }: InstagramWidgetProps) {
  return (
    <Card className={`backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Instagram className="w-5 h-5" />
            <span className="font-medium">Instagram</span>
          </div>
          <Button variant="secondary" size="sm" className="rounded-full">
            Follow
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Image
                src={`/placeholder.svg?text=Post${i}`}
                alt={`Instagram Post ${i}`}
                width={150}
                height={150}
                className="rounded-md aspect-square object-cover"
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}