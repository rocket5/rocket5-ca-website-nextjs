# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS. The project integrates with Sanity CMS for content management.

### Key Components

- **Sanity Integration**: Uses `next-sanity` with client configured in `src/app/sanity/client.ts`
  - Project ID: `3vt3orre`
  - Dataset: `production` 
  - API version: `2024-01-01`

- **Content Structure**: Website with Sanity CMS integration
  - **Current homepage** (`src/app/page.tsx`) - Demo example from Sanity setup (will be replaced with rocket5.ca homepage)
  - Dynamic post pages (`src/app/[slug]/page.tsx`) - Individual post display with PortableText rendering
  - **Sanity Studio**: Located at `../rocket5-ca-studio-nextjs` (separate repository)
  - Content editing workflows will be implemented throughout the site
  - Image optimization using `@sanity/image-url`

- **Styling**: Uses Tailwind CSS v3.4.0 with Geist fonts (sans and mono variants) and shadcn/ui components

- **Data Fetching**: 
  - Uses Sanity queries with ISR (revalidate: 30 seconds)
  - Posts query: `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]`
  - Individual post query: `*[_type == "post" && slug.current == $slug][0]`

### Import Aliases

- `@/*` maps to `./src/*` for clean imports

### Content Management

**Posts** are managed through Sanity CMS with the following schema:
- `_type: "post"`
- `title: string`
- `slug: {current: string}`
- `publishedAt: datetime`
- `body: PortableText array`
- `image: SanityImageSource` (optional)

**Homepage** content is managed through Sanity CMS with the following schema:
- `_type: "homepage"` (Singleton document)
- `title: string`
- `heroSection: object` with fields:
  - `headline: string`
  - `subheadline: text`
  - `ctaText: string`
  - `ctaLink: string`
  - `benefits: array of strings`
  - `socialProofText: text`
  - `clientAvatars: array of objects` with `image`, `name`, `fallbackInitials`
- `servicesSection: object` with fields:
  - `sectionTitle: string`
  - `sectionSubtitle: text`
  - `services: array of objects` with `title`, `description`, `iconName`, `featured` (drag-to-reorder)
- `journeySection: object` with fields:
  - `badge: string`
  - `title: string`
  - `highlightedWord: string`
  - `subtitle: text`
  - `steps: array of objects` with `stepNumber`, `title`, `description` (drag-to-reorder)
- `aboutSection: object` with fields:
  - `title: string`
  - `subtitle: text`
  - `mainContent: text`
  - `profileImage: SanityImageSource`
  - `profileImageAlt: string`
  - `profileName: string`
  - `profileTitle: string`
  - `centeredParagraph: text`
  - `sectionTitle: string`
  - `clientLogos: array of objects` with `clientName`, `logoImage`, `logoAlt`, `websiteUrl`, `featured` (drag-to-reorder)
  - `gridLayout: object` with `columns`, `rows`
- `seo: object` with `metaTitle`, `metaDescription`, `ogImage`
- Query: `*[_type == "homepage"][0]{ ... }` with optimized asset projections

### shadcn/ui Components

- **Setup**: Complete shadcn/ui configuration with Tailwind CSS v3.4.0 compatibility
- **Configuration Files**:
  - `tailwind.config.ts` - Custom theme configuration with CSS variables
  - `components.json` - shadcn/ui CLI configuration
  - `src/lib/utils.ts` - Contains `cn()` utility function for className merging
- **Installed Components**: Button, Card, Input, Avatar, Badge, Separator, Dialog, Form, Label, Navigation Menu, Toast, Sheet, Accordion
- **Component Location**: `src/components/ui/`
- **Import Pattern**: `import { Button } from "@/components/ui/button"`
- **Theming**: CSS variables in `globals.css` support light/dark mode with `next-themes` support
- **Icons**: Lucide React icons available (v0.540.0) - `import { IconName } from "lucide-react"`
  - **Enhanced Icon Library**: 40+ service-relevant icons categorized by purpose (Core Business, Design & Creative, Development & Tech, Marketing & Communication, Business & Analytics, E-commerce & Commerce, General Purpose)
  - **Icon Mapping**: Centralized icon management in `src/lib/iconMap.ts` with string-to-component conversion
