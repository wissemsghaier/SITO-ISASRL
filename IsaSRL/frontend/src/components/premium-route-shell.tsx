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

type MobileMotionProfile = {
  mode: "ultra-smooth" | "balanced" | "punchy" | "dramatic" | "technical";
  sectionDuration: number;
  sectionDelayStep: number;
  sectionStart: string;
  sectionY: number;
  sectionX: number;
  sectionRotate: number;
  cardDuration: number;
  cardDelayStep: number;
  cardStart: string;
  cardY: number;
  cardXOffset: number;
  introEyebrowDuration: number;
  introTitleDuration: number;
  introDescriptionDuration: number;
  introChipDuration: number;
  introCueDuration: number;
  titleOverlap: string;
  descriptionOverlap: string;
  chipOverlap: string;
  cueOverlap: string;
  introParallax: number;
  introStart: string;
  cueDotTravel: number;
  cueDotDuration: number;
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

const defaultMobileMotionProfile: MobileMotionProfile = {
  mode: "balanced",
  sectionDuration: 0.56,
  sectionDelayStep: 0.02,
  sectionStart: "top 90%",
  sectionY: 20,
  sectionX: 26,
  sectionRotate: 0,
  cardDuration: 0.44,
  cardDelayStep: 0.028,
  cardStart: "top 94%",
  cardY: 14,
  cardXOffset: 12,
  introEyebrowDuration: 0.38,
  introTitleDuration: 0.46,
  introDescriptionDuration: 0.42,
  introChipDuration: 0.34,
  introCueDuration: 0.3,
  titleOverlap: "-=0.26",
  descriptionOverlap: "-=0.3",
  chipOverlap: "-=0.24",
  cueOverlap: "-=0.2",
  introParallax: -2,
  introStart: "top 92%",
  cueDotTravel: 5,
  cueDotDuration: 0.78,
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

const mobileMotionByPath: Record<string, MobileMotionProfile> = {
  "/azienda": {
    mode: "ultra-smooth",
    sectionDuration: 0.66,
    sectionDelayStep: 0.03,
    sectionStart: "top 92%",
    sectionY: 16,
    sectionX: 18,
    sectionRotate: 0,
    cardDuration: 0.54,
    cardDelayStep: 0.035,
    cardStart: "top 95%",
    cardY: 10,
    cardXOffset: 8,
    introEyebrowDuration: 0.44,
    introTitleDuration: 0.52,
    introDescriptionDuration: 0.48,
    introChipDuration: 0.4,
    introCueDuration: 0.34,
    titleOverlap: "-=0.22",
    descriptionOverlap: "-=0.24",
    chipOverlap: "-=0.22",
    cueOverlap: "-=0.18",
    introParallax: -1.2,
    introStart: "top 94%",
    cueDotTravel: 4,
    cueDotDuration: 1.08,
  },
  "/news": {
    mode: "punchy",
    sectionDuration: 0.46,
    sectionDelayStep: 0.015,
    sectionStart: "top 90%",
    sectionY: 22,
    sectionX: 32,
    sectionRotate: 0,
    cardDuration: 0.36,
    cardDelayStep: 0.02,
    cardStart: "top 93%",
    cardY: 16,
    cardXOffset: 16,
    introEyebrowDuration: 0.32,
    introTitleDuration: 0.38,
    introDescriptionDuration: 0.34,
    introChipDuration: 0.28,
    introCueDuration: 0.24,
    titleOverlap: "-=0.18",
    descriptionOverlap: "-=0.2",
    chipOverlap: "-=0.16",
    cueOverlap: "-=0.12",
    introParallax: -2.6,
    introStart: "top 92%",
    cueDotTravel: 6,
    cueDotDuration: 0.58,
  },
  "/servizi": {
    ...defaultMobileMotionProfile,
    mode: "balanced",
  },
  "/assistenza": {
    ...defaultMobileMotionProfile,
    mode: "balanced",
    sectionDuration: 0.52,
    cardDuration: 0.4,
    cueDotDuration: 0.72,
  },
  "/contatti": {
    ...defaultMobileMotionProfile,
    mode: "ultra-smooth",
    sectionDuration: 0.62,
    cardDuration: 0.5,
    sectionY: 14,
    sectionX: 14,
    cardY: 9,
    cardXOffset: 7,
    introParallax: -1,
    cueDotTravel: 3,
    cueDotDuration: 1.04,
  },
  "/privacy": {
    ...defaultMobileMotionProfile,
    mode: "ultra-smooth",
    sectionDuration: 0.62,
    cardDuration: 0.5,
    sectionY: 12,
    sectionX: 12,
    cardY: 8,
    cardXOffset: 6,
    introParallax: -0.8,
    cueDotTravel: 3,
    cueDotDuration: 1.02,
  },
  "/ordini-professionali": {
    ...defaultMobileMotionProfile,
    mode: "dramatic",
    sectionDuration: 0.5,
    sectionDelayStep: 0.018,
    sectionY: 24,
    sectionX: 30,
    cardDuration: 0.39,
    cardDelayStep: 0.024,
    cardY: 16,
    cardXOffset: 15,
    introParallax: -2.8,
    cueDotTravel: 6,
    cueDotDuration: 0.62,
  },
  "/gestionale": {
    ...defaultMobileMotionProfile,
    mode: "dramatic",
    sectionDuration: 0.5,
    sectionDelayStep: 0.018,
    sectionY: 24,
    sectionX: 30,
    cardDuration: 0.39,
    cardDelayStep: 0.024,
    cardY: 16,
    cardXOffset: 15,
    introParallax: -2.8,
    cueDotTravel: 6,
    cueDotDuration: 0.62,
  },
  "/firma-digitale": {
    ...defaultMobileMotionProfile,
    mode: "technical",
    sectionDuration: 0.48,
    sectionDelayStep: 0.016,
    sectionY: 20,
    sectionX: 28,
    cardDuration: 0.37,
    cardDelayStep: 0.022,
    cardY: 14,
    cardXOffset: 14,
    introParallax: -2.2,
    cueDotTravel: 5,
    cueDotDuration: 0.64,
  },
  "/whistleblowing": {
    ...defaultMobileMotionProfile,
    mode: "technical",
    sectionDuration: 0.48,
    sectionDelayStep: 0.016,
    sectionY: 20,
    sectionX: 28,
    cardDuration: 0.37,
    cardDelayStep: 0.022,
    cardY: 14,
    cardXOffset: 14,
    introParallax: -2.2,
    cueDotTravel: 5,
    cueDotDuration: 0.64,
  },
  "/mepa": {
    ...defaultMobileMotionProfile,
    mode: "technical",
    sectionDuration: 0.5,
    sectionDelayStep: 0.017,
    sectionY: 21,
    sectionX: 28,
    cardDuration: 0.38,
    cardDelayStep: 0.024,
    cardY: 15,
    cardXOffset: 14,
    introParallax: -2.2,
    cueDotTravel: 5,
    cueDotDuration: 0.66,
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
      const isMobile = window.matchMedia("(max-width: 900px)").matches;
      const mobileMotionProfile = mobileMotionByPath[pagePath] || defaultMobileMotionProfile;
      rootRef.current.dataset.mobileMotion = isMobile ? mobileMotionProfile.mode : "desktop";
      const sectionDuration = isMobile ? mobileMotionProfile.sectionDuration : 0.78;
      const sectionDelayStep = isMobile ? mobileMotionProfile.sectionDelayStep : 0.03;
      const sectionStart = isMobile ? mobileMotionProfile.sectionStart : "top 86%";
      const sectionY = isMobile ? mobileMotionProfile.sectionY : 34;
      const sectionX = isMobile ? mobileMotionProfile.sectionX : 58;
      const sectionRotate = isMobile ? mobileMotionProfile.sectionRotate : 0.9;
      const cardDuration = isMobile ? mobileMotionProfile.cardDuration : 0.62;
      const cardDelayStep = isMobile ? mobileMotionProfile.cardDelayStep : 0.045;
      const cardStart = isMobile ? mobileMotionProfile.cardStart : "top 92%";
      const cardY = isMobile ? mobileMotionProfile.cardY : 22;
      const cardXOffset = isMobile ? mobileMotionProfile.cardXOffset : 20;
      const introParallax = isMobile ? mobileMotionProfile.introParallax : -5;
      const introStart = isMobile ? mobileMotionProfile.introStart : "top 88%";
      const cueDotTravel = isMobile ? mobileMotionProfile.cueDotTravel : 8;
      const cueDotDuration = isMobile ? mobileMotionProfile.cueDotDuration : 1.15;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".premium-route-section");
        sections.forEach((section, index) => {
          section.dataset.step = String(index + 1).padStart(2, "0");
          const fromLeft = index % 2 === 0;
          const cinematicX = fromLeft ? -sectionX : sectionX;
          const cinematicRotate = fromLeft ? -sectionRotate : sectionRotate;
          section.dataset.cinematic = fromLeft ? "left" : "right";

          gsap.fromTo(
            section,
            {
              opacity: 0,
              y: sectionY,
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
              duration: sectionDuration,
              delay: index * sectionDelayStep,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: sectionStart,
                toggleActions: "play none none reverse",
                onEnter: () => section.classList.add("cinematic-visible"),
                onEnterBack: () => section.classList.add("cinematic-visible"),
                onLeaveBack: () => section.classList.remove("cinematic-visible"),
              },
            }
          );
        });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            ".premium-route-intro .premium-route-eyebrow",
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? mobileMotionProfile.introEyebrowDuration : 0.55,
            }
          )
          .fromTo(
            ".premium-route-intro h2",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? mobileMotionProfile.introTitleDuration : 0.68,
            },
            isMobile ? mobileMotionProfile.titleOverlap : "-=0.36"
          )
          .fromTo(
            ".premium-route-intro .premium-route-description",
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? mobileMotionProfile.introDescriptionDuration : 0.62,
            },
            isMobile ? mobileMotionProfile.descriptionOverlap : "-=0.4"
          )
          .fromTo(
            ".premium-route-intro .premium-route-chip-row",
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? mobileMotionProfile.introChipDuration : 0.55,
            },
            isMobile ? mobileMotionProfile.chipOverlap : "-=0.38"
          )
          .fromTo(
            ".premium-route-intro .premium-scroll-cue",
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? mobileMotionProfile.introCueDuration : 0.55,
            },
            isMobile ? mobileMotionProfile.cueOverlap : "-=0.28"
          );

        gsap.to(".premium-scroll-cue-dot", {
          y: cueDotTravel,
          repeat: -1,
          yoyo: true,
          duration: cueDotDuration,
          ease: "sine.inOut",
        });

        gsap.to(".premium-route-intro .premium-route-intro-copy", {
          yPercent: introParallax,
          ease: "none",
          scrollTrigger: {
            trigger: ".premium-route-intro",
            start: introStart,
            end: "bottom top",
            scrub: true,
          },
        });

        const cards = gsap.utils.toArray<HTMLElement>(".premium-route-stagger");
        cards.forEach((card, index) => {
          const cardFromLeft = index % 2 !== 0;
          const cardX = cardFromLeft ? -cardXOffset : cardXOffset;

          gsap.fromTo(
            card,
            { opacity: 0, y: cardY, x: cardX },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: cardDuration,
              delay: (index % 4) * cardDelayStep,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: cardStart,
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

          <div className="premium-scroll-cue" aria-hidden="true">
            <span>scroll down</span>
            <span className="premium-scroll-cue-line" />
            <span className="premium-scroll-cue-dot" />
          </div>
        </div>
      </section>

      {children}
    </div>
  );
}
