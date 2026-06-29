import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Area Riservata Backoffice | ISA SRL",
  description:
    "Accesso riservato alla gestione richieste contatto e dashboard analytics A/B.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
