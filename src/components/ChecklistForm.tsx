'use client';

import { useState, type FormEvent } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PDF_URL = '/downloads/ai-act-readiness-checklist.pdf';

// Email-gated download: capture name, company and email, then start the
// download. Covers providers, deployers, and both.
export function ChecklistForm() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = PDF_URL;
    a.download = 'ai-act-readiness-checklist.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setStatus('error');
      setError('Please add your name.');
      return;
    }
    if (!company.trim()) {
      setStatus('error');
      setError('Please add your company.');
      return;
    }
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
          slug: 'readiness-checklist',
          name: name.trim(),
          company: company.trim(),
          email,
          source: 'checklist-page'
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
          If it does not start automatically, use the button below.
        </p>
        <a
          href={PDF_URL}
          download
          className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97]"
        >
          Download the checklist (PDF)
        </a>
      </div>
    );
  }

  const inputClass =
    'mt-1.5 min-h-[44px] w-full rounded-md border border-line bg-white px-3.5 text-ink placeholder:text-muted focus:border-accent focus:outline focus:outline-2 focus:outline-accent focus:outline-offset-2';

  return (
    <form onSubmit={onSubmit} className="rounded-card border border-line bg-card p-6">
      <p className="text-ink font-medium">Get the AI Act Readiness Checklist, free.</p>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        Tell us where to send it and your download will start. One plain-English PDF, covering
        providers, deployers, and SMEs.
      </p>

      <div className="mt-4">
        <label htmlFor="cl-name" className="block font-body font-medium text-ink text-sm">
          Name
        </label>
        <input
          id="cl-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="cl-company" className="block font-body font-medium text-ink text-sm">
          Company
        </label>
        <input
          id="cl-company"
          type="text"
          autoComplete="organization"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Your company"
          className={inputClass}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="cl-email" className="block font-body font-medium text-ink text-sm">
          Email
        </label>
        <input
          id="cl-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputClass}
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
        className="mt-5 min-h-[48px] w-full rounded-md bg-accent px-6 font-body font-semibold text-ink transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-out)] hover:[transform:translateY(-2px)] hover:shadow-[var(--shadow-cta-hover)] active:scale-[0.97] disabled:opacity-50"
      >
        {status === 'loading' ? 'Preparing...' : 'Download the checklist'}
      </button>

      <p className="mt-3 text-xs text-muted">No spam. Unsubscribe any time.</p>
    </form>
  );
}
