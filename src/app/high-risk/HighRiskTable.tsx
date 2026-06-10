'use client';

import { useMemo, useState } from 'react';
import type { HighRiskArea, AreaCategory } from '@/lib/highrisk';

type Filter = 'all' | AreaCategory;

const CATEGORY_LABEL: Record<AreaCategory, string> = {
  'annex-iii': 'Annex III',
  'annex-i': 'Annex I product'
};

const CATEGORY_BADGE: Record<AreaCategory, string> = {
  // indigo primary - high-obligation Annex III
  'annex-iii': 'bg-low text-primary border border-primary/25',
  // amber accent - product-route Annex I
  'annex-i': 'bg-sand text-ink border border-line-strong'
};

const CHIPS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'annex-iii', label: 'Annex III use cases' },
  { value: 'annex-i', label: 'Annex I products' }
];

function CategoryBadge({ category }: { category: AreaCategory }) {
  return (
    <span
      className={`inline-flex items-center rounded-chip px-2.5 py-0.5 font-body text-xs font-semibold ${CATEGORY_BADGE[category]}`}
    >
      {CATEGORY_LABEL[category]}
    </span>
  );
}

export function HighRiskTable({ data }: { data: HighRiskArea[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data
      .filter((a) => (filter === 'all' ? true : a.category === filter))
      .filter(
        (a) =>
          q === '' ||
          a.area.toLowerCase().includes(q) ||
          a.examples.some((e) => e.toLowerCase().includes(q)) ||
          a.note.toLowerCase().includes(q)
      );
  }, [data, query, filter]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="lg:max-w-sm lg:flex-1">
          <label
            htmlFor="highrisk-search"
            className="block font-body font-medium text-sm text-ink"
          >
            Search use cases
          </label>
          <input
            id="highrisk-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            placeholder="e.g. biometrics, credit scoring, medical device"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-white px-3 py-2.5 text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {CHIPS.map((chip) => {
            const active = filter === chip.value;
            return (
              <button
                key={chip.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(chip.value)}
                className={`rounded-chip px-3.5 py-1.5 font-body text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active
                    ? 'bg-primary text-paper'
                    : 'bg-sand-tint text-ink hover:bg-sand'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="mt-4 font-mono text-xs text-accent-deep" aria-live="polite">
        {results.length} {results.length === 1 ? 'area' : 'areas'} shown
        {filter !== 'all' ? ` · ${filter === 'annex-iii' ? 'Annex III' : 'Annex I products'}` : ''}
      </p>

      {/* Table */}
      <div className="mt-3 overflow-x-auto rounded-card border border-line">
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">
            High-risk AI use cases under the EU AI Act. Columns: area, category, example use cases,
            and a compliance note.
          </caption>
          <thead>
            <tr className="bg-sand text-ink">
              <th
                scope="col"
                className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold"
              >
                Area
              </th>
              <th
                scope="col"
                className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold"
              >
                Category
              </th>
              <th
                scope="col"
                className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold"
              >
                Example use cases
              </th>
              <th
                scope="col"
                className="border-b-2 border-line-strong px-4 py-3 font-body text-sm font-semibold"
              >
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((a, i) => (
              <tr
                key={a.id}
                className={`${
                  i % 2 === 0 ? 'bg-paper' : 'bg-sand-tint'
                } hover:bg-primary/5`}
              >
                <th
                  scope="row"
                  className="px-4 py-3 font-body font-semibold text-ink align-top"
                >
                  {a.area}
                </th>
                <td className="px-4 py-3 align-top">
                  <CategoryBadge category={a.category} />
                </td>
                <td className="px-4 py-3 text-sm text-ink align-top">
                  <ul className="space-y-1">
                    {a.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-1.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" aria-hidden="true" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 text-sm text-muted align-top">
                  {a.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {results.length === 0 && (
        <p className="mt-4 text-sm text-muted">
          No areas match that search. Try a shorter term or clear the filter.
        </p>
      )}
    </div>
  );
}
