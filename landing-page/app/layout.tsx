import type { Metadata } from "next";
import {
  // 한글 폰트
  Noto_Sans_KR,
  Nanum_Myeongjo,
  Nanum_Pen_Script,
  Nanum_Gothic,
  Gothic_A1,
  Do_Hyeon,
  Jua,
  Gamja_Flower,
  Gaegu,
  Hi_Melody,
  Black_Han_Sans,
  Sunflower,
  Song_Myung,
  Noto_Serif_KR,
  // 영문 디스플레이 폰트
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
  Poppins,
  Oswald,
  Raleway,
  Lora,
  Merriweather,
  Libre_Baskerville,
  Cinzel,
  // 필기체/캘리그라피
  Dancing_Script,
  Great_Vibes,
  Pacifico,
  Sacramento,
  Satisfy,
  Allura,
  Tangerine,
  Alex_Brush,
  Pinyon_Script,
  Petit_Formal_Script
} from "next/font/google";
import Script from "next/script";
import { siteConfig, seoConfig, generateJsonLd } from "@/config";
import "./globals.css";

// ============================================
// 한글 폰트
// ============================================

// 본문용 산세리프체
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

// 한글 명조체 (고급스러운 느낌)
const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
});

// 한글 손글씨체
const nanumPenScript = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nanum-pen",
  display: "swap",
});

// 나눔고딕 (깔끔한 본문용)
const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-gothic",
  display: "swap",
});

// 고딕 A1 (모던한 느낌)
const gothicA1 = Gothic_A1({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-gothic-a1",
  display: "swap",
});

// 도현 (귀여운 느낌)
const doHyeon = Do_Hyeon({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-do-hyeon",
  display: "swap",
});

// 주아 (둥근 느낌)
const jua = Jua({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jua",
  display: "swap",
});

// 감자꽃 (손글씨 느낌)
const gamjaFlower = Gamja_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gamja-flower",
  display: "swap",
});

// 개구 (손글씨)
const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gaegu",
  display: "swap",
});

// 하이멜로디 (귀여운 손글씨)
const hiMelody = Hi_Melody({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-hi-melody",
  display: "swap",
});

// 검은고딕 (임팩트 있는 제목용)
const blackHanSans = Black_Han_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-black-han-sans",
  display: "swap",
});

// 해바라기 (부드러운 느낌)
const sunflower = Sunflower({
  weight: ["300", "500", "700"],
  variable: "--font-sunflower",
  display: "swap",
});

// 송명 (한글 명조)
const songMyung = Song_Myung({
  weight: ["400"],
  variable: "--font-song-myung",
  display: "swap",
});

// 노토 세리프 (한글 세리프)
const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

// ============================================
// 영문 디스플레이 폰트
// ============================================

// Playfair Display (럭셔리/프리미엄)
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// Cormorant Garamond (우아한 세리프)
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// Montserrat (모던 산세리프)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

// Poppins (깔끔한 산세리프)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Oswald (강렬한 제목용)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

// Raleway (우아한 산세리프)
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

// Lora (클래식 세리프)
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

// Merriweather (가독성 좋은 세리프)
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

// Libre Baskerville (클래식 세리프)
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

// Cinzel (로마/럭셔리 느낌)
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

// ============================================
// 필기체/캘리그라피
// ============================================

// Dancing Script (캐주얼 필기체)
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

// Great Vibes (우아한 캘리그라피)
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

// Pacifico (레트로 필기체)
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
});

// Sacramento (부드러운 필기체)
const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sacramento",
  display: "swap",
});

// Satisfy (캐주얼 필기체)
const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
  display: "swap",
});

// Allura (우아한 필기체)
const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
  display: "swap",
});

// Tangerine (가는 필기체)
const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine",
  display: "swap",
});

// Alex Brush (브러시 필기체)
const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

// Pinyon Script (클래식 필기체)
const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pinyon-script",
  display: "swap",
});

// Petit Formal Script (포멀 필기체)
const petitFormalScript = Petit_Formal_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-petit-formal",
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
      <body className={`
        ${notoSansKR.variable}
        ${nanumMyeongjo.variable}
        ${nanumPenScript.variable}
        ${nanumGothic.variable}
        ${gothicA1.variable}
        ${doHyeon.variable}
        ${jua.variable}
        ${gamjaFlower.variable}
        ${gaegu.variable}
        ${hiMelody.variable}
        ${blackHanSans.variable}
        ${sunflower.variable}
        ${songMyung.variable}
        ${notoSerifKR.variable}
        ${playfairDisplay.variable}
        ${cormorantGaramond.variable}
        ${montserrat.variable}
        ${poppins.variable}
        ${oswald.variable}
        ${raleway.variable}
        ${lora.variable}
        ${merriweather.variable}
        ${libreBaskerville.variable}
        ${cinzel.variable}
        ${dancingScript.variable}
        ${greatVibes.variable}
        ${pacifico.variable}
        ${sacramento.variable}
        ${satisfy.variable}
        ${allura.variable}
        ${tangerine.variable}
        ${alexBrush.variable}
        ${pinyonScript.variable}
        ${petitFormalScript.variable}
        font-sans antialiased
      `}>
        {children}
      </body>
    </html>
  );
}
