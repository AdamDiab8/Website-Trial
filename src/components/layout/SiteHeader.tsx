import { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import { Container } from "./Container";
import { brand, megaMenus, utilityNav, type MegaMenu } from "@/lib/content";
import { cn, externalLinkProps } from "@/lib/utils";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Set briefly while Escape returns focus to a trigger, so that focus event
  // does not immediately re-open the menu we just closed.
  const suppressFocusOpen = useRef(false);

  // Solid treatment: scrolled past the hero, a mega-menu is open, or the mobile
  // drawer is open — the bar gets a dark navy background. Otherwise it is
  // transparent over the hero. Text and logo stay light in both states.
  const solid = scrolled || openMenu !== null || mobileOpen;

  // Toggle the solid bar once the header has travelled past the hero section.
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const threshold = heroEl ? heroEl.offsetHeight - 72 : 400;
        setScrolled(window.scrollY > threshold);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Escape closes an open mega-menu and returns focus to its trigger.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMenu) {
        const el = triggerRefs.current[openMenu];
        setOpenMenu(null);
        suppressFocusOpen.current = true;
        el?.focus();
        window.setTimeout(() => {
          suppressFocusOpen.current = false;
        }, 0);
      } else if (mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu, mobileOpen]);

  // Lock body scroll while the mobile drawer is open; close it on resize to desktop.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const openNow = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const linkColor = "text-nokia-ink/85 hover:text-white";

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!headerRef.current?.contains(e.relatedTarget as Node))
          setOpenMenu(null);
      }}
    >
      {/* Utility strip */}
      <div
        className={cn(
          "hidden transition-colors duration-300 lg:block",
          solid
            ? "border-b border-white/10 bg-nokia-navy/95"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-9 items-center justify-end gap-6 text-xs">
          {utilityNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...externalLinkProps}
              className="inline-flex items-center gap-1 text-nokia-ink/80 transition-colors hover:text-white"
            >
              {item.label}
              <ChevronDown className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
        </Container>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-colors duration-300",
          solid
            ? "border-b border-white/10 bg-nokia-navy/95 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.8)] backdrop-blur"
            : "border-b border-transparent bg-transparent backdrop-blur-[2px]",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <a
            href={brand.home}
            {...externalLinkProps}
            className="flex items-center"
            aria-label="Nokia home"
          >
            <img src="/images/logo-white.png" alt="Nokia" className="h-6 w-auto" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-stretch gap-1 lg:flex" aria-label="Primary">
            {megaMenus.map((menu) => {
              const isOpen = openMenu === menu.label;
              return (
                <div
                  key={menu.label}
                  className="flex items-center"
                  onMouseEnter={() => openNow(menu.label)}
                >
                  <button
                    ref={(el) => {
                      triggerRefs.current[menu.label] = el;
                    }}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${slug(menu.label)}`}
                    onClick={() =>
                      setOpenMenu((cur) =>
                        cur === menu.label ? null : menu.label,
                      )
                    }
                    onFocusCapture={() => {
                      if (!suppressFocusOpen.current) openNow(menu.label);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold transition-colors",
                      isOpen ? "text-nokia-blue-light" : linkColor,
                    )}
                  >
                    {menu.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded border border-white/30 px-3 py-2 text-sm text-nokia-ink/85 transition-colors hover:border-white hover:text-white lg:inline-flex"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Search all of Nokia</span>
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded text-white transition-colors lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>

        {/* Desktop mega-menu panel */}
        {openMenu && (
          <MegaPanel
            menu={megaMenus.find((m) => m.label === openMenu)!}
            onClose={() => setOpenMenu(null)}
          />
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-nokia-navy lg:hidden">
          <Container className="flex flex-col py-4">
            <div className="mb-3 flex items-center gap-2 rounded border border-white/15 px-3 py-2 text-sm text-nokia-ink-muted">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span>Search all of Nokia</span>
            </div>

            {megaMenus.map((menu) => {
              const expanded = mobileSection === menu.label;
              return (
                <div key={menu.label} className="border-b border-white/10">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-nokia-ink"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileSection((cur) =>
                        cur === menu.label ? null : menu.label,
                      )
                    }
                  >
                    {menu.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expanded && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded && (
                    <div className="pb-4">
                      {menu.columns.map((col) => (
                        <div key={col.heading ?? "links"} className="mb-2">
                          {col.heading && (
                            <p className="mb-1 mt-2 text-xs font-semibold uppercase tracking-wide text-nokia-ink-muted">
                              {col.heading}
                            </p>
                          )}
                          <ul>
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <a
                                  href={l.href}
                                  {...externalLinkProps}
                                  className="block py-2 pl-3 text-sm text-nokia-ink-muted hover:text-nokia-blue-light"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {l.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {utilityNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...externalLinkProps}
                className="py-3 text-sm text-nokia-ink-muted"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}

function MegaPanel({
  menu,
  onClose,
}: {
  menu: MegaMenu;
  onClose: () => void;
}) {
  return (
    <div
      id={`mega-${slug(menu.label)}`}
      role="region"
      aria-label={menu.label}
      className="absolute inset-x-0 top-full hidden animate-in fade-in-0 slide-in-from-top-1 border-t border-white/10 bg-nokia-navy-raised shadow-[0_24px_40px_-20px_rgba(0,0,0,0.8)] duration-150 lg:block"
      onMouseEnter={() => {
        /* keep open while pointer is inside */
      }}
    >
      <Container
        className={cn(
          "grid gap-10 py-10",
          menu.columns.length > 1
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
            : "lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)]",
        )}
      >
        <div
          className={cn(
            "grid gap-8",
            menu.columns.length > 1 && "sm:grid-cols-2",
          )}
        >
          {menu.columns.map((col) => (
            <div key={col.heading ?? "links"}>
              {col.heading && (
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-nokia-ink-muted">
                  {col.heading}
                </h3>
              )}
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...externalLinkProps}
                      className="text-sm text-nokia-ink-muted hover:text-nokia-blue-light"
                      onClick={onClose}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {menu.tiles.map((tile) => (
            <a
              key={tile.title}
              href={tile.href}
              {...externalLinkProps}
              onClick={onClose}
              className="group flex flex-col overflow-hidden rounded border border-white/10 bg-white/[0.02] transition-colors hover:border-white/25"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={tile.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-sm font-semibold text-nokia-ink">
                  {tile.title}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-nokia-ink-muted">
                  {tile.blurb}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-nokia-blue-light">
                  Learn more
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}
