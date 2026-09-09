import { Container } from "@/components/layout/Container";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import { brand } from "@/lib/content";

export function IntroBand() {
  return (
    <Container className="pb-10 pt-24 text-center md:pt-28">
      <AnimatedHeading
        as="h2"
        text={brand.tagline}
        className="mx-auto max-w-4xl text-3xl md:text-4xl lg:text-[2.75rem]"
      />
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-nokia-ink-muted">
        {brand.oneLiner}
      </p>
    </Container>
  );
}
