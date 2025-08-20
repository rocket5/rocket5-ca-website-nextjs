"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Service {
  title: string
  description: string
  featured: boolean
}

interface ServicesData {
  badge?: string
  title?: string
  highlightedWord?: string
  ctaText?: string
  ctaLink?: string
  subtitle?: string
  services: Service[]
}

interface ServicesSectionProps {
  data: ServicesData
  className?: string
}

export function ServicesSection({ data, className }: ServicesSectionProps) {
  // Handle missing data gracefully
  if (!data || !data.services || data.services.length === 0) {
    return (
      <section className={`py-12 md:py-16 lg:py-20 ${className || ""}`}>
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground">
              Services section not configured. Please add services content in Sanity Studio.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Limit to 3 services maximum and separate regular vs featured
  const limitedServices = data.services.slice(0, 3)
  const regularServices = limitedServices.filter(service => !service.featured)
  const featuredService = limitedServices.find(service => service.featured)

  // Split title to highlight specific word
  const titleParts = data.title ? data.title.split(data.highlightedWord || '') : ['']
  const hasHighlight = titleParts.length === 2 && data.highlightedWord

  return (
    <section className={`py-12 md:py-16 lg:py-20 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
            {/* Badge */}
            {data.badge && (
              <div className="mb-6">
                <Badge 
                  variant="secondary" 
                  className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-full"
                >
                  {data.badge}
                </Badge>
              </div>
            )}

            {/* Main Title with Highlight */}
            {data.title && (
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {hasHighlight ? (
                  <>
                    {titleParts[0]}
                    <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {data.highlightedWord}
                    </span>
                    {titleParts[1]}
                  </>
                ) : (
                  data.title
                )}
              </h2>
            )}

            {/* CTA Button */}
            {data.ctaText && data.ctaLink && (
              <div className="mb-8">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  onClick={() => window.open(data.ctaLink, '_self')}
                >
                  {data.ctaText}
                </Button>
              </div>
            )}

            {/* Subtitle */}
            {data.subtitle && (
              <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
                {data.subtitle}
              </p>
            )}
          </div>

          {/* Services Grid - Wireframe Layout: Featured left, Regular stacked right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Featured Service - Left Side (40% width - 2/5) */}
            {featuredService && (
              <div className="lg:col-span-2">
                <Card className="h-full group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-0">
                  <div className="p-4">
                    <div className="space-y-3">
                      <h3 className="text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {featuredService.title}
                      </h3>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        {featuredService.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Regular Services - Right Side (60% width - 3/5, stacked vertically) */}
            {regularServices.length > 0 && (
              <div className={`space-y-6 ${!featuredService ? 'lg:col-span-5' : 'lg:col-span-3'}`}>
                {regularServices.slice(0, 2).map((service, index) => (
                  <Card 
                    key={`${service.title}-${index}`}
                    className="group relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-0"
                  >
                    <div className="p-4">
                      <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}