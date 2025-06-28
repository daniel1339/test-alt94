import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FavoritesProvider } from "@/contexts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropiedadesApp - Sistema de Recomendación",
  description: "Sistema de recomendación de propiedades inmobiliarias con filtros avanzados y similitudes basadas en características",
  keywords: ["propiedades", "inmobiliarias", "recomendaciones", "Argentina"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
