# AI Act Navigator

The free, plain-English hub for the **EU AI Act** (Regulation (EU) 2024/1689) —
[aiact-navigator.com](https://aiact-navigator.com).

Independent guidance, free tools and trustworthy updates for any company that
builds or uses AI: a Risk-Tier Classifier, a provider-vs-deployer obligations
checker, a high-risk (Annex III) lookup, a glossary, a living deadline tracker,
and gated PDF lead magnets — all kept current as the rules move (incl. the
proposed Digital Omnibus, flagged as not-yet-law).

## Stack

- **Next.js 15** (App Router) + **React 19** + **Tailwind v4**
- **`@nukipa/site-sdk`** + **`@nukipa/post-renderer-react`** — runtime content,
  forms, analytics, and the blog/CMS integration
- Type system: **Spectral** (display) + **Hanken Grotesk** (body); indigo + amber theme

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run sanitize   # normalise smart quotes / unicode in source
```

Runtime config (baked in `next.config.mjs`, overridable via `.env.local`):

- `NUKIPA_GATEWAY_URL` / `NEXT_PUBLIC_NUKIPA_GATEWAY_URL` — Nukipa public API
- `NUKIPA_TENANT_HOST` — `aiact.nukipa.com`

## Lead magnets

Designed PDFs in `public/downloads/` are generated with Typst from
`../pdf-build/typst/` (shared brand kit in `brandkit.typ`):

- `ai-act-readiness-checklist.pdf`
- `ai-literacy-starter-kit.pdf`
- `ai-system-inventory-guide.pdf` (+ `ai-system-inventory-template.csv`)

## Notes

Guidance, not legal advice. Every regulatory claim is sourced to EUR-Lex / the
European Commission / the AI Act Explorer. Not affiliated with the EU.
