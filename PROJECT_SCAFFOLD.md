# Rocket 5 Studios Web Development Scaffold

## Overview

This document describes the complete scaffolded web development framework used for Rocket 5 Studios website projects. This setup combines Next.js 15, shadcn/ui components, and Sanity CMS to create a modern, scalable, and maintainable web development stack.

## Project Structure

```
rocket5-ca-website-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [slug]/            # Dynamic post pages
│   │   ├── sanity/            # Sanity client configuration
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage (replace with actual content)
│   │   └── globals.css        # Global styles + shadcn/ui variables
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       └── utils.ts           # Utility functions (cn helper)
├── tailwind.config.ts         # Tailwind CSS v3.4.0 configuration
├── components.json            # shadcn/ui CLI configuration
├── postcss.config.mjs         # PostCSS configuration
├── CLAUDE.md                  # AI agent instructions
└── package.json               # Dependencies and scripts
```

## Technology Stack

### Core Frameworks
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS v3.4.0** - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI primitives

### Content Management
- **Sanity CMS** - Headless CMS for content management
- **next-sanity** - Official Sanity integration for Next.js
- **@sanity/image-url** - Image optimization and transformation

### Key Dependencies
```json
{
  "dependencies": {
    "@sanity/image-url": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.540.0",
    "next": "15.4.6",
    "next-sanity": "^10.0.12",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}
```

## Setup Instructions

### 1. Initial Next.js Project Setup

```bash
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd project-name
```

### 2. Install Sanity Integration

```bash
npm install next-sanity @sanity/image-url
```

### 3. Configure shadcn/ui

**Important**: shadcn/ui requires Tailwind CSS v3.4.0, not v4.

```bash
# Downgrade Tailwind CSS to v3.4.0
npm install tailwindcss@^3.4.0 autoprefixer postcss

# Create Tailwind config
```

Create `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

Update `postcss.config.mjs`:
```javascript
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

### 4. Install shadcn/ui Dependencies

```bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge lucide-react
```

### 5. Create shadcn/ui Configuration

Create `components.json`:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### 6. Update Global CSS

Update `src/app/globals.css`:
```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

### 7. Create Utils Library

Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 8. Install Essential Components

```bash
npx shadcn@latest add button card input avatar badge separator
```

## AI Agent Configuration

### MCP Servers

This project leverages several Model Context Protocol (MCP) servers:

1. **shadcn MCP Server**: For shadcn/ui component management
   - `mcp__shadcn__list_components` - List available components
   - `mcp__shadcn__get_component` - Get component source code
   - `mcp__shadcn__get_component_demo` - Get usage examples
   - `mcp__shadcn__list_blocks` - List available blocks

2. **GitHub MCP Server**: For repository management
   - File operations, PR management, issue tracking

3. **IDE MCP Server**: For development environment integration
   - Diagnostics, code execution

### Specialized Agents

Configure these agents in your `CLAUDE.md` file:

1. **nextjs-fullstack-developer**: For Next.js development
   - App Router implementation
   - Server Components and Server Actions
   - Performance optimization
   - Database integration

2. **shadcn-ui-developer**: For UI component development
   - shadcn/ui component implementation
   - Radix UI customization
   - Design system implementation
   - Accessibility compliance

3. **ui-designer**: For design and UX
   - Interface design and layout
   - User experience optimization
   - Design system development
   - Modern UI/UX patterns

## Development Workflow

### Essential Commands

```bash
npm run dev          # Start development server
npm run build        # Build production application
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Components

```bash
npx shadcn@latest add [component-name]
```

### Common Component Patterns

```typescript
// Import pattern
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Usage with cn utility
import { cn } from "@/lib/utils"

const MyComponent = ({ className, ...props }) => {
  return (
    <div className={cn("default-classes", className)} {...props}>
      Content
    </div>
  )
}
```

## Sanity CMS Integration

### Client Configuration

Located in `src/app/sanity/client.ts`:
```typescript
import { createClient } from "next-sanity"

export const client = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
})
```

### Content Fetching Pattern

```typescript
const QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]`;
const options = { next: { revalidate: 30 } };

export default async function Page() {
  const posts = await client.fetch<SanityDocument[]>(QUERY, {}, options);
  // Component implementation
}
```

## AI Prompts for Setup

### Initial Setup Prompt

```
Set up a Next.js 15 project with shadcn/ui and Sanity CMS integration. Follow these requirements:
1. Use TypeScript and App Router
2. Configure Tailwind CSS v3.4.0 (not v4) for shadcn/ui compatibility
3. Install essential shadcn/ui components: button, card, input, avatar, badge, separator
4. Set up Sanity client with next-sanity
5. Create proper configuration files and utils
6. Ensure the build passes successfully
```

### Component Development Prompt

```
Use the shadcn-ui-developer agent to build UI components with shadcn/ui. Always use the shadcn MCP server to get component demos with mcp__shadcn__get_component_demo before implementing components. Follow the established patterns and ensure accessibility compliance.
```

### Content Integration Prompt

```
Use the nextjs-fullstack-developer agent to integrate Sanity CMS content. Implement ISR with 30-second revalidation, use proper TypeScript types from next-sanity, and follow the established data fetching patterns.
```

## Verification Checklist

- [ ] Next.js 15 with App Router configured
- [ ] TypeScript properly set up
- [ ] Tailwind CSS v3.4.0 installed (not v4)
- [ ] shadcn/ui components installed and working
- [ ] Sanity client configured
- [ ] Essential components added (button, card, input, avatar, badge, separator)
- [ ] Utils library created with cn function
- [ ] Build passes successfully
- [ ] CLAUDE.md file created with agent instructions
- [ ] All configuration files in place

## Additional Recommendations

### Theme Management
Consider adding `next-themes` for dark mode support:
```bash
npm install next-themes
```

### Form Handling
For forms, install react-hook-form and zod:
```bash
npm install react-hook-form @hookform/resolvers zod
```

### Useful shadcn/ui Components for Websites
- `dialog` - For modals and overlays
- `form` - For form handling
- `navigation-menu` - For site navigation
- `toast` (sonner) - For notifications
- `sheet` - For mobile menus
- `accordion` - For FAQ sections

## Troubleshooting

### Common Issues

1. **Tailwind CSS v4 Compatibility**: shadcn/ui requires v3.4.0
2. **PostCSS Configuration**: Must use standard tailwindcss plugin, not @tailwindcss/postcss
3. **CSS Import Syntax**: Use @tailwind directives, not @import "tailwindcss"
4. **Component Import Paths**: Ensure @/* alias is configured correctly

### Build Verification

Always run `npm run build` after setup to ensure everything is configured correctly.

---

This scaffold provides a robust foundation for modern web development projects using Next.js, shadcn/ui, and Sanity CMS with proper AI agent integration for enhanced development workflows.