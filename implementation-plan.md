# Implementation Plan: AI Literacy Coach & Consultant Brand Website
# 实施计划：AI素养教练与顾问品牌网站

## Executive Summary | 概述

A minimalist, high-performance personal brand website for an AI Literacy Coach & Consultant, inspired by `mengjian.site`. The site serves as a content hub and AI consultation interface with a focus on clean typography, performance, and lead generation.

一个极简、高性能的个人品牌网站，专为AI素养教练与顾问打造，灵感来源于 `mengjian.site`。该网站作为内容中心和AI咨询界面，注重清晰的排版、性能和潜在客户开发。

---

## 1. Project Structure | 项目结构

```
C:\20_brand_site\
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with fonts & theme
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles & CSS variables
│   ├── ai-coach/                 # AI Coach page
│   │   └── page.tsx
│   ├── resources/                # Resources hub page
│   │   └── page.tsx
│   ├── about/                    # About page
│   │   └── page.tsx
│   └── rss/                      # RSS feed endpoint
│       └── route.ts
├── components/
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Site navigation
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Container.tsx         # Max-width wrapper
│   │   └── NewsletterSignup.tsx  # Lead gen component
│   ├── sections/                 # Page sections
│   │   ├── HeroSection.tsx       # Home hero
│   │   ├── AboutPreview.tsx      # About preview
│   │   └── CTASection.tsx        # Call-to-action
│   ├── resources/                # Resource-related components
│   │   ├── ResourceGrid.tsx      # Grid layout for resources
│   │   ├── ResourceCard.tsx      # Individual resource card
│   │   ├── ResourceFilter.tsx    # Filter by type/tag
│   │   └── ResourceTable.tsx     # Alternative list view
│   ├── ai-coach/
│   │   ├── AIChatWidget.tsx      # Floating chat widget
│   │   ├── AIChatModal.tsx       # Full-screen chat modal
│   │   └── AICoachPage.tsx       # Dedicated coach page content
│   └── ui/                       # Shadcn/ui components (installed via CLI)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── badge.tsx
│       ├── separator.tsx
│       └── ...
├── content/                      # MDX content for articles / Obsidian Vault
│   ├── articles/                 # Blog articles / 博客文章
│   │   ├── 2024-01-15-getting-started-with-ai.md
│   │   ├── 2024-02-01-prompt-engineering-basics.md
│   │   └── _templates/           # Article templates / 文章模板
│   │       └── article-template.md
│   ├── assets/                   # Images & media files / 图片和媒体
│   │   ├── images/
│   │   ├── diagrams/
│   │   └── covers/
│   └── .obsidian/                # Obsidian config (gitignore)
├── data/                         # Static data
│   ├── resources.ts              # Curated resources list
│   ├── socials.ts                # Social media links
│   └── newsletter.ts             # Newsletter config
├── lib/                          # Utilities
│   ├── utils.ts                  # cn() helper, etc.
│   ├── rss.ts                    # RSS feed generator
│   └── ai-chat.ts                # Dify/Coze embed utilities
├── public/                       # Static assets
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
├── scripts/                      # Automation scripts / 自动化脚本
│   ├── publish.ts                # One-command publish / 一键发布脚本
│   └── optimize-images.ts        # Image optimization / 图片优化脚本
├── styles/                       # 样式文件
│   └── fonts.css                 # Font imports (Inter/Geist) / 字体导入
├── tsconfig.json                 # TypeScript config
├── next.config.ts                # Next.js config
├── package.json
└── README.md
```

---

## 2. Component Architecture | 组件架构

### Core Layout Components | 核心布局组件

| Component | Description | Props |
|-----------|-------------|-------|
| `Header` | Site navigation with logo, links, dark mode toggle / 带有logo、链接和深色模式切换的站点导航 | `currentPath?: string` |
| `Footer` | Site footer with links, copyright, social icons / 带有链接、版权和社交图标的站点页脚 | `showNewsletter?: boolean` |
| `Container` | Max-width content wrapper with consistent padding / 具有一致内边距的最大宽度内容包装器 | `size?: 'sm' \| 'md' \| 'lg'`, `className?` |
| `NewsletterSignup` | Email capture form with success state / 带有成功状态的邮件捕获表单 | `variant?: 'inline' \| 'card'` |

