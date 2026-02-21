@Plan

I need you to act as a **Senior Solutions Architect** and **Product Manager**. We are building a personal brand website for an **AI Literacy Coach & Consultant**.

**Context:**
The goal is to build a high-performance, minimalist website similar to `mengjian.site`. The site will serve as a hub for articles, resources, and a direct AI consultation interface. We will use **Next.js 14+ (App Router)**, **Tailwind CSS**, and **Shadcn/ui**.

**Core Requirements:**
1.  **Minimalist Design:** Clean typography, ample whitespace, "content-first" approach. No complex animations or heavy graphics.
2.  **AI Integration:** A dedicated page or modal embedding a chatbot (from Dify/Coze) to act as a "Virtual AI Coach".
3.  **Resource Hub:** A CMS-like structure (using Markdown/MDX or a simple JSON file initially) to list curated articles, PDF guides, and videos.
4.  **Lead Generation:** Clear Call-to-Actions (CTAs) for newsletter signup or WeChat connection.
5.  **Performance:** 100/100 Lighthouse score, mobile-first responsive design.

**Technical Constraints:**
- **Framework:** Next.js 14 (App Router, TypeScript).
- **Styling:** Tailwind CSS + Shadcn/ui (using CSS variables).
- **Deployment:** Vercel (zero-config).
- **Icons:** Lucide React.
- **Content:** Stored locally in `src/content` or `src/data` for MVP (no external CMS database yet).

**Your Task:**
Please generate a detailed **Implementation Plan** for this project. The plan should be broken down into specific, actionable steps that a Junior Developer (or an AI agent) could follow.

**The Plan Must Include:**
1.  **Project Structure:** A proposed file tree (e.g., `app/`, `components/ui`, `lib/`, `content/`).
2.  **Component Architecture:** List of reusable UI components we need (e.g., `ResourceCard`, `HeroSection`, `AIChatWidget`).
3.  **Data Schema:** A TypeScript interface definition for our "Resources" (e.g., `interface Resource { id: string; title: string; type: 'article' | 'video'; url: string; ... }`).
4.  **Step-by-Step Dev Phases:**
    - Phase 1: Setup & Infrastructure
    - Phase 2: Core UI Components & Layout
    - Phase 3: Content Pages (Home, About, Resources)
    - Phase 4: AI Integration
    - Phase 5: Polish & SEO

**Output Format:**
Present this as a structured Markdown document. Do not write any code yet, just the plan. I will review and approve it before we start coding.