# Obsidian Configuration for Brand Site

This directory contains Obsidian workspace settings for content management.

## Setup

1. Open Obsidian
2. Select "Open folder as vault"
3. Navigate to and select the `content/` directory

## Folder Structure

```
content/
├── .obsidian/          # Obsidian workspace settings (git-ignored)
├── articles/           # All article content
│   ├── _templates/     # Article templates
│   └── drafts/         # Draft articles (optional)
└── assets/             # Images and media
    ├── images/         # Inline images
    └── covers/         # Article cover images
```

## Templates

Available templates in `articles/_templates/`:
- `article-template.md` - Basic article template
- `tutorial-template.md` - Step-by-step tutorial template
- `tips-template.md` - Quick tips and tricks template

## Configuration Details

- **New files location**: `articles/` folder
- **Attachment folder**: `assets/images/`
- **Templates folder**: `articles/_templates/`
- **Date format**: `YYYY-MM-DD`
- **Link format**: Shortest path
- **Markdown links**: Enabled

## Best Practices

1. Use templates for consistency
2. Keep frontmatter updated
3. Place images in `assets/images/`
4. Use relative paths for images: `/assets/images/filename.jpg`
5. Mark drafts with `draft: true` in frontmatter
6. Use descriptive slugs for SEO

## Git Workflow

1. Create/edit content in Obsidian
2. Run `npm run publish` to commit and push
3. Changes trigger automatic Vercel deployment
