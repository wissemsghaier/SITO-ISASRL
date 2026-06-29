"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";
import { companyInfo, navLinks } from "@/lib/site-data";

type SiteFrameProps = {
  activePath: string;
  statusBadge?: ReactNode;
  children: ReactNode;
};

const logoConcepts = {
  enterprise: {
    mark: "/brand/isa-mark-corporate.svg",
    wordmark: "/brand/isa-wordmark-corporate.svg",
    label: "Enterprise Core",
  },
  nexus: {
    mark: "/brand/isa-nexus-mark.svg",
    wordmark: "/brand/isa-nexus-wordmark.svg",
    label: "Nexus Prism",
  },
  monogram: {
    mark: "/brand/isa-orbit-mark.svg",
    wordmark: "/brand/isa-orbit-wordmark.svg",
    label: "Monogram IA",
  },
  wave: {
    mark: "/brand/isa-flux-mark.svg",
    wordmark: "/brand/isa-flux-wordmark.svg",
    label: "Wave Emblem",
  },
  shield: {
    mark: "/brand/isa-aurora-mark.svg",
    wordmark: "/brand/isa-aurora-wordmark.svg",
    label: "Shield Tech",
  },
} as const;

type LogoConcept = keyof typeof logoConcepts;

const activeLogoConcept: LogoConcept = "enterprise";
const activeBrand = logoConcepts[activeLogoConcept];

