'use client'

import { Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LinkedInWidgetProps {
  isDark: boolean
}

export function LinkedInWidget({ isDark }: LinkedInWidgetProps) {
  return (
    <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-[#0077B5]" />
            <span className="font-medium">LinkedIn</span>
          </div>
          <Button variant="secondary" size="sm" className="rounded-full">
            Connect
          </Button>
        </div>
        <p className="text-sm mt-4">View my professional profile</p>
      </CardContent>
    </Card>
  )
}