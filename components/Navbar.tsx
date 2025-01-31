"use client";

import Link from "next/link";
import { Sun, Moon, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import "../styles/responsive.css"; // Import the CSS file

interface NavbarProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export function Navbar({ isDark, setIsDark }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Title - Adjusted for Better Positioning */}
        <span className="navbar-title">Atie&apos;s Den</span>

        {/* Icons stay visible on all screen sizes */}
        <div className="navbar-icons">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className="theme-toggle"
          >
            {isDark ? <Sun className="icon" /> : <Moon className="icon" />}
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://drive.google.com/file/d/1cMpE5ky0ZdkzNSu-DtmO-ieXWSDVfHeh/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="icon" />
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="mailto:atishayjain8192261@gmail.com">
              <Mail className="icon" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