export function SiteFrame({ activePath, children }: SiteFrameProps) {
  const pathname = usePathname();
  const { variant, copy } = useLeadVariant();
  const themeMode = (process.env.NEXT_PUBLIC_THEME_MODE || "nova").toLowerCase();
  useTrackAbImpression({
    variant,
    ctaId: "conversion-ribbon",
    pagePath: pathname || activePath,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routePulse, setRoutePulse] = useState(false);
  const firstRouteRender = useRef(true);

  const themeClass = useMemo(() => {
    const queryTheme =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("theme")?.toLowerCase()
        : undefined;

    if (queryTheme === "classic") {
      return "theme-classic";
    }

    if (queryTheme === "nova") {
      return "theme-nova";
    }

    if (queryTheme === "a") {
      return "theme-ab-a";
    }

    if (queryTheme === "b") {
      return "theme-ab-b";
    }

    if (themeMode === "classic") {
      return "theme-classic";
    }

    if (themeMode === "ab") {
      return variant === "A" ? "theme-ab-a" : "theme-ab-b";
    }

    return "theme-nova";
  }, [themeMode, variant]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    let animationFrameId = 0;

    const syncParallaxValue = () => {
      const scrollY = window.scrollY || 0;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min((scrollY / maxScroll) * 100, 100);

      document.documentElement.style.setProperty("--scroll-y", String(scrollY));
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(2));
      animationFrameId = 0;
    };

    const onScroll = () => {
      if (!animationFrameId) {
        animationFrameId = window.requestAnimationFrame(syncParallaxValue);
      }
    };

    syncParallaxValue();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>(".scroll-section"));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    sections.forEach((section, sectionIndex) => {
      section.style.setProperty("--section-delay", `${Math.min(sectionIndex * 0.045, 0.24)}s`);

      const staggerItems = Array.from(section.querySelectorAll<HTMLElement>(".stagger-item"));
      const sectionPace = section.dataset.stagger === "slow" ? 0.11 : section.dataset.stagger === "fast" ? 0.045 : 0.07;
      const sectionDistance = section.dataset.distance || "14px";

      staggerItems.forEach((item, itemIndex) => {
        item.style.setProperty(
          "--stagger-delay",
          `${Math.min(itemIndex * sectionPace + sectionIndex * 0.015, 0.78)}s`
        );
        item.style.setProperty("--stagger-distance", sectionDistance);
      });

      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [activePath]);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".landing");

    if (!root) {
      return;
    }

    const images = Array.from(
      root.querySelectorAll<HTMLImageElement>(
        ".route-page-shell img, .scroll-section img, .studio-hero img, .internal-hero img, .signature-card img, .service-card img, .studio-offer-card img, .studio-contact-card img, .policy-docs img, .digital-card img"
      )
    ).filter((image) => !image.closest(".brand-group, .partner-item, .group-label, footer"));

    if (!images.length) {
      return;
    }

    images.forEach((image) => {
      image.classList.add("image-reveal");

      if (image.complete) {
        image.classList.add("image-loaded");
      } else {
        image.addEventListener(
          "load",
          () => {
            image.classList.add("image-loaded");
          },
          { once: true }
        );
      }
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      images.forEach((image) => image.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    images.forEach((image) => observer.observe(image));

    return () => observer.disconnect();
  }, [activePath, pathname]);

  useEffect(() => {
    if (firstRouteRender.current) {
      firstRouteRender.current = false;
      return;
    }

    setRoutePulse(true);
    const timeout = window.setTimeout(() => setRoutePulse(false), 680);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  const closeDrawer = () => setMobileOpen(false);

  return (
    <div
      className={`landing ${themeClass} brand-minimal-luxe logo-concept-${activeLogoConcept} ultra-premium-50k`}
      data-page={activePath}
      data-ab-variant={variant}
    >
      <div className={`route-transition-wash ${routePulse ? "active" : ""}`} aria-hidden="true" />

      <div className="top-utility reveal reveal-1">
        <div className="container utility-inner">
          <div className="utility-left">
            <a href={`tel:+39${companyInfo.phone.replace(/\s+/g, "")}`}>{companyInfo.phone}</a>
            <span aria-hidden="true">|</span>
            <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
          </div>
          <div className="utility-right">
            <a href="/assistenza">Assistenza remota</a>
            <a href="/contatti">Parla con un consulente</a>
            <a href="/contatti">Collabora con ISA</a>
          </div>
        </div>
      </div>

      <header className="main-header reveal reveal-2">
        <div className="container nav-shell">
          <div className="brand-group">
            <div className="brand-mark-wrap logo-anim-shell">
              <span className="logo-anim-ring" />
              <span className="logo-anim-orbit" />
              <span className="logo-anim-glint" />
              <Image
                src={activeBrand.mark}
                alt="Logo ISA"
                width={58}
                height={58}
                className="brand-mark brand-mark-animated"
              />
            </div>
            <div className="brand-divider" />
            <div className="group-label premium-brand-copy">
              <div className="brand-wordmark-wrap">
                <Image
                  src={activeBrand.wordmark}
                  alt="ISA Informatica Soluzioni Aziendali"
                  width={276}
                  height={58}
                  className="brand-wordmark brand-wordmark-animated"
                />
              </div>
              <span>DAL 1994 | SOLUZIONI DIGITALI PER IMPRESE</span>
            </div>
          </div>

          <nav className="main-nav" aria-label="Menu principale">
            {navLinks.map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={item.href === activePath ? "active-nav" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="header-search-btn" aria-label="Cerca nel sito">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="11" cy="11" r="6" />
                <path d="M16.2 16.2L21 21" />
              </svg>
            </button>
            <button
              type="button"
              className={`mobile-menu-btn ${mobileOpen ? "is-open" : ""}`}
              aria-label="Apri menu mobile"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="conversion-ribbon reveal reveal-2">
        <div className="container conversion-ribbon-inner">
          <div>
            <p className="conversion-variant">Variante contenuto {variant}</p>
            <h2>{copy.bannerTitle}</h2>
            <p>{copy.bannerText}</p>
          </div>
          <Link
            href="/contatti"
            className="btn-primary conversion-ribbon-cta"
            onClick={() =>
              trackAbClick({
                variant,
                ctaId: "conversion-ribbon",
                pagePath: pathname || activePath,
              })
            }
          >
            {copy.bannerCta}
          </Link>
        </div>
      </div>

      <button
        type="button"
        aria-label="Chiudi menu"
        className={`drawer-overlay ${mobileOpen ? "open" : ""}`}
        onClick={closeDrawer}
      />

      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-head">
          <strong>Menu principale</strong>
          <button type="button" onClick={closeDrawer} aria-label="Chiudi menu">
            ×
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Menu mobile">
          {navLinks.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={closeDrawer}
              className={item.href === activePath ? "active-nav" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-drawer-contact">
          <a href={`tel:+39${companyInfo.phone.replace(/\s+/g, "")}`}>{companyInfo.phone}</a>
          <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
          <Link href="/privacy" onClick={closeDrawer}>
            Informativa Privacy
          </Link>
        </div>
      </aside>

      <main className="container page-flow">
        <div key={pathname} className="route-page-shell">
          {children}
        </div>
      </main>

      <footer className="site-footer">
        <span className="footer-aura" aria-hidden="true" />
        <div className="container footer-shell footer-shell-premium">
          <div className="footer-identity">
            <div className="footer-brand-lockup">
              <div className="footer-logo-chip">
                <Image
                  src={activeBrand.mark}
                  alt="Marchio ISA"
                  width={40}
                  height={40}
                  className="footer-logo-mark"
                />
              </div>
              <div>
                <p className="footer-brand">Informatica Soluzioni Aziendali S.r.l.</p>
                <p className="footer-brand-sub">{activeBrand.label} | DAL 1994</p>
              </div>
            </div>
            <p className="footer-meta">
              {companyInfo.group} | {companyInfo.address} | P.IVA {companyInfo.vat}
            </p>
          </div>

          <div className="footer-links footer-links-premium">
            <Link href="/firma-digitale">Firma Digitale</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/backoffice">Area riservata</Link>
            <Link href="/contatti">Contatti</Link>
          </div>

          <div className="footer-contact-quick">
            <a href={`tel:+39${companyInfo.phone.replace(/\s+/g, "")}`}>{companyInfo.phone}</a>
            <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
