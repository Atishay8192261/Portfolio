'use client';

import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface InstagramWidgetProps {
  isDark: boolean;
}

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
}

export function InstagramWidget({ isDark }: InstagramWidgetProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch('/api/instagram');
        const data = await response.json();
        console.log('Fetched Instagram Posts:', data.posts); // Debugging
        setPosts(data.posts.slice(0, 4)); // Limit to 4 posts
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

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
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full"
            onClick={() => window.open('https://instagram.com/your_username', '_blank')}
          >
            Follow
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="rounded-md aspect-square bg-gray-200 animate-pulse" />
              </motion.div>
            ))
          ) : (
            posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={post.media_url}
                    alt={`Instagram Post ${i + 1}`}
                    width={150}
                    height={150}
                    className="rounded-md aspect-square object-cover"
                  />
                </a>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
