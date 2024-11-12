'use client'

import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Removed AvatarImage
import { useTheme } from '@/contexts/theme-context';

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02,
    y: -5,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export function Profile() {
  const { isDark } = useTheme();

  return (
    <div className="space-y-8">
      <motion.div 
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        className="space-y-6"
      >
        {/* Profile Picture */}
        <Avatar
          src="/images/profile.jpg" // Pass the path to your profile picture here
          className="w-24 h-24"
        >
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
      >
        <Card className={`backdrop-blur-sm transition-all duration-300 ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}
        style={{
          boxShadow: `0 0 15px ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        }}>
          <CardContent className="p-4">
            <h1 className="text-xl font-bold mb-2">Atishay Jain</h1>
            <p className="text-sm text-muted-foreground">
              I’m Atishay Jain, a curious and driven Computer Science student at San Jose State University, always exploring new ways to create impact through tech. With a background in software development, research, and teaching, I’m passionate about combining skills and creativity to solve meaningful problems. Beyond the code, I’m all about learning, growth, and connecting with ideas that make a difference.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