### Section Components | 页面区块组件

| Component | Description | Props |
|-----------|-------------|-------|
| `HeroSection` | Homepage hero with headline, subtext, CTAs / 带有标题、副文本和CTA的主页英雄区 | `className?` |
| `AboutPreview` | Brief bio with "Read More" link / 带有"阅读更多"链接的简短简介 | `bio?: string`, `image?: string` |
| `CTASection` | Call-to-action for WeChat/newsletter / 微信/通讯的号召性用语 | `title?`, `description?` |

### Resource Components | 资源组件

| Component | Description | Props |
|-----------|-------------|-------|
| `ResourceGrid` | Grid layout for resource cards / 资源卡片的网格布局 | `resources: Resource[]`, `filter?: ResourceFilter` |
| `ResourceCard` | Individual resource display card / 单个资源展示卡片 | `resource: Resource` |
| `ResourceFilter` | Tab/filter UI for resource types / 资源类型的选项卡/过滤器UI | `activeFilter: string`, `onFilterChange: (f) => void` |
| `ResourceTable` | Alternative list/table view / 替代的列表/表格视图 | `resources: Resource[]` |

### AI Coach Components | AI教练组件

| Component | Description | Props |
|-----------|-------------|-------|
| `AIChatWidget` | Floating FAB that opens chat modal / 打开聊天模态框的浮动操作按钮 | `position?: 'bottom-right' \| 'bottom-left'` |
| `AIChatModal` | Modal containing iframe for Dify/Coze chat / 包含Dify/Coze聊天iframe的模态框 | `isOpen: boolean`, `onClose: () => void` |
| `AICoachPage` | Dedicated page with embedded chat & instructions / 带有嵌入聊天和说明的专用页面 | None |

---

## 3. Data Schema | 数据架构

### Resource Interface | 资源接口

```typescript
// types/resource.ts

export type ResourceType = 'article' | 'video' | 'pdf' | 'podcast' | 'tool';

export interface Resource {
  id: string;                    // Unique identifier (kebab-case) / 唯一标识符
  title: string;                 // Resource title / 资源标题
  description: string;           // Short description (1-2 sentences) / 简短描述
  type: ResourceType;            // Content type / 内容类型
  url: string;                   // External URL or internal path / 外部URL或内部路径
  coverImage?: string;           // Optional thumbnail / 可选缩略图
  tags: string[];                // For filtering (e.g., ['llm', 'prompting']) / 用于过滤的标签
  datePublished: string;         // ISO date string / ISO日期字符串
  dateAdded: string;             // When added to this site / 添加到站点的日期
  readingTime?: number;          // Minutes (for articles) / 阅读时间（分钟）
  difficulty?: 'beginner' | 'intermediate' | 'advanced'; // 难度级别
  featured?: boolean;            // Show in homepage featured section / 是否在首页精选区显示
  external?: boolean;            // true = external link, false = internal / true=外部链接
}

export interface ResourceFilter {
  type?: ResourceType | 'all';
  tag?: string;
  difficulty?: string;
  search?: string;
}

// Example data structure / 示例数据结构
export const resources: Resource[] = [
  {
    id: 'getting-started-with-chatgpt',
    title: 'Getting Started with ChatGPT',
    description: 'A comprehensive guide for beginners to effectively use ChatGPT.',
    type: 'article',
    url: '/articles/getting-started-with-chatgpt',
    tags: ['llm', 'chatgpt', 'basics'],
    datePublished: '2024-01-15',
    dateAdded: '2024-01-20',
    readingTime: 8,
    difficulty: 'beginner',
    featured: true,
    external: false
  },
  {
    id: 'prompt-engineering-video',
    title: 'Advanced Prompt Engineering Techniques',
    description: 'Video tutorial covering advanced prompting strategies.',
    type: 'video',
    url: 'https://youtube.com/watch?v=xxx',
    tags: ['prompting', 'advanced'],
    datePublished: '2024-02-01',
    dateAdded: '2024-02-05',
    readingTime: 15,
    difficulty: 'advanced',
    featured: true,
    external: true
  }
];
```

