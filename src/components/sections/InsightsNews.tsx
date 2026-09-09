import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Button } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import {
  ExpandableGallery,
  type GalleryItem,
} from "@/components/ui/gallery-animation";
import { insights, insightSubLinks, news } from "@/lib/content";

const galleryItems: GalleryItem[] = insights.map((item) => ({
  image: item.image,
  label: item.kind.toUpperCase(),
  headline: item.title,
  href: "#",
  isVideo: item.kind === "Video",
}));

/** Section 7 — "Explore the latest from Nokia" hover-expand gallery. */
export function InsightsGallery() {
  return (
    <Container className="py-24 md:py-28">
      <AnimatedHeading
        as="h2"
        text="Explore the latest from Nokia"
        className="text-3xl md:text-4xl"
      />

      <ExpandableGallery items={galleryItems} className="mt-12" />

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        {insightSubLinks.map((link) => (
          <ArrowLink key={link.label} href={link.href}>
            {link.label}
          </ArrowLink>
        ))}
      </div>
    </Container>
  );
}

/** Section 7b — dated "Latest news" list. May exceed 100vh. */
export function LatestNews() {
  return (
    <div className="w-full bg-white/[0.02] py-24 md:py-28">
      <Container>
        <AnimatedHeading
          as="h2"
          text="Latest news"
          className="text-3xl md:text-4xl"
        />

        <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {news.map((item) => (
            <li key={item.title}>
              <a
                href="#"
                className="flex flex-col gap-1 py-5 transition-colors hover:bg-white/[0.03] sm:flex-row sm:items-baseline sm:gap-6"
              >
                <time className="shrink-0 text-sm font-semibold text-nokia-ink-muted sm:w-28">
                  {item.date}
                </time>
                <span className="text-lg leading-snug text-nokia-ink hover:text-nokia-blue-light">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button variant="outline">More in our newsroom</Button>
        </div>
      </Container>
    </div>
  );
}
