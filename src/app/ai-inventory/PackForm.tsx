'use client';

import { useState, type FormEvent } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PDF_URL = '/downloads/ai-system-inventory-guide.pdf';
const CSV_URL = '/downloads/ai-system-inventory-template.csv';

export function PackForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = PDF_URL;
    a.download = 'ai-system-inventory-guide.pdf';
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
          slug: 'ai-inventory',
          email,
          source: 'ai-inventory-page'
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
          The AI System Inventory guide (PDF). If it does not start automatically, use the button
          below - and grab the editable CSV template too.
        </p>
        <a
          href={PDF_URL}
          download
          className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97]"
        >
          Download the guide (PDF)
        </a>
        <a
          href={CSV_URL}
          download
          className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-line bg-white px-5 font-body font-semibold text-ink transition-colors hover:bg-sand-tint"
        >
          Download the editable template (CSV)
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
      <p className="text-ink font-medium">
        Get the AI System Inventory pack, free.
      </p>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        Pop in your email and your download will start: a plain-English guide (PDF) plus the
        ready-to-fill template (CSV). We&apos;ll add you to The AI Act Brief so you hear when the
        rules change.
      </p>

      <div className="mt-4">
        <label htmlFor="pack-email" className="block font-body font-medium text-ink text-sm">
          Email
        </label>
        <input
          id="pack-email"
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
        {status === 'loading' ? 'Preparing...' : 'Download the inventory pack'}
      </button>

      <p className="mt-4 text-xs text-muted leading-relaxed">
        Free. No spam. This adds you to The AI Act Brief - our free plain-English newsletter.
        Unsubscribe any time, in one click.
      </p>
    </form>
  );
}
