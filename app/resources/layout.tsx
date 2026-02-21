import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources Hub | Brand Site',
  description: 'Explore curated articles, videos, PDFs, podcasts, and tools about AI, productivity, and technology.',
  keywords: ['resources', 'articles', 'videos', 'AI', 'productivity', 'tutorials'],
  openGraph: {
    title: 'Resources Hub | Brand Site',
    description: 'Explore curated articles, videos, PDFs, podcasts, and tools about AI, productivity, and technology.',
    type: 'website',
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
