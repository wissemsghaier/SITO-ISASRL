"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";
import { premiumServiceCatalog, ServiceIconKey } from "@/lib/services-catalog";
import { companyInfo, navLinks, partners } from "@/lib/site-data";

type SiteFrameProps = {
  activePath: string;
  statusBadge?: ReactNode;
  minimalGlobal?: boolean;
  pageVariant?: string;
  children: ReactNode;
};

const logoConcepts = {
  legacy: {
    mark: "/brand/isa-lockup-classic.svg",
    wordmark: "/brand/isa-lockup-classic.svg",
    label: "Identita ISA classica",
  },
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

const isLogoConcept = (value: string): value is LogoConcept => value in logoConcepts;
const configuredLogoConcept = process.env.NEXT_PUBLIC_LOGO_CONCEPT;
const activeLogoConcept: LogoConcept =
  configuredLogoConcept && isLogoConcept(configuredLogoConcept)
    ? configuredLogoConcept
    : "legacy";
const activeBrand = logoConcepts[activeLogoConcept];
const isLegacyLogo = activeLogoConcept === "legacy";
const aziendaSubmenuLinks = [
  { href: "/azienda", label: "Chi siamo", icon: "office" },
  { href: "/azienda/lavora-con-noi", label: "Lavora con noi", icon: "team" },
  { href: "/azienda/contatti", label: "Contatti", icon: "contact" },
] as const;

type ServiziSubmenuItem = {
  href: string;
  label: string;
  icon: ServiceIconKey | "overview";
};

const serviziSubmenuLinks: ServiziSubmenuItem[] = [
  { href: "/servizi", label: "Panoramica servizi", icon: "overview" },
  ...premiumServiceCatalog.map((service) => ({
    href: `/servizi/${service.slug}`,
    label: service.menuLabel,
    icon: service.icon,
  })),
];

const renderAziendaSubmenuIcon = (icon: (typeof aziendaSubmenuLinks)[number]["icon"]) => {
  if (icon === "office") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M4 20H20" />
        <path d="M7 20V8L12 4L17 8V20" />
        <path d="M10 12H14" />
      </svg>
    );
  }

  if (icon === "team") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="16" cy="9" r="2" />
        <path d="M4.5 18C5.2 15.5 6.9 14.2 9.3 14.2C11.7 14.2 13.4 15.5 14.1 18" />
        <path d="M13.8 17.6C14.2 16 15.3 15 16.9 15C18.5 15 19.6 16 20 17.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M6.1 4.8H9.6L10.9 7.9L9.4 9.6C10.3 11.1 11.6 12.4 13.2 13.3L14.9 11.8L18 13.1V16.6C18 17.4 17.4 18 16.6 18H15.8C10.6 17.7 6.3 13.4 6 8.2V7.4C6 6.6 6.6 6 7.4 6" />
    </svg>
  );
};

