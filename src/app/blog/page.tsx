import type { Metadata } from 'next';
import Link from 'next/link';
import { getNukipaClient } from '@/lib/nukipa';
import { PostCard } from '@/components/PostCard';
import { Container } from '@/components/ui/Container';

// Revalidate the listing every minute. Posts are published from the
// Nukipa dashboard, not committed to this repo; ISR keeps the listing
// fresh without redeploying.
export const revalidate = 60;

export const metadata: Metadata = {
  title:       'EU AI Act Insights',
  description:
    'Plain-English EU AI Act explainers and updates: risk tiers, provider vs deployer obligations, the AI Act timeline and what each change means for you.',
  alternates: { canonical: '/blog' }
};

export default async function BlogIndex() {
  const client = await getNukipaClient();
  const posts  = await client.listPosts({ limit: 50 });

  return (
    <main className="bg-paper py-20 lg:py-24">
      <Container>
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
            Insights
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-[-0.01em] text-ink lg:text-5xl">
            EU AI Act Insights
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-[color:var(--color-text-muted)] lg:text-lg">
            Plain-English EU AI Act explainers and updates, written for the people
            who have to comply. New entries land here as the rules move.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-card border border-line bg-card p-8 lg:p-10">
            <p className="font-body text-base leading-relaxed text-[color:var(--color-text-muted)]">
              The first articles are coming soon. Subscribe to The AI Act Brief to
              get them.
            </p>
            <Link
              href="/subscribe"
              className="mt-5 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-[2px] hover:shadow-[0_8px_22px_-6px_var(--color-accent-shadow)] active:scale-[0.97]"
            >
              Subscribe to The AI Act Brief
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
