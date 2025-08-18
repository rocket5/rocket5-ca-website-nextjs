"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check } from "lucide-react"

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  const benefits = [
    "No WordPress headaches",
    "No security nightmares", 
    "Results that grow your business"
  ]

  return (
    <section className={`relative py-16 md:py-24 lg:py-32 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Stop Losing Customers to Slow, Confusing Websites
          </h1>
          
          {/* Subheadline */}
          <p className="mb-8 text-xl text-muted-foreground md:text-2xl lg:mb-12">
            We build modern, lightning-fast websites that turn visitors into customers.
          </p>
          
          {/* CTA Button */}
          <div className="mb-12 lg:mb-16">
            <Button 
              size="lg" 
              className="h-12 px-8 text-lg font-semibold md:h-14 md:px-12 md:text-xl"
              asChild
            >
              <a 
                href="#contact"
                className="no-underline"
                aria-label="Book a discovery call to get started with Rocket 5 Studios"
              >
                Book A Discovery Call
              </a>
            </Button>
          </div>
          
          {/* Social Proof Section */}
          <div className="mb-12 flex flex-col items-center gap-6 lg:mb-16">
            {/* Client Avatars */}
            <div className="flex -space-x-2">
              <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/20 md:h-16 md:w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Client testimonial" />
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/20 md:h-16 md:w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b1e9?w=150&h=150&fit=crop&crop=face" alt="Client testimonial" />
                <AvatarFallback className="bg-primary text-primary-foreground">SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/20 md:h-16 md:w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Client testimonial" />
                <AvatarFallback className="bg-primary text-primary-foreground">MR</AvatarFallback>
              </Avatar>
            </div>
            
            {/* Social Proof Text */}
            <p className="text-sm text-muted-foreground md:text-base">
              Two decades of interactive media expertise, now focused on your business growth
            </p>
          </div>
          
          {/* Benefits List */}
          <div className="mx-auto max-w-md">
            <ul className="space-y-4 text-left">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}