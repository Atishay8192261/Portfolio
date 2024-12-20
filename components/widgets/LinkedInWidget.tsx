'use client'

import { Linkedin, MapPin, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LinkedInWidgetProps {
  isDark: boolean
}

export function LinkedInWidget({ isDark }: LinkedInWidgetProps) {
  return (
    <Card className={`backdrop-blur-sm h-full transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
            <span className="font-medium text-sm">LinkedIn</span>
          </div>
          <Button variant="secondary" size="sm" className="rounded-full text-xs py-1 px-2 h-auto" asChild>
            <a href="https://www.linkedin.com/in/atishayjain19" target="_blank" rel="noopener noreferrer">
              Connect
            </a>
          </Button>
        </div>
        <div className="space-y-2">
          <div>
            <h3 className="text-sm font-semibold">Atishay Jain</h3>
            <p className="text-xs text-muted-foreground">Lab Instructor @ SJSU</p>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="rounded-full text-[10px] py-0 px-2">Software Engineering</Badge>
            <Badge variant="secondary" className="rounded-full text-[10px] py-0 px-2">GenAI</Badge>
            <Badge variant="secondary" className="rounded-full text-[10px] py-0 px-2">Cloud</Badge>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>San Jose, CA</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>500+ connections</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}