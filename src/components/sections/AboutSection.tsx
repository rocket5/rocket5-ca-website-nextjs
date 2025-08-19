"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { urlFor } from "@/app/sanity/client"

interface ClientLogo {
  logo: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
      };
    };
    crop?: {
      _type: string;
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    hotspot?: {
      _type: string;
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
  } | null
  clientName: string
  logoAlt: string
  websiteUrl?: string
  displayOrder?: number
  featured?: boolean
}

interface AboutData {
  rightSideContent?: {
    title: string
    subtitle: string
    mainContent: string
  }
  leftSideContent?: {
    profileImage: {
      asset: {
        _id: string;
        url: string;
        metadata?: {
          dimensions?: {
            width: number;
            height: number;
          };
        };
      };
      crop?: {
        _type: string;
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
      };
      hotspot?: {
        _type: string;
        x?: number;
        y?: number;
        height?: number;
        width?: number;
      };
    } | null
    profileImageAlt: string
    profileName: string
    profileTitle?: string
  }
  centerContent?: {
    centeredParagraph: string
  }
  clientLogosSection?: {
    sectionTitle: string
    clientLogos: ClientLogo[]
    gridLayout?: {
      columns: number
      rows: number
    }
  }
}

interface AboutSectionProps {
  data?: AboutData
  className?: string
}

export function AboutSection({ data, className }: AboutSectionProps) {
  // Handle missing data gracefully
  if (!data) {
    return (
      <section className={`py-12 md:py-16 lg:py-20 ${className || ""}`}>
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground">
              About section not configured. Please add about content in Sanity Studio.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const { rightSideContent, leftSideContent, centerContent, clientLogosSection } = data;

  return (
    <section className={`pt-8 pb-16 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24 ${className || ""}`}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          {rightSideContent && (
            <div className="mx-auto max-w-3xl text-center mb-12 lg:mb-16">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {rightSideContent.title}
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                {rightSideContent.subtitle}
              </p>
            </div>
          )}

          {/* Two-column layout: Profile image and content */}
          {(leftSideContent || rightSideContent) && (
            <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-2 lg:gap-16 lg:mb-20">
              {/* Left column: Profile image */}
              {leftSideContent && (
                <div className="flex justify-center lg:justify-start">
                  <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-full lg:h-auto lg:aspect-square max-w-lg">
                    {leftSideContent.profileImage ? (
                      <Image
                        src={urlFor(leftSideContent.profileImage).width(600).height(600).fit('crop').url()}
                        alt={leftSideContent.profileImageAlt || `${leftSideContent.profileName}${leftSideContent.profileTitle ? ` - ${leftSideContent.profileTitle}` : ''}`}
                        fill
                        className="object-cover rounded-2xl shadow-lg"
                        sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 512px"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-2xl flex items-center justify-center">
                        <p className="text-muted-foreground text-center">
                          Profile image not available
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Right column: Main content */}
              {rightSideContent && (
                <div className="flex flex-col justify-center space-y-6">
                  <div className="prose prose-gray max-w-none text-foreground">
                    <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                      {rightSideContent.mainContent}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full-width centered section: Company approach */}
          {centerContent?.centeredParagraph && (
            <Card className="mb-16 lg:mb-20 bg-muted/50 border-0 shadow-none">
              <CardContent className="py-12 px-6 md:py-16 md:px-12">
                <div className="mx-auto max-w-4xl text-center">
                  <div className="prose prose-gray prose-lg max-w-none text-foreground">
                    <p className="text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                      {centerContent.centeredParagraph}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Client logos section */}
          {clientLogosSection?.clientLogos && clientLogosSection.clientLogos.length > 0 && (
            <div className="text-center">
              <h3 className="mb-8 text-xl font-semibold text-foreground md:text-2xl lg:mb-12">
                {clientLogosSection.sectionTitle}
              </h3>
              
              <div className={`grid gap-8 items-center justify-items-center ${
                clientLogosSection.gridLayout?.columns 
                  ? `grid-cols-${Math.min(clientLogosSection.gridLayout.columns, 6)}` 
                  : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
              }`}>
                {clientLogosSection.clientLogos.map((logo, index) => (
                  <div 
                    key={`client-${index}`}
                    className="flex items-center justify-center w-24 h-16 md:w-32 md:h-20 lg:w-36 lg:h-24"
                  >
                    {logo.logo ? (
                      <div className="relative w-full h-full opacity-60 hover:opacity-80 transition-opacity duration-200">
                        <Image
                          src={urlFor(logo.logo).width(200).height(120).fit('crop').url()}
                          alt={logo.logoAlt || `${logo.clientName} logo`}
                          fill
                          className="object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                          sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 144px"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-muted rounded-lg">
                        <span className="text-xs text-muted-foreground font-medium text-center px-2">
                          {logo.clientName}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}