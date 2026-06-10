import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { HERO_COMPASS } from '@/lib/images';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <ContourBackground />
      <Container className="relative z-10 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="max-w-2xl">
            <RevealOnScroll>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-accent-deep">
                Your EU AI Act resource hub
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <h1 className="mt-4 font-display font-semibold text-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.08]">
                Make sense of the EU AI Act, fast.
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <p className="mt-5 text-lg lg:text-xl text-ink/80 leading-relaxed">
                Plain-English answers, free tools, and updates you can trust, for any
                company that builds or uses AI. We read the regulation so you don&apos;t have to.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={3}>
              <p className="mt-4 font-display text-lg lg:text-xl text-primary">
                Find your way through the EU AI Act.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={4}>
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <Button href="/checklist" variant="primary">
                  Get the AI Act Checklist
                </Button>
                <Button href="/tools" variant="ghost">
                  Explore the free tools &rarr;
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={2} direction="right">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.25rem] bg-accent/10 blur-2xl"
              />
              <Image
                src={HERO_COMPASS.src}
                alt={HERO_COMPASS.alt}
                width={HERO_COMPASS.width}
                height={HERO_COMPASS.height}
                priority
                className="relative w-full rounded-card border border-line/60 shadow-[0_24px_60px_-24px_rgba(30,27,75,0.45)]"
              />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
