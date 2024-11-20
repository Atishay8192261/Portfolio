'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Profile() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Avatar className="w-32 h-32 rounded-full">
        <AvatarImage src="/profile.jpg" alt="Profile" />
        <AvatarFallback>ME</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-4xl font-bold mb-2">Atishay Jain</h1>
        <p className="text-xl text-muted-foreground">
          Eat | Sleep | Code | Repeat Sharing my journey as a developer.
        </p>
      </div>
    </div>
  )
}