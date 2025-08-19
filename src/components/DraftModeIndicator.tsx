"use client"

import { Button } from "@/components/ui/button"

export function DraftModeIndicator() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-black text-center py-2 px-4 z-50">
      <div className="flex items-center justify-center gap-4">
        <span className="font-medium">🚧 Preview Mode: You're viewing draft content</span>
        <Button 
          variant="outline" 
          size="sm"
          asChild
          className="bg-white text-black border-black hover:bg-gray-100"
        >
          <a href="/api/disable-draft">Exit Preview</a>
        </Button>
      </div>
    </div>
  )
}