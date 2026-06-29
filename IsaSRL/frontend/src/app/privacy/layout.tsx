import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy e Protezione Dati | ISA SRL",
  description:
    "Informative privacy e cookie, trasparenza GDPR e documentazione ufficiale per una gestione responsabile dei dati personali.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
