import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progetti MEPA per Scuola e PA | ISA SRL",
  description:
    "Forniture e progetti MEPA per scuola e pubblica amministrazione: ambienti digitali, reti affidabili e delivery tecnico end-to-end.",
};

export default function MepaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
