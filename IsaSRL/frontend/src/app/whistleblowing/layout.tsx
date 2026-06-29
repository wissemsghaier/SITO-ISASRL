import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whistleblowing e Compliance | ISA SRL",
  description:
    "Canale whistleblowing sicuro e conforme al D.Lgs. 24/2023, con governance strutturata e tutela dei segnalanti.",
};

export default function WhistleblowingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
