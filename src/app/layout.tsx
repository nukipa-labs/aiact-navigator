import type { Metadata } from 'next';
import { NukipaFeedback } from '@/components/NukipaFeedback';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { JsonLd } from '@/components/ui';
import { ORGANIZATION, WEBSITE } from '@/lib/schema';
import { displayFont, bodyFont, monoFont } from '@/lib/fonts';
import { getNukipaClient } from '@/lib/nukipa';
import './globals.css';

// PLATFORM CONTRACT: <NukipaFeedback /> must remain inside <body> for the
// design-review feedback loop. Do not remove.

const baseMetadata: Metadata = {
  metadataBase: new URL('https://aiact-navigator.com'),
  title: {
    default: 'AI Act Navigator: the plain-English EU AI Act hub',
    template: '%s · AI Act Navigator'
  },
  description:
    'Plain-English answers, free tools and trustworthy updates on the EU AI Act (Regulation (EU) 2024/1689), for any company that builds or uses AI.',
  applicationName: 'AI Act Navigator',
  openGraph: {
    type: 'website',
    siteName: 'AI Act Navigator',
    title: 'AI Act Navigator: the plain-English EU AI Act hub',
    description:
      'Find your way through the EU AI Act. Plain-English answers, free tools and updates you can trust.',
    url: 'https://aiact-navigator.com',
    images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: 'AI Act Navigator' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Act Navigator: the plain-English EU AI Act hub',
    description:
      'Find your way through the EU AI Act. Plain-English answers, free tools and updates you can trust.',
    images: ['/brand/og.png']
  },
  alternates: { canonical: '/' }
};

/**
 * Dynamic metadata so the Google Search Console meta-tag verification
 * works for site-attached domains too. The platform stores the token
 * per-(tenant_domain) and returns it via `/public/v1/tenant` when the
 * incoming request's host matches a custom domain row. Without this,
 * `signals.gsc_verify` advances the row from `not_registered` →
 * `pending` (Google issues the token) but `pending → verified` fails
 * - Google fetches the site root, doesn't find the meta tag, and
 * reports "The necessary verification token could not be found on
 * your site."
 *
 * Caught + swallowed: a flaky gateway shouldn't 500 the page, the
 * meta tag is best-effort. PublicTenant in the SDK doesn't yet
 * enumerate this field; the server payload always includes it on the
 * custom-domain resolver path.
 */
export async function generateMetadata(): Promise<Metadata> {
  let googleVerification: string | undefined;
  try {
    const client = await getNukipaClient();
    const tenant = await client.getTenant();
    const token  = (tenant as { google_verification_token?: string | null } | null)?.google_verification_token;
    if (token) googleVerification = token;
  } catch {
    /* gateway flaky? still render. */
  }
  return googleVerification
    ? { ...baseMetadata, verification: { google: googleVerification } }
    : baseMetadata;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400..700,0..1,0&display=block"
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <JsonLd data={[ORGANIZATION, WEBSITE]} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <NukipaFeedback />
      </body>
    </html>
  );
}
