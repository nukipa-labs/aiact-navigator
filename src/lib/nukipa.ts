// Single shared Nukipa client factory.
//
// Server components and route handlers call `getNukipaClient()` to get a
// client wired with the visitor host. Edge middleware can't use Next's
// `headers()` API, so it has its own factory `getMiddlewareClient(req)`
// that takes the request directly.
//
// DO NOT bypass this file with raw fetch() calls to /public/v1/*. The SDK
// handles host resolution, caching, visitor headers, and version pinning
// so every consumer behaves consistently.

import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import {
  createNukipaClient,
  type NukipaClient
} from '@nukipa/site-sdk';

const GATEWAY_URL = process.env.NUKIPA_GATEWAY_URL;
if (!GATEWAY_URL) {
  // Fail loud at module load. Without this the first SDK call throws a
  // generic 500 on every page; the env-var error here points at the fix.
  throw new Error('NUKIPA_GATEWAY_URL is not set. Add it to .env.local (see .env.example).');
}

const TENANT_HOST = process.env.NUKIPA_TENANT_HOST?.trim() || null;

/*
 * Host-resolution priority: ACTUAL visitor host first, then
 * NUKIPA_TENANT_HOST as a fallback. The env-var override used to
 * win unconditionally, which broke GSC meta-tag verification on
 * custom domains: the SDK would ask the gateway about the staging
 * host (`<slug>.sites.nukipa.io`) even when Google was crawling
 * the live custom domain, so the tenant resolver returned via the
 * subdomain path (no `google_verification_token`), the layout's
 * meta tag stayed empty, and Google reported "verification token
 * could not be found on your site." NUKIPA_TENANT_HOST is meant as
 * a fallback for build-time / edge contexts without request
 * headers, not as a hard override.
 */

/** For server components / route handlers - reads `headers()`. */
export async function getNukipaClient(): Promise<NukipaClient> {
  const h = await headers();
  return createNukipaClient({
    gatewayUrl: GATEWAY_URL!,
    getHost:    () => h.get('x-forwarded-host') || h.get('host') || TENANT_HOST || ''
  });
}

/** For edge middleware - `headers()` is unavailable; pass the NextRequest. */
export function getMiddlewareClient(req: NextRequest): NukipaClient {
  return createNukipaClient({
    gatewayUrl:   GATEWAY_URL!,
    getHost:      () => req.headers.get('x-forwarded-host') || req.headers.get('host') || TENANT_HOST || '',
    getIp:        () => req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
    getUserAgent: () => req.headers.get('user-agent'),
    getReferer:   () => req.headers.get('referer')
  });
}
