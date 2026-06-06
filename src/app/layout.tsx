import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport = {
  themeColor: "#0ea5e9"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://trend-network-web.vercel.app"),
  title: "TREND NETWORK | سيستم واي فاي ذكي وإدارة شبكات الكافيهات",
  description: "أنظمة واي فاي ذكية لإدارة وتوزيع سرعات الإنترنت، طباعة كروت شحن الواي فاي السحابية، وحماية الشبكات في مصر والوطن العربي.",
  keywords: [
    "تريند نيتورك",
    "سيستم واي فاي",
    "إدارة شبكات الكافيهات",
    "كروت انترنت سحابية",
    "ميكروتيك سحابة",
    "شحن كروت واي فاي",
    "شبكات كافيهات",
    "حلول شبكات متكاملة",
    "Trend Network",
    "WiFi System",
    "Cafe Network Management",
    "Internet Card Printing"
  ],
  authors: [{ name: "TREND NETWORK Team" }],
  openGraph: {
    title: "TREND NETWORK | سيستم واي فاي ذكي وإدارة شبكات الكافيهات",
    description: "الحل السحابي المتكامل لإدارة شبكة الواي فاي وتوليد كروت الإنترنت لكافيهك بذكاء وسرعة.",
    url: "https://trend-network-web.vercel.app",
    siteName: "TREND NETWORK",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TREND NETWORK Portal Preview"
      }
    ],
    locale: "ar_EG",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TREND NETWORK | سيستم واي فاي ذكي وإدارة شبكات الكافيهات",
    description: "الحل السحابي المتكامل لإدارة شبكة الواي فاي وتوليد كروت الإنترنت لكافيهك بذكاء وسرعة.",
    images: ["/og-image.png"]
  }
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
      <body className="min-h-full bg-white text-brand-navy font-sans flex flex-col selection:bg-brand-blue selection:text-white transition-colors duration-300">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}


