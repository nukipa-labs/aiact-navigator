import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { JsonLd } from '@/components/ui/JsonLd';
import { ChecklistForm } from '@/components/ChecklistForm';
import { webPage, breadcrumb } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Free AI Act Readiness Checklist (PDF) | AI Act Navigator',
  description:
    'A plain-English EU AI Act readiness checklist that walks you from "what is this?" to documented compliance. Free PDF, covering providers, deployers, and SMEs.',
  alternates: { canonical: '/checklist' }
};

const INSIDE = [
  'A role check up front - provider, deployer, or both - so you follow the obligations that actually apply to you.',
  'The Article 4 AI literacy step: what it requires, how to document your programme, and why it is already in force.',
  'A risk classification walkthrough: prohibited, high-risk (Annex I and Annex III), limited-transparency, and minimal.',
  'High-risk provider steps in order: risk management, technical documentation, conformity assessment, CE marking, registration.',
  'High-risk deployer steps: instructions for use, human oversight assignment, log-keeping, and FRIA where required.',
  'GPAI model provider obligations (Chapter V): technical documentation, copyright policy, training data summary, and systemic-risk duties.',
  'The key deadlines - what is already in force (2 Feb 2025 and 2 Aug 2025) and what is still upcoming - with the Digital Omnibus proposal flagged where it affects dates.',
  'The official sources behind each step, so it stays checkable.'
];

export default function ChecklistPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            ...webPage({
              name: 'Free AI Act Readiness Checklist (PDF)',
              path: '/checklist',
              description:
                'A plain-English EU AI Act readiness checklist that walks you from "what is this?" to documented compliance. Free PDF, covering providers, deployers, and SMEs.'
            }),
            primaryImageOfPage: 'https://aiact-navigator.com/brand/checklist-cover.jpg'
          },
          breadcrumb([{ name: 'AI Act Readiness Checklist', path: '/checklist' }])
        ]}
      />

      {/* Hero + gate, side by side */}
      <section className="relative overflow-hidden bg-paper">
        <ContourBackground />
        <Container className="relative z-10 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
                Free PDF
              </p>
              <h1 className="mt-4 font-display font-semibold text-4xl lg:text-5xl text-ink leading-tight">
                Every step to get AI Act-ready, on one checklist.
              </h1>
              <p className="mt-5 text-lg text-ink/80 leading-relaxed">
                A plain-English readiness checklist that walks you from &ldquo;what is this?&rdquo; to
                documented compliance with the EU AI Act. One free PDF covering providers,
                deployers, and SMEs, so you can follow the steps that apply to you.
              </p>
            </div>
            <RevealOnScroll delay={1}>
              <div className="flex flex-col gap-5">
                <Image
                  src="/brand/checklist-cover.jpg"
                  alt="First page of the AI Act Readiness Checklist PDF"
                  width={827}
                  height={1170}
                  priority
                  className="w-full max-w-[320px] self-center rounded-card border border-line shadow-[0_18px_40px_-16px_rgba(15,42,63,0.35)]"
                />
                <ChecklistForm />
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* What's inside */}
      <Section background="sand" title="What's inside">
        <ul className="grid gap-4 sm:grid-cols-2">
          {INSIDE.map((item, i) => (
            <RevealOnScroll key={item} delay={i}>
              <li className="flex gap-3 rounded-card border border-line bg-card p-5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-ink">{item}</span>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </Section>

      {/* Three paths */}
      <Section background="paper" title="Built for providers, deployers, and SMEs">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display font-semibold text-xl text-ink">For providers</h3>
            <p className="mt-3 text-ink/80 leading-relaxed">
              Every obligation under Chapter III - risk management system, technical documentation,
              conformity assessment, CE marking, EU database registration, and post-market
              monitoring - explained in plain English and in the right order.
            </p>
          </div>
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display font-semibold text-xl text-ink">For deployers</h3>
            <p className="mt-3 text-ink/80 leading-relaxed">
              Article 26 obligations step by step: use the system according to instructions, assign
              human oversight, keep logs for 6 months, monitor operation, and carry out a FRIA if
              required. Includes GPAI deployer notes.
            </p>
          </div>
          <div className="rounded-card border border-line bg-card p-6">
            <h3 className="font-display font-semibold text-xl text-ink">For SMEs</h3>
            <p className="mt-3 text-ink/80 leading-relaxed">
              For companies without a dedicated compliance team: a prioritised path covering the
              obligations most likely to apply to a smaller organisation, including the
              proportionality provisions and the AI literacy duty already in force.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          All three paths are in one checklist. Follow the sections that apply to your role and size.
        </p>
      </Section>

      {/* Who it's for */}
      <Section background="forest" title="Who this is for">
        <p className="max-w-2xl text-paper/85 leading-relaxed">
          Anyone who has been handed &ldquo;the AI Act&rdquo; and needs to know what to do first.
          Whether you develop AI products, use AI tools in your business, manage a compliance
          programme, or advise clients on AI regulation, the checklist gives you a clear order
          to work in and a way to track your progress.
        </p>
      </Section>
    </>
  );
}
