// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import BootstrapClient from "@/components/BootstrapClient";
import ConditionalLayout from "@/components/ConditionalLayout";
import { LanguageProvider } from "@/context/LanguageContext"; // Import the provider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Familienettverk",
  description: "Website for the Familienettverk youth organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        {/* CORRECT ORDER: The Provider must wrap any component that uses its context. */}
        <LanguageProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
          <BootstrapClient />
        </LanguageProvider>
      </body>
    </html>
  );
}
