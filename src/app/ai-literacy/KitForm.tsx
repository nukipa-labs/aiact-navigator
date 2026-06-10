'use client';

import { useState, type FormEvent } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PDF_URL = '/downloads/ai-literacy-starter-kit.pdf';

// Submits through the same-origin /api/lead proxy (which sets the tenant
// X-Forwarded-Host server-side) rather than posting cross-origin to the
// gateway directly - the latter fails in the browser (no tenant host + a
// credentialed CORS request the gateway doesn't allow).
export function KitForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = PDF_URL;
    a.download = 'ai-literacy-starter-kit.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setError("That doesn't look like a valid email address. Mind checking it?");
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: 'ai-literacy-kit',
          name: name.trim(),
          company: company.trim(),
          email,
          source: 'ai-literacy-page'
        })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus('done');
        triggerDownload();
      } else {
        setStatus('error');
        setError(data?.error || `We couldn't submit that just now. Please try again.`);
      }
    } catch {
      setStatus('error');
      setError(`We couldn't submit that just now. Please try again.`);
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-card border border-line bg-card p-6">
        <p className="text-ink font-medium">Your download is starting.</p>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          The AI Literacy Starter Kit (PDF) - gap-assessment worksheet, role-based training matrix,
          and completion log. If it does not start automatically, use the button below.
        </p>
        <a
          href={PDF_URL}
          download
          className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97]"
        >
          Download the kit (PDF)
        </a>
        <p className="mt-4 text-sm text-muted leading-relaxed">
          You&apos;ve also joined The AI Act Brief, our free plain-English newsletter, so you hear
          when the rules change. Unsubscribe any time, in one click.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-line bg-card p-6">
      <p className="font-display text-lg font-semibold text-ink">Get the AI Literacy Starter Kit</p>
      <p className="mt-1 text-sm text-muted leading-relaxed">
        A gap-assessment worksheet, role-based training matrix, and completion log template - free.
      </p>

      <div className="mt-4">
        <label htmlFor="kit-email" className="block font-body font-medium text-ink text-sm">
          Work email <span className="text-danger">*</span>
        </label>
        <input
          id="kit-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="mt-1.5 min-h-[44px] w-full rounded-md border border-line bg-white px-3.5 text-ink placeholder:text-muted focus:border-accent focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="kit-name" className="block font-body font-medium text-ink text-sm">
          Your name <span className="text-danger">*</span>
        </label>
        <input
          id="kit-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mt-1.5 min-h-[44px] w-full rounded-md border border-line bg-white px-3.5 text-ink placeholder:text-muted focus:border-accent focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="kit-company" className="block font-body font-medium text-ink text-sm">
          Company
        </label>
        <input
          id="kit-company"
          type="text"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Your company (optional)"
          className="mt-1.5 min-h-[44px] w-full rounded-md border border-line bg-white px-3.5 text-ink placeholder:text-muted focus:border-accent focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-3 text-danger text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-5 min-h-[44px] w-full rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send me the kit'}
      </button>

      <p className="mt-4 text-xs text-muted leading-relaxed">
        Free. No spam. This adds you to The AI Act Brief - our free plain-English newsletter.
        Unsubscribe any time, in one click.
      </p>
    </form>
  );
}
