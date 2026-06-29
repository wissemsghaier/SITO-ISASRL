import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestionale Aziendale e Ordini Professionali | ISA SRL",
  description:
    "Piattaforme gestionali per PMI ed enti professionali: ERP, controllo processi, protocollazione e governance amministrativa.",
};

export default function GestionaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
