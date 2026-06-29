"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export type LeadVariant = "A" | "B";

type LeadCopy = {
  headerDemo: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  bannerTitle: string;
  bannerText: string;
  bannerCta: string;
};

const STORAGE_KEY = "isa-lead-variant";

export const leadCopyByVariant: Record<LeadVariant, LeadCopy> = {
  A: {
    headerDemo: "Prenota una demo premium",
    heroPrimaryCta: "Richiedi strategia personalizzata",
    heroSecondaryCta: "Scopri il piano di crescita",
    bannerTitle: "Vuoi accelerare risultati e posizionamento digitale?",
    bannerText:
      "Parla con un consulente ISA e ottieni un piano operativo orientato a conversione, efficienza e scalabilita.",
    bannerCta: "Richiedi una consulenza executive",
  },
  B: {
    headerDemo: "Attiva il tuo growth assessment",
    heroPrimaryCta: "Prenota una call con un advisor",
    heroSecondaryCta: "Esplora i servizi ad alto impatto",
    bannerTitle: "Trasforma il sito in un asset commerciale ad alte performance",
    bannerText:
      "Definiamo insieme obiettivi, roadmap e milestone per aumentare lead qualificati e valore percepito del brand.",
    bannerCta: "Avvia il percorso di trasformazione",
  },
};

function computeVariant(seed: string): LeadVariant {
  let score = 0;
  for (let i = 0; i < seed.length; i += 1) {
    score += seed.charCodeAt(i) * (i + 1);
  }
  return score % 2 === 0 ? "A" : "B";
}

export function useLeadVariant() {
  const pathname = usePathname() || "/";

  const defaultVariant = useMemo(() => computeVariant(pathname), [pathname]);
  const [variant, setVariant] = useState<LeadVariant>(defaultVariant);

  useEffect(() => {
    const queryVariant = new URLSearchParams(window.location.search)
      .get("ab")
      ?.toUpperCase();
    if (queryVariant === "A" || queryVariant === "B") {
      sessionStorage.setItem(STORAGE_KEY, queryVariant);
      setVariant(queryVariant);
      return;
    }

    const savedVariant = sessionStorage.getItem(STORAGE_KEY);
    if (savedVariant === "A" || savedVariant === "B") {
      setVariant(savedVariant);
      return;
    }

    sessionStorage.setItem(STORAGE_KEY, defaultVariant);
    setVariant(defaultVariant);
  }, [defaultVariant, pathname]);

  return {
    variant,
    copy: leadCopyByVariant[variant],
  };
}
