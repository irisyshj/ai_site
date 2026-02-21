import { NextResponse } from 'next/server';
import { resources } from '@/data/resources';
import { siteConfig } from '@/data/site';

export const dynamic = 'force-static';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toUTCString();
}

export async function GET() {
  const baseUrl = siteConfig.url;

  const rssItems = resources
    .filter((resource) => resource.featured)
    .map((resource) => {
      const itemUrl = resource.external
        ? resource.url
        : `${baseUrl}${resource.url}`;

      return `
    <item>
      <title>${escapeXml(resource.title)}</title>
      <description>${escapeXml(resource.description)}</description>
      <link>${escapeXml(itemUrl)}</link>
      <guid>${escapeXml(itemUrl)}</guid>
      <pubDate>${formatDate(resource.datePublished)}</pubDate>
      <category>${escapeXml(resource.type)}</category>
      ${resource.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} - Resources</title>
    <description>${escapeXml(siteConfig.description)} - Featured resources and articles</description>
    <link>${baseUrl}/resources</link>
    <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${formatDate(new Date().toISOString())}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
