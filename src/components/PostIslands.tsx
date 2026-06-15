'use client';

// Client-side hydration for CMS post islands that @nukipa/post-renderer-react
// (0.2.x) does NOT hydrate itself. PostBody's `hydrateIslands` only wires up
// CTAs, lead/contact forms and carousels — `widget` and `chart` islands are
// emitted as inert placeholders (an empty `.inline-widget-container` and a
// blank `<canvas>`). Without this component they render as empty boxes.
//
//   • widget — a full, self-contained HTML document the gateway generated
//     (its own <style>/<script>). We inject it into an <iframe srcdoc> and
//     auto-size the frame to its content. Matches the public Nukipa site,
//     whose CSS already styles `.inline-widget-container iframe`.
//   • chart  — a `<canvas>` plus a `data-chart` JSON payload in Chart.js
//     shape ({ type, data, options }). We lazy-load Chart.js and draw it.
//
// Mounted once after <PostBody> on the post detail page. Idempotent: each
// island is marked `data-hydrated` so re-renders/Strict-Mode double-invokes
// don't double-inject.

import { useEffect } from 'react';

export type PostWidget = { id: string; html: string };

export function PostIslands({ widgets }: { widgets: PostWidget[] }) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    let cancelled = false;

    // ── Widgets → iframe srcdoc ──────────────────────────────────────────
    const widgetHtml = new Map(widgets.map((w) => [w.id, w.html]));
    const widgetEls = document.querySelectorAll<HTMLElement>(
      '.inline-widget-container[data-island="widget"]'
    );
    widgetEls.forEach((el) => {
      if (el.dataset.hydrated) return;
      const id = el.getAttribute('data-widget-id') || '';
      const html = widgetHtml.get(id);
      if (!html) return;
      el.dataset.hydrated = '1';

      const iframe = document.createElement('iframe');
      iframe.title = 'Interactive widget';
      iframe.loading = 'lazy';
      // Trusted, platform-generated content (same gateway as the post body),
      // so the frame stays same-origin (srcdoc) — required to measure its
      // content height for auto-resize. No `sandbox` for the same reason.
      iframe.srcdoc = html;

      const resize = () => {
        try {
          const doc = iframe.contentDocument;
          if (doc?.documentElement) {
            iframe.style.height = `${doc.documentElement.scrollHeight}px`;
          }
        } catch {
          /* cross-origin guard — never happens for srcdoc, but stay safe */
        }
      };

      iframe.addEventListener('load', () => {
        resize();
        // Interactive widgets grow/shrink as the user clicks; keep the frame
        // in step via a ResizeObserver on its document, plus a couple of
        // delayed re-measures for late fonts/layout.
        try {
          const doc = iframe.contentDocument;
          if (doc?.documentElement && 'ResizeObserver' in window) {
            const ro = new ResizeObserver(resize);
            ro.observe(doc.documentElement);
            cleanups.push(() => ro.disconnect());
          }
        } catch {
          /* ignore */
        }
        const t1 = window.setTimeout(resize, 300);
        const t2 = window.setTimeout(resize, 1200);
        cleanups.push(() => {
          window.clearTimeout(t1);
          window.clearTimeout(t2);
        });
      });

      el.appendChild(iframe);
    });

    // ── Charts → Chart.js ────────────────────────────────────────────────
    const chartEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-island="chart"]')
    ).filter((el) => !el.dataset.hydrated);

    if (chartEls.length > 0) {
      import('chart.js/auto')
        .then(({ default: Chart }) => {
          if (cancelled) return;
          chartEls.forEach((el) => {
            if (el.dataset.hydrated) return;
            const raw = el.getAttribute('data-chart');
            const canvas = el.querySelector('canvas');
            if (!raw || !canvas) return;
            let cfg: { type?: string; data?: unknown; options?: object } | null = null;
            try {
              cfg = JSON.parse(raw);
            } catch {
              return;
            }
            if (!cfg?.type || !cfg.data) return;
            el.dataset.hydrated = '1';
            // The renderer uses "donut"; Chart.js calls it "doughnut".
            const type = cfg.type === 'donut' ? 'doughnut' : cfg.type;
            // Chart.js's config generics are strict; the payload is dynamic
            // CMS data, so build the config loosely and let Chart validate.
            const config = {
              type,
              data: cfg.data,
              options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } },
                ...(cfg.options || {})
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any;
            const chart = new Chart(canvas, config);
            cleanups.push(() => chart.destroy());
          });
        })
        .catch(() => {
          /* chart.js failed to load — leave the (empty) canvas, don't crash */
        });
    }

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [widgets]);

  return null;
}