### Social Links Interface | 社交链接接口

```typescript
// types/social.ts

export interface SocialLink {
  platform: string;              // 'twitter' | 'github' | 'linkedin' | 'wechat'
  url: string;
  icon?: LucideIconName;         // Lucide icon name / Lucide图标名称
  visible: boolean;
}

export const socialLinks: SocialLink[] = [
  { platform: 'twitter', url: 'https://x.com/username', icon: 'X', visible: true },
  { platform: 'github', url: 'https://github.com/username', icon: 'Github', visible: true },
  { platform: 'linkedin', url: 'https://linkedin.com/in/username', icon: 'Linkedin', visible: true },
  { platform: 'wechat', url: 'https://weixin.qq.com/...', icon: 'MessageCircle', visible: true }
];
```

---

## 4. Step-by-Step Development Phases | 分步开发阶段

### Phase 1: Setup & Infrastructure (30-45 min) | 第一阶段：设置与基础设施

**Tasks | 任务:**
1. Initialize Next.js 14 project with TypeScript / 使用TypeScript初始化Next.js 14项目
   ```bash
   npx create-next-app@latest 20_brand_site --typescript --tailwind --app
   ```
2. Install dependencies / 安装依赖
   ```bash
   npm install lucide-react clsx tailwind-merge class-variance-authority
   ```
3. Install and configure Shadcn/ui / 安装并配置Shadcn/ui
   ```bash
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add button card dialog input badge separator
   ```
4. Configure `tailwind.config.ts` with custom theme variables / 使用自定义主题变量配置
5. Set up `tsconfig.json` with path aliases (`@/components`, `@/lib`, etc.) / 设置路径别名
6. Create base folder structure / 创建基础文件夹结构
7. Configure Google Fonts (Inter) via `next/font` / 通过next/font配置Google字体

**Deliverable | 交付物:** Working Next.js app with Shadcn/ui configured, green build / 配置好Shadcn/ui的可运行的Next.js应用，构建成功

---

### Phase 2: Core Layout & Design System (1-2 hours) | 第二阶段：核心布局与设计系统

**Tasks | 任务:**
1. Create `globals.css` with:
   - CSS custom properties for colors (light/dark mode) / 颜色的CSS自定义属性
   - Typography scale / 排版比例
   - Base element resets / 基础元素重置
