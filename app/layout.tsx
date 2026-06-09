import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ImageGenerationProvider } from '@/providers/image-generation-provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-powered Canvas",
  description: "AI Canvas using the AI SDK by Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased clerk-dark`}>
      <body className="min-h-full flex flex-col">
        <ClerkProvider afterSignOutUrl="/"
        appearance={{
          variables: {
            colorPrimary: "var(--clerk-color-primary)",
            colorPrimaryForeground: "var(--clerk-color-primary-foreground)",
            colorBackground: "var(--clerk-color-background)",
            colorForeground: "var(--clerk-color-foreground)",
            colorMuted: "var(--clerk-color-muted)",
            colorMutedForeground: "var(--clerk-color-muted-foreground)",
          },
        }}
        >
          <ImageGenerationProvider>
            {children}
          </ImageGenerationProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
