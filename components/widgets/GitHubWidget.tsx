'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchGitHubContributions } from '@/lib/githubApi'; // Updated API

interface GitHubWidgetProps {
  isDark: boolean;
}

function getTileColor(count: number, isDark: boolean): string {
  if (count === 0) return isDark ? 'bg-gray-700' : 'bg-gray-200';
  if (count === 1) return isDark ? 'bg-green-900' : 'bg-green-100';
  if (count === 2) return isDark ? 'bg-green-700' : 'bg-green-300';
  if (count === 3) return isDark ? 'bg-green-500' : 'bg-green-500';
  return isDark ? 'bg-green-300' : 'bg-green-700';
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
        {/* Updated Grid */}
        <div className="grid grid-rows-7 grid-flow-col gap-1 p-2 overflow-hidden">
          {githubData?.map((count: number, i: number) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`w-3 h-3 rounded-sm ${getTileColor(count, isDark)}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
