"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavbarProps {
  isDark: boolean
  setIsDark: (isDark: boolean) => void
}

export function Navbar({ isDark, setIsDark }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Architecture", href: "/architecture" },
    { name: "Resume", href: "https://www.overleaf.com/read/psjcgjsythmg#d48c3e", external: true },
    { name: "Mail", href: "mailto:atishayjain8192261@gmail.com", external: true },
  ]

  const isActive = (href: string) => {
    if (pathname && href === "/") return pathname === "/"
    return pathname && pathname.startsWith(href)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isDark ? "bg-black/80 border-white/10" : "bg-white/80 border-black/10"
      } backdrop-blur-md border-b`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-xl font-bold font-mono bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              atie.dev
            </motion.div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
              {navItems.map((item, index) =>
                item.external ? (
                  <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      className="px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 text-muted-foreground hover:text-white hover:bg-white/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.div>
                  </a>
                ) : (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      className={`relative px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 ${
                        isActive(item.href)
                          ? "text-white bg-white/20"
                          : "text-muted-foreground hover:text-white hover:bg-white/10"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.name}
                      {isActive(item.href) && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-white/10"
                          layoutId="activeTab"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <motion.div initial={false} animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.3 }}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div initial={false} animate={{ rotate: isMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) =>
                item.external ? (
                  <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      className="block px-4 py-2 rounded-lg text-sm font-mono transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.div>
                  </a>
                ) : (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      className={`block px-4 py-2 rounded-lg text-sm font-mono transition-colors ${
                        isActive(item.href)
                          ? "text-white bg-white/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
