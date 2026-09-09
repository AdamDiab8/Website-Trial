"use client";
import { Instagram, Youtube, Twitter, Facebook, Linkedin } from "lucide-react";
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";
import { brand, footer } from "@/lib/content";
import { externalLinkProps } from "@/lib/utils";

const socialIcons = {
  Instagram: <Instagram size={20} />,
  YouTube: <Youtube size={20} />,
  X: <Twitter size={20} />,
  Facebook: <Facebook size={20} />,
  LinkedIn: <Linkedin size={20} />,
} as const;

const LINK = "hover:text-[#5b8dd9] transition-colors";

/**
 * Hover-reveal footer — Nokia's real menus and links (every link opens the
 * matching page on nokia.com), a Nokia-blue radial wash, and a giant "NOKIA"
 * wordmark that reveals in Nokia blue as the cursor moves across it (desktop).
 */
export function SiteFooter() {
  return (
    <footer className="relative m-4 h-fit overflow-hidden rounded-3xl bg-[#0F0F11]/95 text-neutral-400 sm:m-8">
      <div className="relative z-40 mx-auto max-w-7xl p-8 sm:p-14">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-16">
          {/* Brand + newsletter */}
          <div className="flex flex-col space-y-4">
            <a
              href={brand.home}
              {...externalLinkProps}
              className="text-3xl font-bold tracking-tight text-white"
            >
              NOKIA
            </a>
            <p className="text-sm leading-relaxed">
              Advancing connectivity for the AI supercycle across fixed, mobile
              and transport networks.
            </p>
            <a
              href={footer.newsletter.href}
              {...externalLinkProps}
              className="mt-2 inline-block w-fit rounded bg-[#124191] px-4 py-2 text-sm text-white transition-colors hover:bg-[#0d3271]"
            >
              {footer.newsletter.label}
            </a>
          </div>

          {/* Footer link sections */}
          {footer.columns.map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 text-lg font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a href={link.href} {...externalLinkProps} className={LINK}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Support row */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 pb-8">
          {footer.support.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...externalLinkProps}
              className={`text-sm ${LINK}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Consumer note */}
        <p className="flex flex-wrap items-center gap-2 pb-8 text-sm">
          {footer.consumerNote.text}
          <a
            href={footer.consumerNote.href}
            {...externalLinkProps}
            className={`font-semibold text-[#5b8dd9] ${LINK}`}
          >
            {footer.consumerNote.cta}
          </a>
        </p>

        <hr className="my-8 border-t border-gray-700" />

        {/* Footer bottom */}
        <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {footer.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...externalLinkProps}
                aria-label={s.label}
                className={LINK}
              >
                {socialIcons[s.label as keyof typeof socialIcons]}
              </a>
            ))}
          </div>

          {/* Legal bottom bar */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-gray-500 md:justify-end">
            {footer.legal.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  {...externalLinkProps}
                  className="hover:text-[#5b8dd9]"
                >
                  {item.label}
                </a>
              ) : (
                <span key={item.label}>{item.label}</span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Giant NOKIA hover-reveal wordmark (desktop only, cursor-driven) */}
      <div className="-mb-36 -mt-52 hidden h-[30rem] lg:flex">
        <TextHoverEffect text="NOKIA" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
