"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import {
  premiumServiceCatalog,
  ServiceCatalogItem,
  ServiceIconKey,
} from "@/lib/services-catalog";

type ServiceBrandToken = {
  code: string;
  primary: string;
  secondary: string;
  glow: string;
};

const iconByService: Record<ServiceIconKey, JSX.Element> = {
  invoice: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M7 3.5H14.5L18 7V20.5H7Z" />
      <path d="M14.5 3.5V7H18" />
      <path d="M9.2 11H15.8" />
      <path d="M9.2 14H15.8" />
      <path d="M9.2 17H13.5" />
    </svg>
  ),
  continuity: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 4L18.5 6.6V11.8C18.5 15.6 15.9 18.9 12 20" />
      <path d="M12 4L5.5 6.6V11.8C5.5 15.6 8.1 18.9 12 20" />
      <path d="M9 12.4L11.2 14.6L15 10.8" />
    </svg>
  ),
  erp: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9H16" />
      <path d="M8 13H11" />
      <path d="M13 13H16" />
      <path d="M8 16H10.5" />
      <path d="M13 16H16" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M3.8 8.6L12 5L20.2 8.6L12 12.2Z" />
      <path d="M6.5 10.1V14.3C6.5 15.7 8.9 17 12 17C15.1 17 17.5 15.7 17.5 14.3V10.1" />
      <path d="M20.2 8.6V14.8" />
    </svg>
  ),
  signature: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 7.5H15.5" />
      <path d="M8.5 10.5H15.5" />
      <path d="M8.5 15.2C9.6 13.8 10.6 13.8 11.7 15.2C12.8 16.6 13.7 16.6 15 15.1" />
    </svg>
  ),
  whistleblowing: (
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 3.8L19 6.6V11.8C19 15.8 16.2 19.1 12 20.3" />
      <path d="M12 3.8L5 6.6V11.8C5 15.8 7.8 19.1 12 20.3" />
      <path d="M12 8.4V13" />
      <circle cx="12" cy="15.9" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const cardTransition = { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const };

const brandBySlug: Record<string, ServiceBrandToken> = {
  "fatturazione-elettronica": {
    code: "FE",
    primary: "#1f6fce",
    secondary: "#4cb9ff",
    glow: "rgba(55, 150, 255, 0.34)",
  },
  "business-continuity": {
    code: "BC",
    primary: "#1668bb",
    secondary: "#34b3dc",
    glow: "rgba(37, 176, 220, 0.34)",
  },
  "gestionale-su-misura": {
    code: "GS",
    primary: "#2a61c4",
    secondary: "#5b88f7",
    glow: "rgba(78, 132, 255, 0.34)",
  },
  "tecnologia-didattica": {
    code: "TD",
    primary: "#0f73c2",
    secondary: "#56c3ff",
    glow: "rgba(87, 192, 255, 0.35)",
  },
  "firma-digitale": {
    code: "FD",
    primary: "#2f67cc",
    secondary: "#6bb0ff",
    glow: "rgba(95, 174, 255, 0.35)",
  },
  whistleblowing: {
    code: "WB",
    primary: "#145fa9",
    secondary: "#47a7f3",
    glow: "rgba(66, 166, 243, 0.36)",
  },
};

const defaultBrandToken: ServiceBrandToken = {
  code: "IS",
  primary: "#1f6fce",
  secondary: "#4cb9ff",
  glow: "rgba(55, 150, 255, 0.34)",
};

const getServiceBrandToken = (slug: string): ServiceBrandToken =>
  brandBySlug[slug] || defaultBrandToken;

const getServiceBrandStyle = (slug: string): CSSProperties => {
  const token = getServiceBrandToken(slug);

  return {
    "--service-brand-primary": token.primary,
    "--service-brand-secondary": token.secondary,
    "--service-brand-glow": token.glow,
  } as CSSProperties;
};

const serviceSoundPreferenceKey = "isa-service-sound-enabled";

export function ServicesSelector() {
  const [activeSlug, setActiveSlug] = useState(premiumServiceCatalog[0].slug);
  const [mobileOpenSlug, setMobileOpenSlug] = useState(premiumServiceCatalog[0].slug);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const selectorRootRef = useRef<HTMLElement | null>(null);
  const detailPanelRef = useRef<HTMLElement | null>(null);
  const lastTriggerRectRef = useRef<DOMRect | null>(null);
  const morphGlowRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const activeService = useMemo(
    () =>
      premiumServiceCatalog.find((service) => service.slug === activeSlug) ||
      premiumServiceCatalog[0],
    [activeSlug]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setSoundEnabled(window.localStorage.getItem(serviceSoundPreferenceKey) === "1");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(serviceSoundPreferenceKey, soundEnabled ? "1" : "0");
  }, [soundEnabled]);

  const playInteractionSound = () => {
    if (!soundEnabled || typeof window === "undefined") {
      return;
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    const context = audioContextRef.current;

    if (context.state === "suspended") {
      context.resume().catch(() => undefined);
    }

    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.038, now + 0.012);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    master.connect(context.destination);

    const oscA = context.createOscillator();
    oscA.type = "sine";
    oscA.frequency.setValueAtTime(520, now);
    oscA.frequency.exponentialRampToValueAtTime(690, now + 0.1);
    oscA.connect(master);
    oscA.start(now);
    oscA.stop(now + 0.2);

    const oscB = context.createOscillator();
    oscB.type = "triangle";
    oscB.frequency.setValueAtTime(760, now + 0.01);
    oscB.frequency.exponentialRampToValueAtTime(980, now + 0.14);
    oscB.connect(master);
    oscB.start(now + 0.014);
    oscB.stop(now + 0.2);
  };

  const handleServiceSelect = (slug: string, trigger?: HTMLButtonElement | null) => {
    if (trigger) {
      lastTriggerRectRef.current = trigger.getBoundingClientRect();
    }

    playInteractionSound();
    setActiveSlug(slug);
    setMobileOpenSlug(slug);
  };

  const handleMobileAccordionToggle = (slug: string, trigger?: HTMLButtonElement | null) => {
    if (mobileOpenSlug === slug) {
      setMobileOpenSlug("");
      return;
    }

    handleServiceSelect(slug, trigger);
  };

  useEffect(() => {
    const root = selectorRootRef.current;
    const detailPanel = detailPanelRef.current;
    const morphGlow = morphGlowRef.current;

    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline.fromTo(
        ".service-select-card.is-active .service-brand-emblem",
        { scale: 0.82, rotate: -18, opacity: 0.4 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.46, overwrite: true }
      );

      timeline.fromTo(
        ".service-select-card.is-active .service-brand-code",
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.34, overwrite: true },
        0.04
      );

      const isMobileViewport = window.matchMedia("(max-width: 860px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const triggerRect = lastTriggerRectRef.current;

      if (!isMobileViewport && !prefersReducedMotion && detailPanel && triggerRect) {
        const panelRect = detailPanel.getBoundingClientRect();
        const deltaX =
          triggerRect.left + triggerRect.width / 2 -
          (panelRect.left + panelRect.width / 2);
        const deltaY =
          triggerRect.top + triggerRect.height / 2 -
          (panelRect.top + panelRect.height / 2);
        const fromScaleX = Math.min(
          Math.max(triggerRect.width / Math.max(panelRect.width, 1), 0.22),
          0.78
        );
        const fromScaleY = Math.min(
          Math.max(triggerRect.height / Math.max(panelRect.height, 1), 0.2),
          0.68
        );

        if (morphGlow) {
          const startSize = Math.max(triggerRect.width, triggerRect.height) * 1.18;
          const endSize = Math.max(panelRect.width, panelRect.height) * 0.82;
          const startLeft = triggerRect.left + triggerRect.width / 2 - startSize / 2;
          const startTop = triggerRect.top + triggerRect.height / 2 - startSize / 2;
          const endLeft = panelRect.left + panelRect.width / 2 - endSize / 2;
          const endTop = panelRect.top + panelRect.height / 2 - endSize / 2;

          timeline.set(
            morphGlow,
            {
              display: "block",
              left: startLeft,
              top: startTop,
              width: startSize,
              height: startSize,
              opacity: 0,
              scale: 0.28,
            },
            0
          );

          timeline.to(
            morphGlow,
            {
              opacity: 0.92,
              scale: 1,
              duration: 0.16,
              overwrite: true,
            },
            0
          );

          timeline.to(
            morphGlow,
            {
              left: endLeft,
              top: endTop,
              width: endSize,
              height: endSize,
              opacity: 0.38,
              duration: 0.52,
              ease: "power2.out",
              overwrite: true,
            },
            0
          );

          timeline.to(
            morphGlow,
            {
              opacity: 0,
              duration: 0.26,
              overwrite: true,
            },
            0.34
          );

          timeline.set(morphGlow, { display: "none" }, ">");
        }

        timeline.fromTo(
          detailPanel,
          {
            x: deltaX,
            y: deltaY,
            scaleX: fromScaleX,
            scaleY: fromScaleY,
            borderRadius: 16,
            opacity: 0.72,
            filter: "blur(0.4px)",
            transformOrigin: "50% 50%",
          },
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            borderRadius: 20,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.58,
            overwrite: true,
          },
          0
        );
      } else {
        timeline.fromTo(
          ".service-detail-panel",
          { y: 20, opacity: 0, scale: 0.985 },
          { y: 0, opacity: 1, scale: 1, duration: 0.48, overwrite: true },
          0
        );
      }

      timeline.fromTo(
        ".service-detail-highlights li",
        { x: 16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.26, stagger: 0.045, overwrite: true },
        0.08
      );

      timeline.fromTo(
        ".service-detail-deliverables article",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.28, stagger: 0.04, overwrite: true },
        0.12
      );

      timeline.fromTo(
        ".service-mobile-sticky-cta",
        { y: 12, opacity: 0.44 },
        { y: 0, opacity: 1, duration: 0.28, overwrite: true },
        0.16
      );

      lastTriggerRectRef.current = null;
    }, root);

    return () => context.revert();
  }, [activeSlug]);

  return (
    <section
      ref={selectorRootRef}
      className="service-selector-shell premium-route-section reveal reveal-3 scroll-section"
    >
      <div className="service-selector-head">
        <p className="service-selector-kicker">Catalogo Servizi ISA</p>
        <h2>Seleziona un servizio e scopri subito dettagli, valore e pagina dedicata</h2>
        <p>
          Nuova esperienza premium ispirata ai contenuti storici del sito isasrl.it:
          ogni servizio ha logo, preview dinamica e pagina specifica.
        </p>
        <div className="service-selector-tools">
          <button
            type="button"
            className={`service-sound-toggle ${soundEnabled ? "is-on" : ""}`}
            aria-pressed={soundEnabled}
            onClick={() => setSoundEnabled((prev) => !prev)}
          >
            <span className="service-sound-dot" aria-hidden="true" />
            {soundEnabled ? "Signature sonore active" : "Signature sonore desactivee"}
          </button>
        </div>
      </div>

      <div className="service-selector-desktop">
        <div className="service-selector-grid" role="tablist" aria-label="Selezione servizi">
          {premiumServiceCatalog.map((service, index) => {
            const isActive = service.slug === activeService.slug;
            const token = getServiceBrandToken(service.slug);

            return (
              <motion.button
                key={service.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`service-panel-${service.slug}`}
                id={`service-tab-${service.slug}`}
                className={`service-select-card ${isActive ? "is-active" : ""}`}
                style={getServiceBrandStyle(service.slug)}
                data-service={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ ...cardTransition, delay: index * 0.04 }}
                onClick={(event) => handleServiceSelect(service.slug, event.currentTarget)}
              >
                <span className="service-brand-mark" aria-hidden="true">
                  <span className="service-brand-halo" />
                  <span className="service-brand-code">{token.code}</span>
                  <span className="service-brand-emblem">
                    {iconByService[service.icon]}
                  </span>
                </span>
                <strong>{service.menuLabel}</strong>
                <span>{service.eyebrow}</span>
              </motion.button>
            );
          })}
        </div>

        <article
          ref={detailPanelRef}
          id={`service-panel-${activeService.slug}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${activeService.slug}`}
          className="service-detail-panel"
          style={getServiceBrandStyle(activeService.slug)}
        >
          <div className="service-detail-main">
            <div>
              <p className="service-detail-kicker">{activeService.eyebrow}</p>
              <h3>{activeService.title}</h3>
              <p>{activeService.description}</p>

              <ul className="service-detail-highlights">
                {activeService.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="service-detail-actions">
                <Link href={`/servizi/${activeService.slug}`} className="btn-primary">
                  Apri pagina dedicata
                </Link>
                <Link href="/contatti" className="service-detail-secondary">
                  Richiedi proposta premium
                </Link>
              </div>
            </div>

            <div className="service-detail-aside">
              <span className="service-brand-mark service-brand-mark-lg" aria-hidden="true">
                <span className="service-brand-halo" />
                <span className="service-brand-code">
                  {getServiceBrandToken(activeService.slug).code}
                </span>
                <span className="service-brand-emblem">
                  {iconByService[activeService.icon]}
                </span>
              </span>
              <strong>{activeService.menuLabel}</strong>
              <p>{activeService.teaser}</p>
              <small>Fonte legacy: {activeService.legacySource}</small>
            </div>
          </div>

          <div className="service-detail-deliverables">
            {activeService.deliverables.map((item) => (
              <article key={item}>
                <span aria-hidden="true" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </article>
      </div>

      <div className="service-selector-accordion" aria-label="Selezione servizi mobile">
        {premiumServiceCatalog.map((service) => {
          const isOpen = mobileOpenSlug === service.slug;
          const token = getServiceBrandToken(service.slug);

          return (
            <article
              key={service.slug}
              className={`service-accordion-item ${isOpen ? "is-open" : ""}`}
              style={getServiceBrandStyle(service.slug)}
            >
              <button
                type="button"
                className="service-accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={`service-accordion-panel-${service.slug}`}
                onClick={(event) =>
                  handleMobileAccordionToggle(service.slug, event.currentTarget)
                }
              >
                <span className="service-brand-mark" aria-hidden="true">
                  <span className="service-brand-halo" />
                  <span className="service-brand-code">{token.code}</span>
                  <span className="service-brand-emblem">
                    {iconByService[service.icon]}
                  </span>
                </span>

                <span className="service-accordion-title-block">
                  <strong>{service.menuLabel}</strong>
                  <span>{service.eyebrow}</span>
                </span>

                <span
                  className={`service-accordion-caret ${isOpen ? "is-open" : ""}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              <div
                id={`service-accordion-panel-${service.slug}`}
                className={`service-accordion-panel ${isOpen ? "is-open" : ""}`}
              >
                <div className="service-accordion-panel-inner">
                  <p>{service.description}</p>
                  <ul>
                    {service.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="service-accordion-actions">
                    <Link href={`/servizi/${service.slug}`} className="btn-primary">
                      Apri pagina dedicata
                    </Link>
                    <Link href="/contatti" className="service-detail-secondary">
                      Contatta ISA
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="service-mobile-sticky-cta" style={getServiceBrandStyle(activeService.slug)}>
        <p>
          Servizio selezionato: <strong>{activeService.menuLabel}</strong>
        </p>
        <div className="service-mobile-sticky-links">
          <Link href={`/servizi/${activeService.slug}`} className="btn-primary">
            Apri pagina premium
          </Link>
          <Link href="/contatti" className="service-detail-secondary">
            Richiedi proposta
          </Link>
        </div>
      </div>

      <div
        ref={morphGlowRef}
        className="service-morph-glow"
        style={getServiceBrandStyle(activeService.slug)}
        aria-hidden="true"
      />
    </section>
  );
}

export function ServicePageSummary({
  service,
}: {
  service: ServiceCatalogItem;
}) {
  return (
    <section className="service-page-summary premium-route-section reveal reveal-3 scroll-section">
      <div className="service-page-summary-head">
        <p>{service.eyebrow}</p>
        <h3>Output del servizio</h3>
      </div>
      <div className="service-page-summary-grid">
        {service.deliverables.map((item) => (
          <article key={item} className="stagger-item premium-route-stagger">
            <span aria-hidden="true" className="service-page-summary-dot" />
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
