import type { Metadata } from "next";
import "./globals.css";
import "./galaxy.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Providers } from "@/components/providers/Providers";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { GalaxyExperience } from "@/components/motion/GalaxyExperience";

export const metadata: Metadata = {
  title: "Nthoppa - Financial Freedom for Everyone",
  description: "Empowering the unbanked through financial education and inclusive banking products",
  icons: {
    icon: "/favicon.ico",
  },
};

// Viewport exported separately for Next.js 16 compatibility
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <ErrorBoundary>
          <Providers>
            <GalaxyExperience />
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
            <Toaster />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
