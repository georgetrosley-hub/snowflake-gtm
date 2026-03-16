import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ApiKeyProvider } from "@/app/context/api-key-context";
import { ThemeProvider } from "@/app/context/theme-context";
import { ToastProvider } from "@/app/context/toast-context";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.snowflake.com/en/");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GTM Command Center | Snowflake — Internal AE Hub",
  description:
    "Internal GTM command center for Snowflake Account Executives. Platform narrative, strategic timeline, deal playbooks, and field kit for the AI Data Cloud.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "GTM Command Center | Snowflake",
    description:
      "Internal GTM hub for Snowflake AEs — AI Data Cloud platform story, deal execution, and field kit.",
    url: "/",
    siteName: "Snowflake GTM",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GTM Command Center | Snowflake",
    description: "Internal GTM hub for Snowflake Account Executives.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (() => {
      try {
        var s = localStorage.getItem("snowflake-gtm-theme");
        var theme = (s === "light" || s === "dark") ? s : "dark";
        document.documentElement.dataset.theme = theme;
        document.documentElement.classList.toggle("dark", theme === "dark");
        document.documentElement.classList.toggle("light", theme === "light");
      } catch {}
    })();
  `;

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ApiKeyProvider>
            <ToastProvider>{children}</ToastProvider>
          </ApiKeyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