- **Add New Components**: Use `npx shadcn@latest add [component-name]`

### Enhanced Features

- **Dark Mode**: `next-themes` installed for theme management
- **Form Handling**: `react-hook-form` with `zod` validation and `@hookform/resolvers`
- **Toast Notifications**: Built-in toast system with `use-toast` hook
- **Comprehensive UI Kit**: Production-ready components for modals, navigation, forms, and interactions
- **Sanity Preview Mode**: Draft content preview functionality with Next.js Draft Mode
  - Preview API routes: `/api/draft` and `/api/disable-draft`
  - Environment variables: `SANITY_PREVIEW_SECRET` and `SANITY_API_READ_TOKEN`
  - Visual indicator component for draft mode with proper Next.js Link usage

## AI Agent Instructions

### MCP Server Usage

- **shadcn MCP Server**: Use `mcp__shadcn__*` tools for:
  - Getting component source code with `mcp__shadcn__get_component`
  - **Getting exact usage examples** with `mcp__shadcn__get_component_demo` - Use this whenever working with shadcn/ui components to see proper implementation patterns
  - Listing available components and blocks
  - Understanding component structure and usage patterns

### Specialized Agents

**IMPORTANT**: Always check for and use available custom subagents from `.claude/agents/` folder before performing complex tasks. These agents are project-specific and should be preferred over built-in agents.

**Available Custom Agents** (located in `.claude/agents/`):
- **sanity-studio-expert**: **USE FIRST** for all Sanity CMS tasks including:
  - Schema design and content modeling
  - GROQ queries and optimization
  - Studio customization and configuration
  - Frontend integration with Sanity
  - Content architecture and editorial workflows

- **nextjs-fullstack-developer**: **USE FIRST** for all Next.js tasks including:
  - App Router implementation and routing
  - Server Components and Server Actions
  - Database integration and API routes
  - Performance optimization and Core Web Vitals
  - Full-stack features like authentication

- **shadcn-ui-developer**: **USE FIRST** for all UI component work including:
  - Building components with shadcn/ui
  - Customizing Radix UI primitives
  - Implementing design systems with Tailwind CSS
  - Creating accessible React components
  - Component composition and theming

- **ui-designer**: **USE FIRST** for all design-related tasks including:
  - User interface design and layout
  - User experience improvements
  - Design system development
  - Accessibility compliance
  - Modern UI/UX patterns and best practices

**Agent Selection Priority**:
1. **ALWAYS** use custom agents from `.claude/agents/` when available for the task type
2. Use built-in MCP agents only when no custom agent matches the task
3. Perform tasks directly only for simple, single-step operations

## Build and Deployment

### Vercel/Next.js Build Requirements

**Critical ESLint Rules**: The following must be followed to prevent build failures:
- **Apostrophes**: Escape apostrophes in JSX text using `&apos;` (e.g., `You&apos;re` not `You're`)
- **Navigation**: Use `<Link>` from `next/link` instead of `<a>` tags for internal navigation
- **React Rules**: Follow all `react/no-unescaped-entities` and Next.js routing rules

**Image Optimization**: Consider using `next/image` instead of `<img>` tags for better Core Web Vitals

**Environment Variables**: Required for Sanity integration:
- `SANITY_PREVIEW_SECRET`: Custom secret for preview mode access
- `SANITY_API_READ_TOKEN`: Sanity API token with Viewer permissions

### Development Philosophy

**No Fallback Data Strategy**: Components should expect and rely on Sanity CMS data being present:
- **Single Source of Truth**: All content comes from Sanity, no hardcoded fallbacks in components
- **Fail Fast**: Better to show empty state or error than stale hardcoded content
- **Clean Code**: Components are props-driven, no data duplication or maintenance burden
- **Error Handling**: Use error boundaries and empty states for missing data scenarios