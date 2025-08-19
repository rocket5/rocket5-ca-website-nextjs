"use client"

import { Button } from "@/components/ui/button"

export function DraftModeIndicator() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-400 text-black py-3 px-4 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <span className="font-medium text-sm md:text-base">
          🚧 Preview Mode: You're viewing draft content
        </span>
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="bg-white text-black border-black hover:bg-gray-100 text-xs md:text-sm font-medium"
        >
          <a href="/api/disable-draft" className="no-underline">
            Exit Preview
          </a>
        </Button>
      </div>
    </div>
  )
}