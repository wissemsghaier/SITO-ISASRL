import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servizi Digitali Integrati | ISA SRL",
  description:
    "Soluzioni integrate per efficienza, sicurezza e crescita: fatturazione elettronica, business continuity, reti, cloud e cybersecurity.",
};

export default function ServiziLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