const renderServiziSubmenuIcon = (icon: ServiziSubmenuItem["icon"]) => {
  if (icon === "overview") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9H16" />
        <path d="M8 13H11" />
        <path d="M13 13H16" />
      </svg>
    );
  }

  if (icon === "invoice") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M7 3.5H14.5L18 7V20.5H7Z" />
        <path d="M14.5 3.5V7H18" />
        <path d="M9.2 11H15.8" />
        <path d="M9.2 14H15.8" />
        <path d="M9.2 17H13.5" />
      </svg>
    );
  }

  if (icon === "continuity") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 4L18.5 6.6V11.8C18.5 15.6 15.9 18.9 12 20" />
        <path d="M12 4L5.5 6.6V11.8C5.5 15.6 8.1 18.9 12 20" />
        <path d="M9 12.4L11.2 14.6L15 10.8" />
      </svg>
    );
  }

  if (icon === "erp") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 9H16" />
        <path d="M8 13H11" />
        <path d="M13 13H16" />
        <path d="M8 16H10.5" />
        <path d="M13 16H16" />
      </svg>
    );
  }

  if (icon === "education") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M3.8 8.6L12 5L20.2 8.6L12 12.2Z" />
        <path d="M6.5 10.1V14.3C6.5 15.7 8.9 17 12 17C15.1 17 17.5 15.7 17.5 14.3V10.1" />
        <path d="M20.2 8.6V14.8" />
      </svg>
    );
  }

  if (icon === "signature") {
    return (
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <rect x="5" y="3.5" width="14" height="17" rx="2" />
        <path d="M8.5 7.5H15.5" />
        <path d="M8.5 10.5H15.5" />
        <path d="M8.5 15.2C9.6 13.8 10.6 13.8 11.7 15.2C12.8 16.6 13.7 16.6 15 15.1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 3.8L19 6.6V11.8C19 15.8 16.2 19.1 12 20.3" />
      <path d="M12 3.8L5 6.6V11.8C5 15.8 7.8 19.1 12 20.3" />
      <path d="M12 8.4V13" />
      <circle cx="12" cy="15.9" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
};

export function SiteFrame({ activePath, minimalGlobal = false, pageVariant = "default", children }: SiteFrameProps) {
  const pathname = usePathname();
  const { variant, copy } = useLeadVariant();
  const themeMode = (process.env.NEXT_PUBLIC_THEME_MODE || "nova").toLowerCase();
  useTrackAbImpression({
    variant,
    ctaId: "conversion-ribbon",
    pagePath: pathname || activePath,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aziendaMenuOpen, setAziendaMenuOpen] = useState(false);
  const [serviziMenuOpen, setServiziMenuOpen] = useState(false);
  const [routePulse, setRoutePulse] = useState(false);
  const firstRouteRender = useRef(true);
  const aziendaMenuRef = useRef<HTMLDivElement | null>(null);
  const serviziMenuRef = useRef<HTMLDivElement | null>(null);

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
    setAziendaMenuOpen(false);
    setServiziMenuOpen(false);
  }, [pathname, mobileOpen]);

  useEffect(() => {
    if (!aziendaMenuOpen && !serviziMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      const insideAzienda = aziendaMenuRef.current?.contains(targetNode);
      const insideServizi = serviziMenuRef.current?.contains(targetNode);

      if (insideAzienda || insideServizi) {
        return;
      }

      setAziendaMenuOpen(false);
      setServiziMenuOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAziendaMenuOpen(false);
        setServiziMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [aziendaMenuOpen, serviziMenuOpen]);

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
  const currentPath = pathname || activePath;
  const hideGlobalSections = minimalGlobal || currentPath !== "/";
  const isNavItemActive = (href: string) => {
    if (href === "/servizi") {
      return currentPath.startsWith("/servizi");
    }

    if (href === "/azienda") {
      return currentPath.startsWith("/azienda");
    }

    return href.split("#")[0] === activePath;
  };
  const isAziendaSubmenuActive = (href: string) => {
    if (href === "/azienda") {
      return currentPath === "/azienda";
    }

    if (href === "/azienda/contatti") {
      return currentPath.startsWith("/azienda/contatti");
    }

    if (href === "/azienda/lavora-con-noi") {
      return currentPath.startsWith("/azienda/lavora-con-noi");
    }

    return currentPath === href;
  };
  const isServiziSubmenuActive = (href: string) => {
    if (href === "/servizi") {
      return currentPath === "/servizi";
    }

    return currentPath === href;
  };

  return (
    <div
      className={`landing ${themeClass} brand-minimal-luxe logo-concept-${activeLogoConcept} ultra-premium-50k`}
      data-page={activePath}
      data-ab-variant={variant}
      data-page-variant={pageVariant}
    >
      <div className={`route-transition-wash ${routePulse ? "active" : ""}`} aria-hidden="true" />

      {!hideGlobalSections ? (
        <div className="top-utility reveal reveal-1">
          <div className="container utility-inner">
            <div className="utility-left">
              <a href={`tel:+39${companyInfo.phone.replace(/\s+/g, "")}`}>{companyInfo.phone}</a>
              <span aria-hidden="true">|</span>
              <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
            </div>
            <div className="utility-right">
              <a href="/assistenza">Assistenza remota</a>
              <a href="/azienda/contatti">Parla con un consulente</a>
              <a href="/azienda/lavora-con-noi">Collabora con ISA</a>
            </div>
          </div>
        </div>
      ) : null}

      <header className="main-header reveal reveal-2">
        <div className="container nav-shell">
          <div className={`brand-group ${isLegacyLogo ? "legacy-lockup" : ""}`}>
            {isLegacyLogo ? (
              <div className="group-label premium-brand-copy">
                <div className="brand-wordmark-wrap">
                  <Image
                    src={activeBrand.wordmark}
                    alt="ISA Informatica Soluzioni Aziendali S.r.l. Gruppo Zutec S.r.l."
                    width={1500}
                    height={210}
                    className="brand-wordmark brand-wordmark-legacy"
                    priority
                  />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          <nav className="main-nav" aria-label="Menu principale">
            {navLinks.map((item) => {
              if (item.label === "Servizi") {
                return (
                  <div
                    key={`${item.href}-${item.label}`}
                    ref={serviziMenuRef}
                    className={`nav-item-with-dropdown ${isNavItemActive(item.href) ? "is-active" : ""} ${serviziMenuOpen ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className={isNavItemActive(item.href) ? "active-nav nav-dropdown-trigger" : "nav-dropdown-trigger"}
                      aria-label="Apri sottomenu Servizi"
                      aria-expanded={serviziMenuOpen}
                      aria-haspopup="menu"
                      onClick={() => {
                        setServiziMenuOpen((prev) => !prev);
                        setAziendaMenuOpen(false);
                      }}
                    >
                      <span>{item.label}</span>
                      <span className="nav-caret" aria-hidden="true">
                        ▾
                      </span>
                    </button>
                    <div
                      className={`nav-dropdown-menu services-dropdown ${serviziMenuOpen ? "is-open" : ""}`}
                      role="menu"
                      aria-label="Sottomenu Servizi"
                    >
                      {serviziSubmenuLinks.map((submenuItem) => (
                        <Link
                          key={submenuItem.href}
                          href={submenuItem.href}
                          role="menuitem"
                          onClick={() => setServiziMenuOpen(false)}
                          className={isServiziSubmenuActive(submenuItem.href) ? "active-nav" : undefined}
                        >
                          <span className="nav-dropdown-item-icon" aria-hidden="true">
                            {renderServiziSubmenuIcon(submenuItem.icon)}
                          </span>
                          <span>{submenuItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              if (item.label === "Azienda") {
                return (
                  <div
                    key={`${item.href}-${item.label}`}
                    ref={aziendaMenuRef}
                    className={`nav-item-with-dropdown ${isNavItemActive(item.href) ? "is-active" : ""} ${aziendaMenuOpen ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className={isNavItemActive(item.href) ? "active-nav nav-dropdown-trigger" : "nav-dropdown-trigger"}
                      aria-label="Apri sottomenu Azienda"
                      aria-expanded={aziendaMenuOpen}
                      aria-haspopup="menu"
                      onClick={() => {
                        setAziendaMenuOpen((prev) => !prev);
                        setServiziMenuOpen(false);
                      }}
                    >
                      <span>{item.label}</span>
                      <span className="nav-caret" aria-hidden="true">
                        ▾
                      </span>
                    </button>
                    <div className={`nav-dropdown-menu ${aziendaMenuOpen ? "is-open" : ""}`} role="menu" aria-label="Sottomenu Azienda">
                      {aziendaSubmenuLinks.map((submenuItem) => (
                        <Link
                          key={submenuItem.href}
                          href={submenuItem.href}
                          role="menuitem"
                          onClick={() => setAziendaMenuOpen(false)}
                          className={isAziendaSubmenuActive(submenuItem.href) ? "active-nav" : undefined}
                        >
                          <span className="nav-dropdown-item-icon" aria-hidden="true">
                            {renderAziendaSubmenuIcon(submenuItem.icon)}
                          </span>
                          <span>{submenuItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={`${item.href}-${item.label}`}
                  href={item.href}
                  className={isNavItemActive(item.href) ? "active-nav" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
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

      {currentPath === "/azienda" ? (
        <div className="azienda-quick-nav-wrap reveal reveal-2">
          <div className="container">
            <nav className="azienda-quick-nav" aria-label="Sezioni pagina Azienda">
              <Link href="/azienda" className="azienda-quick-link active">
                <span className="azienda-quick-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M3 11.5L12 4L21 11.5" />
                    <path d="M6.5 10.5V20H17.5V10.5" />
                  </svg>
                </span>
                <span>Chi Siamo</span>
              </Link>
              <Link href="/azienda/lavora-con-noi" className="azienda-quick-link">
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
              <Link href="/azienda/contatti" className="azienda-quick-link">
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

      {!hideGlobalSections ? (
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
      ) : null}

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
          {navLinks.map((item) => {
            if (item.label === "Servizi") {
              return (
                <div key={`${item.href}-${item.label}`} className="mobile-nav-item-group">
                  <Link
                    href={item.href}
                    onClick={closeDrawer}
                    className={isNavItemActive(item.href) ? "active-nav" : undefined}
                  >
                    {item.label}
                  </Link>
                  <div className="mobile-nav-submenu" aria-label="Sottomenu Servizi">
                    {serviziSubmenuLinks.map((submenuItem) => (
                      <Link
                        key={submenuItem.href}
                        href={submenuItem.href}
                        onClick={closeDrawer}
                        className={isServiziSubmenuActive(submenuItem.href) ? "active-nav" : undefined}
                      >
                        <span className="nav-dropdown-item-icon" aria-hidden="true">
                          {renderServiziSubmenuIcon(submenuItem.icon)}
                        </span>
                        <span>{submenuItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.label === "Azienda") {
              return (
                <div key={`${item.href}-${item.label}`} className="mobile-nav-item-group">
                  <Link
                    href={item.href}
                    onClick={closeDrawer}
                    className={isNavItemActive(item.href) ? "active-nav" : undefined}
                  >
                    {item.label}
                  </Link>
                  <div className="mobile-nav-submenu" aria-label="Sottomenu Azienda">
                    {aziendaSubmenuLinks.map((submenuItem) => (
                      <Link
                        key={submenuItem.href}
                        href={submenuItem.href}
                        onClick={closeDrawer}
                        className={isAziendaSubmenuActive(submenuItem.href) ? "active-nav" : undefined}
                      >
                        <span className="nav-dropdown-item-icon" aria-hidden="true">
                          {renderAziendaSubmenuIcon(submenuItem.icon)}
                        </span>
                        <span>{submenuItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                onClick={closeDrawer}
                className={isNavItemActive(item.href) ? "active-nav" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
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

      <footer className="site-footer site-footer-modern">
        <div className="footer-modern-stage">
          <section className="footer-partners-band">
            <div className="container footer-partners-inner">
              <div className="footer-partners-head">
                <h3>Partner tecnologici ISA</h3>
                <div className="footer-partners-badges" aria-hidden="true">
                  <span>Partner ufficiali</span>
                  <span>Rivenditori certificati</span>
                </div>
              </div>

              <div className="footer-partners-grid">
                {partners.map((partner, index) => (
                  <a
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-partner-card"
                    style={
                      {
                        animationDelay: `${index * 100}ms`,
                        "--footer-logo-max-width": partner.footerLogoMaxWidth ?? "122px",
                        "--footer-logo-max-height": partner.footerLogoMaxHeight ?? "32px",
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={158}
                      height={58}
                      className="footer-partner-logo"
                    />
                    <span>{partner.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="footer-assistance-band">
            <div className="container footer-assistance-inner">
              <div className="footer-assistance-copy">
                <h3>Vuoi accelerare il tuo progetto digitale?</h3>
                <p>Confrontati con un consulente ISA e ricevi una proposta concreta sulle tue priorita.</p>
              </div>
              <div className="footer-assistance-actions">
                <Link href="/gestionale" className="footer-cta-chip">
                  Gestionale aziendale
                </Link>
                <Link href="/ordini-professionali" className="footer-cta-chip">
                  Ordini e gare MEPA
                </Link>
                <Link href="/azienda/contatti" className="footer-cta-chip footer-cta-chip-primary">
                  Richiedi una consulenza
                </Link>
              </div>
            </div>
          </section>
        </div>

        <section className="footer-bottom-band">
          <div className="container footer-bottom-inner">
            <div className="footer-bottom-brand">
              {isLegacyLogo ? (
                <Image
                  src={activeBrand.wordmark}
                  alt="ISA Informatica Soluzioni Aziendali S.r.l."
                  width={1500}
                  height={210}
                  className="footer-logo-lockup-legacy"
                />
              ) : (
                <Image src={activeBrand.mark} alt="Marchio ISA" width={30} height={30} className="footer-logo-mark" />
              )}
              <p>{companyInfo.address}</p>
            </div>

            <div className="footer-bottom-links">
              <Link href="/">Home</Link>
              <Link href="/servizi">Servizi</Link>
              <Link href="/progetti">Progetti</Link>
              <Link href="/news">News</Link>
              <Link href="/azienda">Azienda</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/backoffice">Area riservata</Link>
            </div>

            <div className="footer-bottom-contact">
              <a href={`tel:+39${companyInfo.phone.replace(/\s+/g, "")}`}>{companyInfo.phone}</a>
              <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
            </div>
          </div>
        </section>

        <section className="footer-legal-strip">
          <div className="container footer-legal-inner">
            <p>
              Copyright {new Date().getFullYear()} ISA Informatica Soluzioni Aziendali S.r.l. | P.IVA {companyInfo.vat} | {companyInfo.group}
            </p>
          </div>
        </section>
      </footer>
    </div>
  );
}
