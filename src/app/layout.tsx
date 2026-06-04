import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TREND NETWORK | حلول شبكات متكاملة وعالمية",
  description: "حلول متقدمة لإدارة شبكات الكافيهات وسيرفرات مايكروتيك وكروت الهوتسبوت في مصر، السودان، العراق، ليبيا، اليمن، وسوريا.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-brand-navy font-sans flex flex-col">
        {children}
      </body>
    </html>
  );
}


