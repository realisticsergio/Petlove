import type { Metadata } from 'next';
import NewsPageClient from '@/components/news/NewsPageClient';

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news and helpful stories for pet lovers.',
};

export default function NewsPage() {
  return <NewsPageClient />;
}
