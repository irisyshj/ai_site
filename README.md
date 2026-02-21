# AI Literacy Coach Brand Site

A modern, high-performance personal brand website for an AI Literacy Coach & Consultant. Built with Next.js 14, TypeScript, Tailwind CSS, and Shadcn/ui.

## Overview

This is a minimalist, content-first brand website designed to showcase AI literacy resources, articles, and provide direct AI consultation through an integrated chatbot. The site prioritizes performance, accessibility, and clean design.

### Key Features

- **AI Coach Integration** - Embedded chatbot interface (Dify/Coze) for personalized AI coaching
- **Resource Hub** - Curated collection of articles, videos, PDFs, and podcasts
- **Dark Mode** - System-aware theme switching with persistable preferences
- **RSS Feed** - Auto-generated RSS feed for featured resources
- **High Performance** - Optimized for 100/100 Lighthouse score
- **SEO Ready** - Comprehensive metadata, sitemap, and structured data
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| Shadcn/ui | Accessible component library |
| Radix UI | Headless component primitives |
| Lucide React | Icon library |
| next-themes | Dark mode support |
| gray-matter | Frontmatter parsing for content |

## Prerequisites

- Node.js 18.17+ or 20+
- npm, pnpm, or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd 20_brand_site
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables (see [Configuration](#configuration) below).

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
C:\20_brand_site\
├── app\                          # Next.js App Router pages
│   ├── ai-coach\                # AI Coach page
│   ├── about\                   # About page
│   ├── resources\               # Resources hub
│   ├── rss\                     # RSS feed endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global styles
├── components\
│   ├── ai-coach\                # AI chat components
│   ├── layout\                  # Header, Footer, ThemeProvider
│   ├── resources\               # Resource cards and filters
│   ├── sections\                # Page sections (Hero, CTA, etc.)
│   └── ui\                      # Shadcn/ui components
├── data\                        # Site-wide data
│   ├── resources.ts             # Resource data
│   ├── site.ts                  # Site configuration
│   └── socials.ts               # Social media links
├── lib\                         # Utility functions
│   ├── ai-chat.ts               # AI chat utilities
│   └── utils.ts                 # Common utilities
├── types\                       # TypeScript definitions
│   ├── article.ts               # Article interfaces
│   ├── resource.ts              # Resource interfaces
│   └── social.ts                # Social link interfaces
├── public\                      # Static assets
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## Configuration

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# AI Chat Configuration
NEXT_PUBLIC_AI_CHAT_URL=https://your-bot.dify.ai/chatbot
NEXT_PUBLIC_AI_CHAT_ENABLED=true

# Site Configuration
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

#### Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_AI_CHAT_URL` | Your Dify/Coze chatbot embed URL | `https://demo.dify.ai/chatbot` |
| `NEXT_PUBLIC_AI_CHAT_ENABLED` | Enable/disable AI chat widget | `true` |
| `NEXT_PUBLIC_BASE_URL` | Production site URL | `https://ailiteracycoach.com` |

### Site Configuration

Edit `data/site.ts` to customize your site:

```typescript
export const siteConfig = {
  name: 'AI Literacy Coach',
  description: 'Helping professionals navigate the AI revolution',
  url: 'https://yourdomain.com',
  author: 'Your Name',
  newsletter: '/newsletter'
};
```

### Social Links

Edit `data/socials.ts` to add your social media links:

```typescript
export const socialLinks: SocialLink[] = [
  { platform: 'twitter', url: 'https://x.com/username', icon: 'X', visible: true },
  { platform: 'github', url: 'https://github.com/username', icon: 'Github', visible: true },
  { platform: 'linkedin', url: 'https://linkedin.com/in/username', icon: 'Linkedin', visible: true },
  { platform: 'wechat', url: 'https://weixin.qq.com/...', icon: 'MessageCircle', visible: true }
];
```

## Content Management

### Adding Resources

Resources are stored in `data/resources.ts`. Each resource follows the `Resource` interface:

```typescript
import { Resource } from '@/types/resource';

export const resources: Resource[] = [
  {
    id: 'unique-identifier',
    title: 'Resource Title',
    description: 'A brief description of the resource.',
    type: 'article',          // 'article' | 'video' | 'pdf' | 'podcast' | 'tool'
    url: '/articles/my-article',
    tags: ['ai', 'llm', 'guide'],
    datePublished: '2024-01-15',
    dateAdded: '2024-01-20',
    readingTime: 8,           // Optional: reading time in minutes
    difficulty: 'beginner',   // 'beginner' | 'intermediate' | 'advanced'
    featured: true,           // Show on homepage and include in RSS
    external: false           // true if linking to external site
  }
];
```

### Resource Types

| Type | Description |
|------|-------------|
| `article` | Blog posts and written content |
| `video` | Video tutorials and talks |
| `pdf` | PDF guides and documents |
| `podcast` | Audio content |
| `tool` | Interactive tools and apps |

### Adding Articles

Articles are managed through the resources system. To add a new article:

1. Create your article content (Markdown or MDX)
2. Add a new entry to `data/resources.ts` with `type: 'article'`
3. Set `featured: true` to include it in the RSS feed

### Publishing Workflow

1. Create or edit content in `data/resources.ts`
2. Run `npm run build` to verify the build
3. Commit and push to your repository
4. Deploy to Vercel (automatic on push)

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run analyze` | Build with bundle analysis |

### Building for Production

```bash
npm run build
```

The production build includes:
- Optimized bundles with code splitting
- Image optimization
- Static generation where possible
- Compressed assets

### Bundle Analysis

To analyze your bundle size:

```bash
npm run analyze
```

This generates an `analyze.html` file in your project root with a detailed breakdown.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

Vercel automatically:
- Detects Next.js
- Builds the project
- Handles edge caching
- Provides HTTPS

### Environment Variables on Vercel

Add these in your Vercel project settings:

```
NEXT_PUBLIC_AI_CHAT_URL=https://your-bot.dify.ai/chatbot
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Other Platforms

This project can be deployed to any platform that supports Next.js:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Railway
- Self-hosted (Node.js server)

## Features

### Dark Mode

The site uses `next-themes` for dark mode support. Theme preference is:
- Respected from system preference by default
- Persisted in localStorage
- Toggleable via the theme switcher in the header

### AI Coach Integration

The AI Coach is embedded as an iframe with the following features:
- Floating action button with pulse animation
- Modal dialog for chat interface
- Escape key to close
- Focus management for accessibility
- Configurable URL and enable/disable

Supported platforms:
- Dify.ai
- Coze.com
- Any HTTPS iframe-compatible chatbot

### Resources Hub

The resources page features:
- Filterable by type, tag, and difficulty
- Search functionality
- Responsive card grid layout
- External link indicators
- Reading time and difficulty badges

### RSS Feed

The RSS feed is automatically generated at `/rss` and includes:
- All featured resources
- Proper XML formatting
- Category and tag support
- Caching headers for performance

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Skip to main content link
- Focus management in modals
- Screen reader friendly

## Customization

### Styling

The project uses CSS variables for theming. Edit `app/globals.css` to customize:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode variables */
}
```

### Component Props

Most components accept props for customization. Refer to the individual component files for available options.

## License

MIT License - feel free to use this project for your own brand site.

## Contributing

This is a personal brand site, but suggestions and improvements are welcome through issues and pull requests.
