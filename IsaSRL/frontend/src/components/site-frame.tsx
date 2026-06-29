"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { trackAbClick, useTrackAbImpression } from "@/lib/ab-analytics";
import { useLeadVariant } from "@/lib/lead-copy";
import { companyInfo, navLinks } from "@/lib/site-data";

type SiteFrameProps = {
  activePath: string;
  statusBadge?: ReactNode;
  children: ReactNode;
};

export function SiteFrame({ activePath, statusBadge, children }: SiteFrameProps) {
  const pathname = usePathname();
  const { variant, copy } = useLeadVariant();
  useTrackAbImpression({
    variant,
    ctaId: "header-demo",
    pagePath: pathname || activePath,
  });
  useTrackAbImpression({
    variant,
    ctaId: "conversion-ribbon",
    pagePath: pathname || activePath,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [routePulse, setRoutePulse] = useState(false);
  const firstRouteRender = useRef(true);

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
    <div className="landing">
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
            <a href="/contatti">Area clienti</a>
            <a href="/contatti">Lavora con noi</a>
          </div>
        </div>
      </div>

      <header className="main-header reveal reveal-2">
        <div className="container nav-shell">
          <div className="brand-group">
            <Image src="/brand/isa-mark.svg" alt="ISA monogram" width={58} height={58} className="brand-mark" />
            <div className="brand-divider" />
            <div className="group-label premium-brand-copy">
              <Image
                src="/brand/isa-wordmark.svg"
                alt="ISA SRL wordmark"
                width={238}
                height={56}
                className="brand-wordmark"
              />
              <span>PARTNER DIGITAL TRANSFORMATION</span>
              <Image
                src="/site/zucchetti_logo_partner.jpg"
                alt="Zucchetti partner"
                width={116}
                height={36}
              />
            </div>
          </div>

          <nav className="main-nav" aria-label="Menu principale">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.href === activePath ? "active-nav" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            {statusBadge}
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
            <Link
              href="/contatti"
              className="demo-btn"
              onClick={() =>
                trackAbClick({
                  variant,
                  ctaId: "header-demo",
                  pagePath: pathname || activePath,
                })
              }
            >
              {copy.headerDemo}
            </Link>
          </div>
        </div>
      </header>

      <div className="conversion-ribbon reveal reveal-2">
        <div className="container conversion-ribbon-inner">
          <div>
            <p className="conversion-variant">Lead variant {variant}</p>
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
          <strong>Navigation</strong>
          <button type="button" onClick={closeDrawer} aria-label="Chiudi menu">
            ×
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Menu mobile">
          {navLinks.map((item) => (
            <Link
              key={item.href}
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
        <div className="container footer-shell">
          <div>
            <p className="footer-brand">Informatica Soluzioni Aziendali S.r.l.</p>
            <p>
              {companyInfo.group} | {companyInfo.address} | P.IVA {companyInfo.vat}
            </p>
          </div>
          <div className="footer-links">
            <Link href="/firma-digitale">Firma Digitale</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/brand-system">Brand System</Link>
            <Link href="/backoffice">Back-office</Link>
            <Link href="/contatti">Contatti</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
