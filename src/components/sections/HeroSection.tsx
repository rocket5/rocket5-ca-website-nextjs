"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check } from "lucide-react"
import { urlFor } from "@/app/sanity/client"

interface ClientAvatar {
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    _type: "image";
  } | null
  name?: string
  fallbackInitials: string
}

interface HeroData {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  benefits: string[]
  socialProofText: string
  clientAvatars: ClientAvatar[]
}

interface HeroSectionProps {
  data?: HeroData
  className?: string
}

export function HeroSection({ data, className }: HeroSectionProps) {
  // Handle missing data gracefully
  if (!data) {
    return (
      <section className={`py-12 md:py-16 lg:py-20 ${className || ""}`}>
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground">
              Hero section not configured. Please add hero content in Sanity Studio.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Main Hero Section */}
      <section className={`relative pt-16 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16 ${className || ""}`}>
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Main Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {data.headline}
            </h1>
            
            {/* Subheadline */}
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl lg:mb-12">
              {data.subheadline}
            </p>
            
            {/* CTA Button */}
            <div className="mb-12 lg:mb-16">
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
            
            {/* Social Proof Section */}
            <div className="mx-auto flex max-w-lg flex-col items-center gap-4 sm:flex-row sm:gap-6">
              {/* Client Avatars */}
              <div className="flex -space-x-2 shrink-0 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2">
                {data.clientAvatars.map((avatar, index) => (
                  <Avatar 
                    key={index} 
                    className="h-12 w-12 transition-transform duration-200 hover:scale-110 hover:z-10 md:h-14 md:w-14"
                  >
                    {avatar.image && (
                      <AvatarImage 
                        src={urlFor(avatar.image).width(150).height(150).fit('crop').url()} 
                        alt={avatar.name ? `${avatar.name} testimonial` : "Client testimonial"} 
                      />
                    )}
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm font-semibold">
                      {avatar.fallbackInitials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              
              {/* Social Proof Text */}
              <p className="text-center text-sm text-muted-foreground sm:text-left md:text-base">
                {data.socialProofText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Gray Background */}
      <section className="bg-muted py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {data.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center gap-3 md:justify-start">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-base font-medium text-foreground md:text-lg">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}