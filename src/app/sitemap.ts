import type { MetadataRoute } from 'next';
import { TOPICS } from '@/lib/topics';

const BASE = 'https://aiact-navigator.com';

// ISR: regenerate hourly so newly published Insights posts appear without a
// redeploy (the build-time gateway fetch can be empty in restricted contexts).
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/ai-act', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/timeline', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/risk-classifier', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
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

  const entries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: r.path === '/' ? BASE : `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority
  }));

  // Published Insights posts (best-effort: never break the sitemap).
  try {
    const gateway = process.env.NUKIPA_GATEWAY_URL;
    const host = process.env.NUKIPA_TENANT_HOST;
    if (gateway && host) {
      const res = await fetch(`${gateway}/public/v1/posts?limit=200`, {
        headers: { 'X-Forwarded-Host': host },
        next: { revalidate: 300 }
      });
      if (res.ok) {
        const json = await res.json().catch(() => null);
        const posts: { slug?: string; published_at?: string }[] = json?.data ?? json ?? [];
        for (const p of posts) {
          if (!p?.slug) continue;
          entries.push({
            url: `${BASE}/blog/${p.slug}`,
            lastModified: p.published_at ? new Date(p.published_at) : now,
            changeFrequency: 'monthly',
            priority: 0.6
          });
        }
      }
    }
  } catch {
    /* gateway flaky: ship the static sitemap. */
  }

  return entries;
}
