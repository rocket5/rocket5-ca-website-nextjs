"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">
            Rocket 5
          </h1>
        </div>

        {/* Right side navigation - CTA Button and Theme Toggle */}
        <div className="flex items-center gap-4">
          <Button 
            size="lg"
            className="font-semibold"
            asChild
          >
            <a 
              href="#contact" 
              className="no-underline"
              aria-label="Book a discovery call with Rocket 5 Studios"
            >
              Book A Discovery Call
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}