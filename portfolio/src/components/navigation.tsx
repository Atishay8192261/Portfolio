// src/components/navigation.tsx

import Link from 'next/link';
import { FileText, Mail, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/contexts/theme-context';

export function Navigation() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`fixed top-0 w-full z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
      isDark ? 'bg-black/50 border-white/10' : 'bg-white/50 border-black/10'
    }`}>
      <div className="max-w-[2560px] mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-xl font-bold">Portfolio</span>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/resume.pdf">
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="mailto:your.email@example.com">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
