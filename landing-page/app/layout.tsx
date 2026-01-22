import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { siteConfig, seoConfig, generateJsonLd } from "@/config";
import "./globals.css";

// 프리텐다드 - 메인 폰트 (로컬 또는 CDN)
const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

// 한글 명조체 (고급스러운 느낌)
const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: seoConfig.openGraph.title,
    description: seoConfig.openGraph.description,
    url: `${siteConfig.url}${seoConfig.canonical}`,
    siteName: siteConfig.name,
    images: [
      {
        url: seoConfig.openGraph.image,
        width: 1200,
        height: 630,
        alt: seoConfig.openGraph.title,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.openGraph.title,
    description: seoConfig.openGraph.description,
    images: [seoConfig.openGraph.image],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteConfig.url}${seoConfig.canonical}`,
  },
};

const jsonLd = generateJsonLd(siteConfig);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${pretendard.variable} ${nanumMyeongjo.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