2. Build `Container` component for consistent content width / 构建容器组件以保持一致的内容宽度
3. Build `Header` component with:
   - Logo/text-based branding / 基于logo/文本的品牌标识
   - Navigation links (Home, Resources, AI Coach, About) / 导航链接
   - Dark mode toggle (using Shadcn's dropdown/switch) / 深色模式切换
4. Build `Footer` component with:
   - Copyright / 版权
   - Social links (using Lucide icons) / 社交链接
   - Quick links / 快速链接
5. Create `layout.tsx` with Header + Footer structure / 创建包含Header和Footer的布局
6. Add smooth scroll behavior to HTML / 添加平滑滚动行为

**Deliverable | 交付物:** Functional site layout with navigation, dark mode support / 带有导航和深色模式支持的可用站点布局

---

### Phase 3: Homepage - Hero & Content Sections (1-2 hours) | 第三阶段：主页-英雄区与内容区块

**Tasks | 任务:**
1. Create `HeroSection` component:
   - Large, bold headline: "AI Literacy for the Modern Professional" / 大号粗体标题
   - Subtext describing value proposition / 描述价值主张的副文本
   - Two CTAs: "Explore Resources" + "Talk to AI Coach" / 两个号召性按钮
   - Minimal styling, no heavy graphics / 极简样式，无重图形
2. Create `AboutPreview` component:
   - Photo placeholder (or actual photo) / 照片占位符
   - Brief 2-3 sentence bio / 2-3句话的简短简介
   - "Read More" link to About page / "阅读更多"链接
3. Create `FeaturedResources` section:
   - Grid of 3-6 featured resources / 3-6个精选资源的网格
   - Uses `ResourceCard` component / 使用ResourceCard组件
4. Create `CTASection` component:
   - Newsletter signup heading / 通讯注册标题
   - "Subscribe" button / "订阅"按钮
   - "Connect on WeChat" secondary option / "连接微信"次要选项
5. Assemble homepage in `app/page.tsx` / 在主页文件中组装所有组件

**Deliverable | 交付物:** Complete homepage with all sections / 带有所有区块的完整主页

---

### Phase 4: Resources Hub (1.5-2 hours) | 第四阶段：资源中心

**Tasks | 任务:**
1. Create `data/resources.ts` with sample resource data / 创建带有示例资源数据的数据文件
2. Create `ResourceCard` component:
   - Type badge (article/video/pdf/etc) / 类型徽章
   - Title, description / 标题、描述
   - Tags (chips) / 标签芯片
   - Reading time/difficulty indicators / 阅读时间/难度指示器
   - External link icon if external / 外部链接图标
3. Create `ResourceFilter` component:
   - Tabs for All/Articles/Videos/PDFs / 类型选项卡
   - Search input / 搜索输入
4. Create `ResourceGrid` with filtering logic / 创建带有过滤逻辑的网格
5. Build `app/resources/page.tsx` with server-side filtering / 构建带有服务端过滤的资源页面
6. Add RSS feed generation in `app/rss/route.ts` / 添加RSS订阅源生成
7. Add pagination if needed (or "Load More" button) / 添加分页或"加载更多"按钮

**Deliverable | 交付物:** Functional resources page with filtering / 带有过滤功能的可用资源页面

---

### Phase 5: AI Coach Integration (1 hour) | 第五阶段：AI教练集成

**Tasks | 任务:**
1. Create `lib/ai-chat.ts` with:
   - Dify/Coze embed URL configuration / Dify/Coze嵌入URL配置
   - Helper function to generate iframe URL / 生成iframe URL的辅助函数
2. Create `AIChatModal` component:
   - Full-screen on mobile, centered modal on desktop / 移动端全屏，桌面端居中模态框
   - Close button / 关闭按钮
   - Loading state while iframe loads / iframe加载时的加载状态
3. Create `AIChatWidget` component:
   - Fixed position FAB (floating action button) / 固定位置的浮动操作按钮
   - Pulse animation to draw attention / 脉冲动画以吸引注意
   - Opens modal on click / 点击打开模态框
4. Create dedicated `AICoachPage` content:
   - Instructions on how to use the AI coach / 如何使用AI教练的说明
   - Example prompts / 示例提示词
   - Embedded chat iframe / 嵌入的聊天iframe
5. Add widget to root layout so it appears on all pages / 将小部件添加到根布局使其出现在所有页面

**Deliverable | 交付物:** Working AI chat integration accessible from all pages / 可从所有页面访问的可用AI聊天集成

---

### Phase 6: About Page & Polish (45 min - 1 hour) | 第六阶段：关于页面与完善

**Tasks | 任务:**
1. Create `app/about/page.tsx`:
   - Full bio/story / 完整传记/故事
   - Credentials/background / 凭证/背景
   - Philosophy on AI literacy / AI素养理念
   - Photo / 照片
2. Add `NewsletterSignup` component (for Resend/Buttondown integration) / 添加通讯注册组件
3. Ensure all meta tags are properly set / 确保所有元标签正确设置
4. Add `robots.txt` and `sitemap.ts` / 添加robots.txt和站点地图
5. Test all navigation links / 测试所有导航链接

**Deliverable | 交付物:** Complete about page, functional newsletter signup / 完整的关于页面，可用的通讯注册

---

### Phase 7: Performance Optimization (45 min - 1 hour) | 第七阶段：性能优化

**Tasks | 任务:**
1. Run Lighthouse audit and address issues / 运行Lighthouse审计并解决问题
   - Enable Next.js Image optimization / 启用Next.js图片优化
   - Add `loading="lazy"` to below-fold images / 为折叠下方图片添加懒加载
   - Minimize JavaScript bundle / 最小化JavaScript包
2. Configure `next.config.ts`:
   ```typescript
   const nextConfig = {
     images: { domains: [] },
     experimental: { optimizeCss: true }
   };
   ```
3. Add font preloading / 添加字体预加载
4. Ensure proper heading hierarchy (h1, h2, h3) / 确保正确的标题层级
5. Add proper ARIA labels / 添加适当的ARIA标签
6. Test keyboard navigation / 测试键盘导航
7. Verify `prefers-reduced-motion` respected / 验证是否尊重减少动画偏好

**Deliverable | 交付物:** 95+ Lighthouse score, accessible / 95+分Lighthouse评分，可访问

---

### Phase 8: Deployment (15 min) | 第八阶段：部署

**Tasks | 任务:**
1. Push code to GitHub / 将代码推送到GitHub
2. Connect repository to Vercel / 将仓库连接到Vercel
3. Configure environment variables (if any for newsletter) / 配置环境变量
4. Deploy and verify all functionality / 部署并验证所有功能
5. Set up custom domain (if applicable) / 设置自定义域名（如适用）

**Deliverable | 交付物:** Live site on Vercel / Vercel上的实时站点

---

## 5. Technical Configuration | 技术配置

### Tailwind Config (Key Settings) | Tailwind配置（关键设置）

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### CSS Variables (globals.css) | CSS变量

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --border: 240 5.9% 90%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --border: 240 3.7% 15.9%;
  }
}
```

---

## 6. Dependencies Summary | 依赖项摘要

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.344.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0",
    "next-mdx-remote": "^4.4.1",
    "gray-matter": "^4.0.3",
    "date-fns": "^3.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "tsx": "^4.7.0",
    "sharp": "^0.33.0"
  }
}
```

