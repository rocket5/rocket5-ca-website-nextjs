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
  // Fallback data in case Sanity data isn't available
  const heroData = data || {
    headline: "Stop Losing Customers to Slow, Confusing Websites",
    subheadline: "We build modern, lightning-fast websites that turn visitors into customers.",
    ctaText: "Book A Discovery Call",
    ctaLink: "#contact",
    benefits: [
      "No WordPress headaches",
      "No security nightmares", 
      "Results that grow your business"
    ],
    socialProofText: "Two decades of interactive media expertise, now focused on your business growth",
    clientAvatars: [
      {
        image: null,
        name: "John Doe",
        fallbackInitials: "JD"
      },
      {
        image: null,
        name: "Sarah Miller",
        fallbackInitials: "SM"
      },
      {
        image: null,
        name: "Mike Roberts",
        fallbackInitials: "MR"
      }
    ]
  }

  return (
    <>
      {/* Main Hero Section */}
      <section className={`relative py-16 md:py-24 lg:py-32 ${className || ""}`}>
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Main Headline */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {heroData.headline}
            </h1>
            
            {/* Subheadline */}
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl lg:mb-12">
              {heroData.subheadline}
            </p>
            
            {/* CTA Button */}
            <div className="mb-12 lg:mb-16">
              <Button 
                size="lg" 
                className="h-12 px-8 text-lg font-semibold md:h-14 md:px-12 md:text-xl"
                asChild
              >
                <a 
                  href={heroData.ctaLink}
                  className="no-underline"
                  aria-label={`${heroData.ctaText} - Get started with Rocket 5 Studios`}
                >
                  {heroData.ctaText}
                </a>
              </Button>
            </div>
            
            {/* Social Proof Section */}
            <div className="mx-auto flex max-w-lg flex-col items-center gap-4 sm:flex-row sm:gap-6">
              {/* Client Avatars */}
              <div className="flex -space-x-2 shrink-0">
                {heroData.clientAvatars.map((avatar, index) => (
                  <Avatar key={index} className="h-12 w-12 border-2 border-background ring-2 ring-primary/20 md:h-14 md:w-14">
                    {avatar.image && (
                      <AvatarImage 
                        src={urlFor(avatar.image).width(150).height(150).fit('crop').url()} 
                        alt={avatar.name ? `${avatar.name} testimonial` : "Client testimonial"} 
                      />
                    )}
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {avatar.fallbackInitials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              
              {/* Social Proof Text */}
              <p className="text-center text-sm text-muted-foreground sm:text-left md:text-base">
                {heroData.socialProofText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Gray Background */}
      <section className="bg-muted py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {heroData.benefits.map((benefit, index) => (
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