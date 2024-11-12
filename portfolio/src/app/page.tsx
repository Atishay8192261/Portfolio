'use client'

import { ThemeProvider } from '@/contexts/theme-context'
import { Navigation } from '@/components/navigation'
import { Profile } from '@/components/profile'
import { ExperienceTimeline } from '@/components/experience-timeline'
import { SocialCards } from '@/components/social-cards'

export default function Page() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300">
        <Navigation />
        <main className="max-w-[2560px] mx-auto px-4 pt-20">
          <div className="grid grid-cols-[350px_1fr] gap-8">
            <div className="space-y-8">
              <Profile />
              <ExperienceTimeline />
            </div>
            <SocialCards />
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}