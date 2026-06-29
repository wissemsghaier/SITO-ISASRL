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
  const isNavItemActive = (href: string) => href.split("#")[0] === activePath;

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
                className={isNavItemActive(item.href) ? "active-nav" : undefined}
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

      {activePath === "/azienda" ? (
        <div className="azienda-quick-nav-wrap reveal reveal-2">
          <div className="container">
            <nav className="azienda-quick-nav" aria-label="Sezioni pagina Azienda">
              <Link href="/azienda#chi-siamo" className="azienda-quick-link active">
                <span className="azienda-quick-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M3 11.5L12 4L21 11.5" />
                    <path d="M6.5 10.5V20H17.5V10.5" />
                  </svg>
                </span>
                <span>Chi Siamo</span>
              </Link>
              <Link href="/azienda#lavora-con-noi" className="azienda-quick-link">
                <span className="azienda-quick-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <circle cx="8" cy="8" r="3" />
                    <circle cx="16.5" cy="9" r="2.5" />
                    <path d="M3.8 18C4.8 14.9 7.1 13.4 10.4 13.4C13.7 13.4 16 14.9 17 18" />
                    <path d="M14.2 17.6C14.7 15.8 16 14.7 17.9 14.7C19.8 14.7 21 15.8 21.6 17.6" />
                  </svg>
                </span>
                <span>Lavora con noi</span>
              </Link>
              <Link href="/contatti" className="azienda-quick-link">
                <span className="azienda-quick-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M6 3.8H10L11.5 7.2L9.8 9.1C10.7 10.9 12.2 12.4 14 13.3L15.9 11.6L19.3 13.1V17.1C19.3 18 18.6 18.7 17.7 18.7H16.8C10.6 18.3 5.7 13.4 5.3 7.2V6.3C5.3 5.4 6 4.7 6.9 4.7" />
                  </svg>
                </span>
                <span>Contatti</span>
              </Link>
            </nav>
          </div>
        </div>
      ) : null}

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
              className={isNavItemActive(item.href) ? "active-nav" : undefined}
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
