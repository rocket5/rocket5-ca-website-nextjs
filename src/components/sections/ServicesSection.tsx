"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getIcon } from "@/lib/iconMap"

interface Service {
  title: string
  description: string
  iconName: string
  featured: boolean
}

interface ServicesData {
  sectionTitle: string
  sectionSubtitle: string
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
      <section className={`py-16 md:py-24 lg:py-32 ${className || ""}`}>
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

  // Services are already in correct order from CMS (array order)
  const regularServices = data.services.filter(service => !service.featured)
  const featuredService = data.services.find(service => service.featured)

  return (
    <section className={`py-16 md:py-24 lg:py-32 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {data.sectionTitle}
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              {data.sectionSubtitle}
            </p>
          </div>

          {/* Services Grid */}
          <div className="mb-8 md:mb-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {regularServices.map((service, index) => {
                const IconComponent = getIcon(service.iconName)
                return (
                  <Card 
                    key={`${service.title}-${index}`}
                    className="group relative overflow-hidden border-0 bg-transparent shadow-none transition-all duration-300 hover:bg-card hover:shadow-md hover:-translate-y-1"
                  >
                    <CardContent className="flex flex-col items-center text-center p-6 md:p-8">
                      {/* Icon */}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <IconComponent 
                          className="h-6 w-6 text-primary transition-transform duration-300" 
                          aria-hidden="true"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-foreground md:text-lg group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed md:text-base">
                          {service.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Featured Service */}
          {featuredService && (
            <div className="mx-auto max-w-4xl">
              <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:gap-8">
                    {/* Icon */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110 lg:mb-0 lg:shrink-0">
                      {(() => {
                        const FeaturedIconComponent = getIcon(featuredService.iconName)
                        return <FeaturedIconComponent 
                          className="h-8 w-8 text-primary transition-transform duration-300" 
                          aria-hidden="true"
                        />
                      })()}
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3 lg:space-y-4">
                      <CardTitle className="text-xl md:text-2xl lg:text-3xl group-hover:text-primary transition-colors duration-300">
                        {featuredService.title}
                      </CardTitle>
                      <CardDescription className="text-base md:text-lg leading-relaxed">
                        {featuredService.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}