---

## 7. Risks & Mitigations | 风险与缓解措施

| Risk | Severity | Mitigation |
|------|----------|------------|
| Dify/Coze embed blocks on some networks / Dify/Coze嵌入在某些网络被屏蔽 | Low | Add fallback message, test iframe sandboxing / 添加后备消息，测试iframe沙箱 |
| Content management becomes difficult at scale / 大规模时内容管理困难 | Medium | Plan for CMS migration (Notion/Sanity) when >50 resources / 计划在超过50个资源时迁移到CMS |
| Newsletter API limits (free tier) / 通讯API限制（免费层） | Low | Start with Resend/Buttondown free tier, monitor usage / 从免费层开始，监控使用情况 |
| Dark mode color contrast issues / 深色模式颜色对比度问题 | Low | Use Shadcn's tested palette, verify with contrast checker / 使用Shadcn经过测试的调色板，用对比度检查器验证 |

---

## 8. Content Management Workflow | 内容管理工作流 (MVP)

### 8.1 Obsidian + Git Publishing Flow | Obsidian + Git 发布流程

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Publishing Workflow               │
│                    内容发布工作流                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Step 1: Write in Obsidian                                 │
│   步骤1: 在Obsidian中写作                                    │
│   ┌──────────────┐                                         │
│   │  Obsidian    │ ── Create/Edit .md files                │
│   │  (Vault指向) │    创建/编辑 .md 文件                     │
│   │content/文件夹│                                         │
│   └──────┬───────┘                                         │
│          │                                                  │
│          ▼                                                  │
│   Step 2: One-Command Publish                               │
│   步骤2: 一键发布                                            │
│   ┌──────────────┐                                         │
│   │ npm run      │ ── Auto git add, commit, push           │
│   │ publish      │    自动 git add, commit, push           │
│   └──────┬───────┘                                         │
│          │                                                  │
│          ▼                                                  │
│   Step 3: Auto Deploy                                       │
│   步骤3: 自动部署                                            │
│   ┌──────────────┐                                         │
│   │   Vercel     │ ── Build & Deploy (1-2 min)            │
│   │  (自动构建)   │    构建并部署 (1-2分钟)                 │
│   └──────────────┘                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Project Structure for Content Management | 内容管理的项目结构

