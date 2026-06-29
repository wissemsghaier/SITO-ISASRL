"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

type PremiumRouteShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  chips: string[];
  children: ReactNode;
};

type RailProfile = {
  name:
    | "soft"
    | "balanced"
    | "dramatic"
    | "pulse"
    | "technical"
    | "azienda-premium";
  glowTravel: number;
  glowOpacityFrom: number;
  glowOpacityTo: number;
  lineOpacityFrom: number;
  lineOpacityTo: number;
};

const enterTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

const defaultRailProfile: RailProfile = {
  name: "balanced",
  glowTravel: 760,
  glowOpacityFrom: 0.62,
  glowOpacityTo: 0.92,
  lineOpacityFrom: 0.28,
  lineOpacityTo: 0.76,
};

// Mini tuning table: route -> profile + speed/intensity values.
const railProfileByPath: Record<string, RailProfile> = {
  "/azienda": {
    name: "azienda-premium",
    glowTravel: 520,
    glowOpacityFrom: 0.42,
    glowOpacityTo: 0.66,
    lineOpacityFrom: 0.16,
    lineOpacityTo: 0.42,
  },
  "/news": {
    name: "azienda-premium",
    glowTravel: 540,
    glowOpacityFrom: 0.44,
    glowOpacityTo: 0.68,
    lineOpacityFrom: 0.18,
    lineOpacityTo: 0.44,
  },
  "/servizi": {
    name: "balanced",
    glowTravel: 760,
    glowOpacityFrom: 0.6,
    glowOpacityTo: 0.9,
    lineOpacityFrom: 0.27,
    lineOpacityTo: 0.74,
  },
  "/assistenza": {
    name: "balanced",
    glowTravel: 740,
    glowOpacityFrom: 0.58,
    glowOpacityTo: 0.86,
    lineOpacityFrom: 0.25,
    lineOpacityTo: 0.68,
  },
  "/contatti": {
    name: "soft",
    glowTravel: 610,
    glowOpacityFrom: 0.44,
    glowOpacityTo: 0.72,
    lineOpacityFrom: 0.2,
    lineOpacityTo: 0.56,
  },
  "/privacy": {
    name: "soft",
    glowTravel: 560,
    glowOpacityFrom: 0.38,
    glowOpacityTo: 0.62,
    lineOpacityFrom: 0.16,
    lineOpacityTo: 0.46,
  },
  "/ordini-professionali": {
    name: "dramatic",
    glowTravel: 1040,
    glowOpacityFrom: 0.84,
    glowOpacityTo: 1,
    lineOpacityFrom: 0.42,
    lineOpacityTo: 1,
  },
  "/gestionale": {
    name: "dramatic",
    glowTravel: 980,
    glowOpacityFrom: 0.8,
    glowOpacityTo: 1,
    lineOpacityFrom: 0.38,
    lineOpacityTo: 0.96,
  },
  "/firma-digitale": {
    name: "technical",
    glowTravel: 870,
    glowOpacityFrom: 0.72,
    glowOpacityTo: 1,
    lineOpacityFrom: 0.34,
    lineOpacityTo: 0.9,
  },
  "/whistleblowing": {
    name: "technical",
    glowTravel: 910,
    glowOpacityFrom: 0.74,
    glowOpacityTo: 1,
    lineOpacityFrom: 0.36,
    lineOpacityTo: 0.92,
  },
  "/mepa": {
    name: "technical",
    glowTravel: 840,
    glowOpacityFrom: 0.68,
    glowOpacityTo: 0.96,
    lineOpacityFrom: 0.32,
    lineOpacityTo: 0.86,
  },
};

export function PremiumRouteShell({
  eyebrow,
  title,
  description,
  chips,
  children,
}: PremiumRouteShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let revertContext: (() => void) | undefined;

    const setupGsap = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      if (!rootRef.current) {
        return;
      }

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !rootRef.current) {
        return;
      }

      const pagePath =
        rootRef.current.closest<HTMLElement>(".landing")?.dataset.page ||
        window.location.pathname;
      const railProfile = railProfileByPath[pagePath] || defaultRailProfile;
      rootRef.current.dataset.railProfile = railProfile.name;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".premium-route-section");
        sections.forEach((section, index) => {
          const fromLeft = index % 2 === 0;
          const cinematicX = fromLeft ? -58 : 58;
          const cinematicRotate = fromLeft ? -0.9 : 0.9;
          section.dataset.cinematic = fromLeft ? "left" : "right";

          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: 34,
              x: cinematicX,
              rotate: cinematicRotate,
              filter: "blur(1.6px) saturate(0.92)",
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              rotate: 0,
              filter: "blur(0px) saturate(1)",
              duration: 0.78,
              delay: index * 0.03,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                toggleActions: "play none none reverse",
                onEnter: () => section.classList.add("cinematic-visible"),
                onEnterBack: () => section.classList.add("cinematic-visible"),
                onLeaveBack: () => section.classList.remove("cinematic-visible"),
              },
            }
          );
        });

        const cards = gsap.utils.toArray<HTMLElement>(".premium-route-stagger");
        cards.forEach((card, index) => {
          const cardFromLeft = index % 2 !== 0;
          const cardX = cardFromLeft ? -20 : 20;

          gsap.fromTo(
            card,
            { opacity: 0, y: 22, x: cardX },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.62,
              delay: (index % 4) * 0.045,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        gsap.fromTo(
          ".premium-route-rail-line",
          {
            scaleY: 0.18,
            opacity: railProfile.lineOpacityFrom,
            transformOrigin: "top center",
          },
          {
            scaleY: 1,
            opacity: railProfile.lineOpacityTo,
            ease: "none",
            scrollTrigger: {
              trigger: ".premium-route-shell",
              start: "top 80%",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".premium-route-rail-glow",
          { yPercent: -4, opacity: railProfile.glowOpacityFrom },
          {
            yPercent: railProfile.glowTravel,
            opacity: railProfile.glowOpacityTo,
            ease: "none",
            scrollTrigger: {
              trigger: ".premium-route-shell",
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }, rootRef);

      revertContext = () => ctx.revert();
    };

    void setupGsap();

    return () => {
      cancelled = true;
      revertContext?.();
    };
  }, []);

  return (
    <div className="premium-route-shell" ref={rootRef}>
      <div className="premium-route-rail" aria-hidden="true">
        <span className="premium-route-rail-line" />
        <span className="premium-route-rail-glow" />
      </div>

      <section className="premium-route-intro premium-route-section no-intro-media">
        <div className="premium-route-intro-copy">
          <motion.p
            className="premium-route-eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={enterTransition}
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.08 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="premium-route-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.16 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="premium-route-chip-row"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enterTransition, delay: 0.24 }}
          >
            {chips.map((chip) => (
              <span key={chip} className="premium-route-chip premium-route-stagger">
                {chip}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {children}
    </div>
  );
}
