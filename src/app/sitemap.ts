import type { MetadataRoute } from 'next';
import { TOPICS } from '@/lib/topics';

const BASE = 'https://aiact-navigator.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/ai-act', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/timeline', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/risk-classifier', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/topics', priority: 0.8, changeFrequency: 'monthly' },
    // topic subpages added below
    { path: '/obligations', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/high-risk', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ai-inventory', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ai-governance', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/iso-42001', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ai-literacy', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/glossary', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/checklist', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/subscribe', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/legal/imprint', priority: 0.3, changeFrequency: 'yearly' }
  ];

  for (const t of TOPICS) {
    routes.push({ path: `/topics/${t.slug}`, priority: 0.7, changeFrequency: 'monthly' });
  }

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority
  }));
}
