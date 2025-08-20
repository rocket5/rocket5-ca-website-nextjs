"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface JourneyStep {
  stepNumber: string
  title: string
  description: string
}

interface JourneyData {
  badge: string
  title: string
  highlightedWord: string
  subtitle: string
  steps: JourneyStep[]
}

interface JourneySectionProps {
  data: JourneyData
  className?: string
}

export function JourneySection({ data, className }: JourneySectionProps) {
  // Handle missing data gracefully
  if (!data || !data.steps || data.steps.length === 0) {
    return (
      <section className={`py-12 md:py-16 lg:py-20 ${className || ""}`}>
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-muted-foreground">
              Journey section not configured. Please add journey content in Sanity Studio.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Split title to highlight specific word
  const titleParts = data.title.split(data.highlightedWord)
  const hasHighlight = titleParts.length === 2

  return (
    <section className={`py-12 md:py-16 lg:py-20 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
            {/* Badge */}
            <div className="mb-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 rounded-full"
              >
                {data.badge}
              </Badge>
            </div>

            {/* Main Title with Highlight */}
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
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

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          </div>

          {/* Journey Steps Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {data.steps.map((step, index) => (
              <Card 
                key={`${step.stepNumber}-${index}`}
                className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/20"
              >
                <CardContent className="p-6 md:p-8">
                  {/* Step Number */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                      <span className="text-lg font-bold text-primary">
                        {step.stepNumber}
                      </span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardContent>

                {/* Hover Effect Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}