```
C:\20_brand_site\
├── content/                      # Obsidian Vault 根目录
│   ├── articles/                 # 博客文章
│   │   ├── 2024-01-15-getting-started-with-chatgpt.md
│   │   ├── 2024-02-01-prompt-engineering.md
│   │   └── _templates/           # 文章模板
│   │       └── article-template.md
│   ├── assets/                   # 图片和媒体文件
│   │   ├── images/
│   │   ├── diagrams/
│   │   └── covers/
│   └── .obsidian/                # Obsidian配置（gitignore）
├── data/                         # 结构化数据（手动编辑）
│   ├── resources.ts              # 资源列表
│   └── socials.ts                # 社交链接
└── scripts/                      # 自动化脚本
    └── publish.ts                # 发布脚本
```

### 8.3 Article Frontmatter Template | 文章 Frontmatter 模板

**存放在:** `content/articles/_templates/article-template.md`

```markdown
---
title: "文章标题 English Title"
slug: "article-slug-url"
date: 2024-01-15
description: "A brief description of the article content (1-2 sentences)"
# 文章简短描述（1-2句话）
tags: ['ai', 'llm', 'tutorial']
category: 'tutorial' # tutorial | opinion | guide | news
draft: false         # true = 不发布
featured: false      # true = 首页精选
coverImage: "/assets/images/covers/cover-filename.jpg"
readingTime: 8       # 阅读时间（分钟）
difficulty: 'beginner' # beginner | intermediate | advanced
---

# 文章标题

Write your article content here using Markdown syntax.

在这里使用Markdown语法撰写文章内容。

## Subheading | 子标题

Content continues...

---

## 图片引用 | Image Reference

```
![图片描述](/assets/images/filename.jpg)
```
```

### 8.4 Obsidian Configuration | Obsidian 配置

**创建文件:** `content/.obsidian/workspace.json`

```json
{
  "vault": "AI Literacy Site Content",
  "attachmentsPath": "assets/images",
  "newFileLocation": "articles",
  "newFileFolderPath": "articles",
  "useMarkdownLinks": true,
  "alwaysUpdateLinks": true
}
```

**Obsidian 设置步骤:**
1. 打开 Obsidian → 打开已有仓库
2. 选择 `C:\20_brand_site\content` 作为 Vault
3. 设置 → 文件与链接 → 附件文件夹 → `assets/images`
4. 设置 → 编辑器 → 默认扩展名 → `.md`

### 8.5 One-Command Publish Script | 一键发布脚本

**创建文件:** `scripts/publish.ts`

```typescript
// scripts/publish.ts
import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function publish() {
  console.log('🚀 Starting publish process...\n');

  // 1. Check git status
  console.log('📋 Checking git status...');
  const status = execSync('git status --short', { encoding: 'utf-8' });

  if (!status) {
    console.log('✅ No changes to publish.\n');
    rl.close();
    return;
  }

  console.log('\nChanges to be published:');
  console.log(status);

  // 2. Get commit message
  const message = await question('\n📝 Enter commit message: ');
  if (!message) {
    console.log('❌ Commit message required. Aborting.\n');
    rl.close();
    return;
  }

  try {
    // 3. Stage all changes
    console.log('\n➕ Staging changes...');
    execSync('git add .', { stdio: 'inherit' });

    // 4. Commit
    console.log('✅ Committing changes...');
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });

    // 5. Push
    console.log('📤 Pushing to GitHub...');
    execSync('git push', { stdio: 'inherit' });

    console.log('\n✨ Publish complete! Vercel will deploy in 1-2 minutes.\n');
    console.log('🔗 Check deployment status: https://vercel.com/dashboard\n');

  } catch (error) {
    console.error('\n❌ Publish failed:', error);
  } finally {
    rl.close();
  }
}

publish();
```

