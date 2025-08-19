"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Zap, 
  TrendingUp, 
  Target, 
  Shield, 
  BarChart3, 
  Settings, 
  Award 
} from "lucide-react"

interface Service {
  id: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  featured?: boolean
}

interface ServicesSectionProps {
  className?: string
}

export function ServicesSection({ className }: ServicesSectionProps) {
  const services: Service[] = [
    {
      id: "fast-websites",
      icon: Zap,
      title: "Lightning-Fast Websites That Convert",
      description: "Built with Next.js + Sanity CMS - 3x faster than WordPress, bulletproof security, and content management that actually makes sense. No more plugin nightmares or security headaches. While competitors still use outdated WordPress, we build with the same modern technology powering Netflix and Nike."
    },
    {
      id: "seo-visibility", 
      icon: TrendingUp,
      title: "Get Found by Your Ideal Customers",
      description: "SEO-optimized from day one - your website is visible where your customers search. We help you rank higher for the searches that matter to your business. Specialized in helping Canadian businesses grow their local markets while scaling nationally."
    },
    {
      id: "conversion-optimization",
      icon: Target,
      title: "Turn Visitors Into Paying Customers", 
      description: "Strategic design and clear calls-to-action that guide visitors toward becoming clients. Every element designed to drive the actions that grow your business."
    },
    {
      id: "monthly-maintenance",
      icon: Shield,
      title: "Monthly Maintenance You Can Trust",
      description: "Updates, backups, security monitoring, performance optimization, and content updates. Sleep soundly knowing your website is in expert hands. No more WordPress security nightmares or plugin conflicts. Our modern architecture eliminates the vulnerabilities that plague traditional sites."
    },
    {
      id: "analytics-insights",
      icon: BarChart3,
      title: "Know How Your Website Performs",
      description: "Clear monthly reports showing visitor behaviour, conversion rates, and ROI. No confusing data - just actionable insights that help you make smart business decisions. Track real business impact, not just website stats. See exactly how your investment drives revenue growth."
    },
    {
      id: "complete-setup",
      icon: Settings,
      title: "Everything Set Up Right From Day One",
      description: "Domain registration and management, premium hosting setup, professional email configuration, SSL certificates, and backup systems. The technical stuff handled so you can focus on your business."
    },
    {
      id: "professional-brand",
      icon: Award,
      title: "Professional Brand Presence",
      description: "Modern design that builds instant trust and credibility with your ideal customers. While competitors rely on generic templates, your custom website reflects the true quality of your business. Every visual element strategically crafted to position you as the premium choice in your market, making potential customers choose you before they even read your content.",
      featured: true
    }
  ]

  const regularServices = services.filter(service => !service.featured)
  const featuredService = services.find(service => service.featured)

  return (
    <section className={`py-16 md:py-24 lg:py-32 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Everything You Need to Grow Online
            </h2>
            <p className="text-lg text-muted-foreground md:text-xl">
              Complete website solutions that drive real business growth
            </p>
          </div>

          {/* Services Grid */}
          <div className="mb-8 md:mb-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {regularServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <Card 
                    key={service.id}
                    className="group relative overflow-hidden border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <CardContent className="p-6 md:p-8">
                      {/* Icon */}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent 
                          className="h-6 w-6 text-primary" 
                          aria-hidden="true"
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-card-foreground md:text-xl">
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
              <Card className="group relative overflow-hidden border-border bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col items-center text-center lg:flex-row lg:text-left lg:gap-8">
                    {/* Icon */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300 lg:mb-0 lg:shrink-0">
                      <featuredService.icon 
                        className="h-8 w-8 text-primary" 
                        aria-hidden="true"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-3 lg:space-y-4">
                      <h3 className="text-xl font-bold text-card-foreground md:text-2xl lg:text-3xl">
                        {featuredService.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
                        {featuredService.description}
                      </p>
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