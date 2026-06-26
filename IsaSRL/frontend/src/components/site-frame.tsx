"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { companyInfo, navLinks } from "@/lib/site-data";

type SiteFrameProps = {
  activePath: string;
  statusBadge?: ReactNode;
  children: ReactNode;
};

export function SiteFrame({ activePath, statusBadge, children }: SiteFrameProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    let animationFrameId = 0;

    const syncParallaxValue = () => {
      document.documentElement.style.setProperty("--scroll-y", String(window.scrollY || 0));
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

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [activePath]);

  const closeDrawer = () => setMobileOpen(false);

  return (
    <div className="landing">
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
            <Image src="/site/logo.png" alt="ISA logo" width={86} height={56} />
            <div className="brand-divider" />
            <div className="group-label">
              <span>GRUPPO</span>
              <Image
                src="/site/zucchetti_logo_partner.jpg"
                alt="Zucchetti partner"
                width={132}
                height={42}
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
            <Link href="/contatti" className="demo-btn">
              Richiedi una demo
            </Link>
          </div>
        </div>
      </header>

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

      <main className="container page-flow">{children}</main>

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
