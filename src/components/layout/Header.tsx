"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navigationItems = [
  { label: "Journey", href: "#journey" },
  { label: "Benefits", href: "#benefits" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Privacy", href: "#privacy" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">
            rocket 5
          </h1>
        </div>

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 py-1"
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side - CTA Button */}
        <div className="flex items-center gap-4">
          <Button 
            size="lg"
            className="font-semibold hidden sm:inline-flex"
            asChild
          >
            <a 
              href="#contact" 
              className="no-underline"
              aria-label="Book a discovery call with Rocket 5"
            >
              Book A Discovery Call
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
                <div className="px-2 py-4">
                  <h2 className="text-lg font-semibold text-primary mb-6">
                    rocket 5
                  </h2>
                  <div className="flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-foreground/80 hover:text-foreground transition-colors py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2"
                        aria-label={`Navigate to ${item.label} section`}
                      >
                        {item.label}
                      </a>
                    ))}
                    <div className="pt-4">
                      <Button 
                        size="lg"
                        className="w-full font-semibold"
                        asChild
                      >
                        <a 
                          href="#contact" 
                          className="no-underline"
                          aria-label="Book a discovery call with Rocket 5"
                        >
                          Book A Discovery Call
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}