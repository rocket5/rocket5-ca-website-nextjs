"use client"

import { Button } from "@/components/ui/button"

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

        {/* CTA Button */}
        <div className="flex items-center">
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
        </div>
      </div>
    </header>
  )
}