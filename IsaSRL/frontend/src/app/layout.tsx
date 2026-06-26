import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-primary",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-code",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IsaSRL | Digital Platform",
  description: "Modern enterprise website for IsaSRL powered by Next.js, Express and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${sora.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
