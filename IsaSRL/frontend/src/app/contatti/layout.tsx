import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti e Consulenza Tecnologica | ISA SRL",
  description:
    "Parla con il team ISA e ricevi una proposta su misura: consulenza, roadmap operativa e supporto tecnico-commerciale.",
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
