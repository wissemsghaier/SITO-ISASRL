import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistenza Tecnica Remota e On Site | ISA SRL",
  description:
    "Supporto tecnico rapido e strutturato: help desk dedicato, intervento remoto sicuro e continuita operativa per aziende e studi.",
};

export default function AssistenzaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
