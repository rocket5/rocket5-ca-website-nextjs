"use client"

import { Button } from "@/components/ui/button"

interface HeroData {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
}

interface HeroSectionProps {
  data?: HeroData
  className?: string
}

export function HeroSection({ data, className }: HeroSectionProps) {
  // Handle missing data gracefully
  if (!data) {
    return (
      <section className={`py-20 md:py-24 lg:py-32 ${className || ""}`}>
        <div className="container px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground">
              Hero section not configured. Please add hero content in Sanity Studio.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={`relative py-20 md:py-24 lg:py-32 xl:py-40 ${className || ""}`}>
      <div className="container px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {data.headline}
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            {data.subheadline}
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              size="lg" 
              className="h-12 px-8 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg md:h-14 md:px-12 md:text-xl"
              asChild
            >
              <a 
                href={data.ctaLink}
                className="no-underline"
                aria-label={`${data.ctaText} - Get started with Rocket 5 Studios`}
              >
                {data.ctaText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}