**添加到 package.json:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "publish": "tsx scripts/publish.ts"
  }
}
```

### 8.6 Mobile Editing Setup | 移动端编辑配置

**推荐应用:**

| 平台 | 应用 | 配置 |
|------|------|------|
| iOS | **Working Copy** | Git客户端，可clone/push |
| iOS | **Obsidian** | 同步内容文件夹 |
| Android | **Termux** | Git命令行 |
| Android | **Obsidian** | 同步内容文件夹 |

**iOS 工作流:**
1. Working Copy → Clone 仓库
2. Obsidian → 使用 "打开文件夹" → Working Copy 中的 `content` 文件夹
3. 编辑后 → Working Copy → Commit + Push

**Android 工作流:**
1. Termux → `git clone` 仓库
2. Obsidian → 打开 Termux 中的 `content` 文件夹
3. 编辑后 → Termux → `git push`

### 8.7 Image Optimization | 图片优化

**自动优化脚本:** `scripts/optimize-images.ts`

```typescript
import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';

async function optimizeImages() {
  const images = await glob('content/assets/**/*.{jpg,jpeg,png}');
  let totalSaved = 0;

  for (const img of images) {
    const stats = await sharp(img).stats();
    const metadata = await sharp(img).metadata();

    // Skip if already optimized
    if (img.includes('-optimized')) continue;

    const outputPath = img.replace(/\.(jpg|jpeg|png)$/, '-optimized.$1');

    await sharp(img)
      .resize(metadata.width, metadata.height, { fit: 'inside' })
      .jpeg({ quality: 85, progressive: true })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);

    const beforeSize = (await import('fs')).statSync(img).size;
    const afterSize = (await import('fs')).statSync(outputPath).size;
    totalSaved += beforeSize - afterSize;

    console.log(`✅ ${img}: ${((beforeSize - afterSize) / 1024).toFixed(0)}KB saved`);
  }

  console.log(`\n💾 Total saved: ${(totalSaved / 1024).toFixed(0)}KB`);
}

optimizeImages();
```

### 8.8 Publishing Checklist | 发布检查清单

**发布前检查:**
- [ ] Frontmatter 完整（title, slug, date, tags）
- [ ] 图片已优化（使用 `npm run optimize-images`）
- [ ] 图片引用路径正确（`/assets/images/...`）
- [ ] 本地预览无错误（`npm run dev`）
- [ ] `draft: false`（否则不会发布）

**发布命令:**
```bash
# 方法1: 使用发布脚本（推荐）
npm run publish

# 方法2: 手动Git命令
git add .
git commit -m "feat: new article about XYZ"
git push
```

### 8.9 Content Migration Guide | 内容迁移指南

**从其他平台迁移:**

| 来源 | 迁移方式 |
|------|---------|
| Notion | 导出为 Markdown，手动添加 frontmatter |
| Medium | 使用 medium-exporter 工具，转换为 MD |
| WordPress | 使用 wp-export 插件，转换为 MD |
| 语雀 | 导出 Markdown，调整图片路径 |

---

## 9. Success Criteria | 成功标准

- [ ] Homepage loads in <1s on 4G / 主页在4G网络下1秒内加载
- [ ] Lighthouse score 95+ across all categories / Lighthouse所有类别95分以上
- [ ] AI chat widget accessible from all pages / AI聊天小组件可从所有页面访问
- [ ] Resources filterable by type and tag / 资源可按类型和标签过滤
- [ ] Dark mode works seamlessly / 深色模式无缝工作
- [ ] Mobile responsive (320px - 1920px) / 移动端响应式
- [ ] Newsletter signup functional / 通讯注册功能正常
- [ ] All links navigable via keyboard / 所有链接可通过键盘导航
- [ ] SEO meta tags properly configured / SEO元标签正确配置
- [ ] Obsidian workflow functional / Obsidian工作流可用
- [ ] One-command publish works / 一键发布功能正常

---

**Total Estimated Time: 8-12 hours | 总预计时间：8-12小时**

**WAITING FOR CONFIRMATION | 等待确认:** This plan covers 8 phases plus content workflow. Would you like me to proceed with implementation? / 本计划涵盖8个阶段及内容工作流。您是否希望我继续实施？

Options | 选项:
- **"yes"** / **"proceed"** - Start implementing Phase 1 | 开始实施第一阶段
- **"modify: [specific changes]"** - Adjust the plan before starting | 在开始前调整计划
- **"focus on [specific phase]"** - Start with a particular phase | 从特定阶段开始
