import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firma Digitale e Grafometrica | ISA SRL",
  description:
    "Attivazione firma digitale e grafometrica con validita legale, workflow paperless e supporto operativo continuo.",
};

export default function FirmaDigitaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
