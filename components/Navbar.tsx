"use client";

import Link from "next/link";
import { Sun, Moon, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export function Navbar({ isDark, setIsDark }: NavbarProps) {
  return (
    <nav
      className={`fixed top-0 w-full z-40 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDark ? "bg-black/50 border-white/10" : "bg-white/50 border-black/10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-xl font-bold">Portfolio</span>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="rounded-full"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://drive.google.com/file/d/1cMpE5ky0ZdkzNSu-DtmO-ieXWSDVfHeh/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Resume
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="mailto:smartatishay09@gmail.com">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
