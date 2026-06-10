import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ContourBackground } from '@/components/ui/ContourBackground';
import { RevealOnScroll } from '@/components/ui/RevealOnScroll';

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-primary text-paper py-16 lg:py-24">
      <ContourBackground className="opacity-50" />
      <Container className="relative z-10">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-semibold text-3xl lg:text-4xl text-paper leading-tight">
              Stay ahead of the next AI Act change.
            </h2>
            <p className="mt-4 text-paper/80 text-base lg:text-lg">
              Free, plain-English updates. We watch Brussels so you don&apos;t.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button href="/checklist" variant="primary">
                Get the AI Act Checklist
              </Button>
              <Link
                href="/subscribe"
                className="text-sm font-medium text-paper/85 link-underline hover:text-paper"
              >
                Or just subscribe to The AI Act Brief &rarr;
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
