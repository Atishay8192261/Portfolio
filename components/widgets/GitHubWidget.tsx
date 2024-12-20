'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchGitHubContributions } from '@/lib/githubApi';

interface GitHubWidgetProps {
  isDark: boolean;
}

function getTileColor(count: number, isDark: boolean): string {
  if (isDark) {
    if (count === 0) return 'bg-[#161b22]';
    if (count <= 9) return 'bg-[#0e4429]';
    if (count <= 19) return 'bg-[#006d32]';
    if (count <= 29) return 'bg-[#26a641]';
    return 'bg-[#39d353]';
  } else {
    if (count === 0) return 'bg-[#ebedf0]';
    if (count <= 9) return 'bg-[#9be9a8]';
    if (count <= 19) return 'bg-[#40c463]';
    if (count <= 29) return 'bg-[#30a14e]';
    return 'bg-[#216e39]';
  }
}

export function GitHubWidget({ isDark }: GitHubWidgetProps) {
  const [githubData, setGithubData] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContributions = async () => {
      try {
        const contributions = await fetchGitHubContributions();
        setGithubData(contributions);
      } catch (err: any) {
        console.error("Error fetching GitHub contributions:", err);
        setError(err.message);
      }
    };

    loadContributions();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Calculate the number of weeks to display (last 52 weeks)
  const numberOfWeeks = 52;
  const recentData = githubData?.slice(-numberOfWeeks * 7) || [];
  const weeks = Array.from({ length: numberOfWeeks }, (_, weekIndex) => {
    return recentData.slice(weekIndex * 7, (weekIndex + 1) * 7);
  });

  return (
    <Card className={`overflow-hidden backdrop-blur-sm transition-colors duration-300 rounded-3xl ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            <span className="font-medium">GitHub</span>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-full"
            asChild
          >
            <a 
              href="https://github.com/Atishay8192261" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Follow
            </a>
          </Button>
        </div>
        <div className="flex justify-start w-full">
          <div className="grid grid-flow-col gap-[2px] auto-cols-min overflow-x-auto py-2 px-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((count: number, dayIndex: number) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                    className={`w-3 h-3 rounded-sm ${getTileColor(count, isDark)}`}
                    title={`${count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 9, 19, 29, 39].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getTileColor(level, isDark)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}