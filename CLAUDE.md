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

- **Content Structure**: Blog-style application with posts
  - Main page (`src/app/page.tsx`) - Lists posts from Sanity
  - Dynamic post pages (`src/app/[slug]/page.tsx`) - Individual post display with PortableText rendering
  - Image optimization using `@sanity/image-url`

- **Styling**: Uses Tailwind CSS v4 with Geist fonts (sans and mono variants)

- **Data Fetching**: 
  - Uses Sanity queries with ISR (revalidate: 30 seconds)
  - Posts query: `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]`
  - Individual post query: `*[_type == "post" && slug.current == $slug][0]`

### Import Aliases

- `@/*` maps to `./src/*` for clean imports

### Content Management

Posts are managed through Sanity CMS with the following expected schema:
- `_type: "post"`
- `title: string`
- `slug: {current: string}`
- `publishedAt: datetime`
- `body: PortableText array`
- `image: SanityImageSource` (optional)