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

const enterTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function PremiumRouteShell({
  eyebrow,
  title,
  description,
  chips,
  children,
}: PremiumRouteShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: { destroy: () => void } | null = null;
    let cancelled = false;

    const loadLottie = async () => {
      if (!lottieRef.current) {
        return;
      }

      const lottie = (await import("lottie-web")).default;
      if (cancelled || !lottieRef.current) {
        return;
      }

      animation = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/data/premium-orbit-lottie.json",
      });
    };

    void loadLottie();

    return () => {
      cancelled = true;
      animation?.destroy();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let revertContext: (() => void) | undefined;

    const setupGsap = async () => {
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

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".premium-route-section");
        sections.forEach((section, index) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.78,
              delay: index * 0.03,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        const cards = gsap.utils.toArray<HTMLElement>(".premium-route-stagger");
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
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

        gsap.to(".premium-route-orbit", {
          yPercent: -12,
          rotation: 7,
          ease: "none",
          scrollTrigger: {
            trigger: ".premium-route-shell",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
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
      <section className="premium-route-intro premium-route-section">
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

        <motion.div
          className="premium-route-intro-media"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...enterTransition, delay: 0.12 }}
        >
          <div className="premium-route-orbit" ref={lottieRef} aria-hidden="true" />
        </motion.div>
      </section>

      {children}
    </div>
  );
}
