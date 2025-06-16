"use client"

import { motion } from "framer-motion"
import { MapPin, Mail, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="overflow-hidden bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.3 }}
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-3xl font-bold font-mono text-white">A</span>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-3 border-black"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              />
            </motion.div>

            {/* Name and Title */}
            <motion.h1
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Atishay Jain
            </motion.h1>
            <motion.p
              className="text-muted-foreground font-mono mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Software Engineer & AI Researcher
            </motion.p>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 font-mono rounded-full px-4 py-1">
                🚀 Available for opportunities
              </Badge>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              className="space-y-3 mb-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[
                { icon: MapPin, text: "San Jose, CA" },
                { icon: Calendar, text: "CS @ SJSU" },
                { icon: Mail, text: "Open to connect" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-mono">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-sm text-muted-foreground font-mono leading-relaxed text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Building scalable systems and AI solutions. Experience with microservices, ML pipelines, and full-stack
              development.
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
