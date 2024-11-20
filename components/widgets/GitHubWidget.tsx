'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface GitHubWidgetProps {
  isDark: boolean
}

export function GitHubWidget({ isDark }: GitHubWidgetProps) {
  const [githubData, setGithubData] = useState<{contributions: number[]} | null>(null)

  useEffect(() => {
    setGithubData({
      contributions: Array(52).fill(null).map(() => Math.floor(Math.random() * 5))
    })
  }, [])

  return (
    <Card className={`overflow-hidden backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            <span className="font-medium">GitHub</span>
          </div>
          <Button variant="secondary" size="sm" className="rounded-full">
            Follow
          </Button>
        </div>
        <div className="grid grid-cols-52 gap-1">
          {githubData?.contributions.map((count: number, i: number) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`w-2 h-2 rounded-sm ${
                count === 0 ? 'bg-white/10' :
                count === 1 ? 'bg-green-900' :
                count === 2 ? 'bg-green-700' :
                count === 3 ? 'bg-green-500' :
                'bg-green-300'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}