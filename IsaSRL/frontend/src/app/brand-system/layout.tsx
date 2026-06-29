import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linee Guida Brand ISA | ISA SRL",
  description:
    "Riferimento interno per tono, stile visivo e standard editoriali del progetto digitale ISA.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrandSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
