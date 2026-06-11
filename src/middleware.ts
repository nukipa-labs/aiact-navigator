import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';
import { getMiddlewareClient } from '@/lib/nukipa';

/**
 * IndexNow ownership-check file. The IndexNow API only accepts URL pings
 * if it can also fetch a file at the site root whose name (without `.txt`)
 * and body both equal the tenant's `indexnow_key`. Without this, every
 * SEO push from `services/cms` for a Site host fails 403 and the audit
 * trail fills with "key file not found" rows.
 *
 * Implemented in middleware (not a `app/[key]/route.ts`) on purpose: a
 * file-based dynamic route compiles to `/:key` and the router treats the
 * `.txt` literal as part of the parameter, which made it shadow every
 * single-segment app route (`/blog`, `/about`, ...) returning 404 for
 * filenames that aren't hex. We match strictly here - only paths shaped
 * like `/<hex16-128>.txt` are served from this handler; everything else
 * falls through to the regular page render.
 */
const INDEXNOW_KEY_PATH_RE = /^\/([a-f0-9]{16,128})\.txt$/i;

/**
 * Fire-and-forget page-view ping on every page navigation.
 *
 * The Nukipa platform tracks tenant visits via /public/v1/signals/visits;
 * the SDK's `recordVisit` handles the request shape, the session-cookie
 * cycle (`nk_sid`), and swallowing errors so a slow gateway can never
 * block a page load.
 *
 * We deliberately do NOT await the ping - the response goes out the
 * door while the visit row is being inserted server-side.
 */
export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const url    = req.nextUrl;
  const client = getMiddlewareClient(req);

  // IndexNow key file - short-circuit before the visit ping so the
  // ownership crawler's hits never land in signals.visits.
  const indexnowMatch = url.pathname.match(INDEXNOW_KEY_PATH_RE);
  if (indexnowMatch) {
    const filename = indexnowMatch[1]!;
    try {
      // `getTenantSeo` may not exist on the installed SDK version; call it
      // defensively so the build never breaks and it works once available.
      type TenantSeo = { indexnow_enabled?: boolean; indexnow_key?: string };
      const seoClient = client as unknown as { getTenantSeo?: () => Promise<TenantSeo | null> };
      const seo = seoClient.getTenantSeo ? await seoClient.getTenantSeo() : null;
      if (seo && seo.indexnow_enabled !== false && seo.indexnow_key === filename) {
        return new NextResponse(seo.indexnow_key, {
          status: 200,
          headers: {
            'Content-Type':  'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    } catch {
      /* fall through to 404 - never leak a gateway error from this surface. */
    }
    return new NextResponse('not found', { status: 404 });
  }

  const res = NextResponse.next();

  // Track via event.waitUntil — NOT bare fire-and-forget. Vercel's edge runtime
  // freezes the function once the response returns, dropping any in-flight async
  // work that isn't registered with waitUntil; visits were under-recorded as a
  // result. The SDK still swallows errors so a slow gateway never blocks nav.
  event.waitUntil(
    client.recordVisit({
      path:       url.pathname,
      session_id: req.cookies.get('nk_sid')?.value || null,
      utm: {
        source:   url.searchParams.get('utm_source')   || undefined,
        medium:   url.searchParams.get('utm_medium')   || undefined,
        campaign: url.searchParams.get('utm_campaign') || undefined,
        content:  url.searchParams.get('utm_content')  || undefined
      }
    })
  );

  return res;
}

/**
 * Skip static assets + Next internals + API routes. Without this filter
 * we'd record a visit for every JS chunk, image, and favicon hit.
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpe?g|webp|gif|svg|ico|woff2?|css|js|map)).*)'
  ]
};
