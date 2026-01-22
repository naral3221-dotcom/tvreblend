import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "밸런스랩성형외과",
  url: "https://balancelab.kr",
  phone: "1661-8581",
  address: {
    street: "도산대로 109 동원빌딩 3~4층",
    city: "강남구",
    region: "서울",
    postalCode: "06038",
    country: "KR",
  },
  hours: {
    weekday: { open: "10:00", close: "20:00" },
    saturday: { open: "10:00", close: "16:30" },
  },
};

// SEO 메타데이터
export const seoConfig = {
  title: "라포엘 LEVEL 리프팅 | 맞춤형 실리프팅 - 밸런스랩성형외과",
  description:
    "직접 만든 6종의 실로 당신만의 맞춤 리프팅을 설계합니다. PDO+PCL 복합 소재, LEVEL 1/2/3 맞춤 솔루션. 강남 신사역 밸런스랩성형외과",
  keywords: [
    "실리프팅",
    "강남 실리프팅",
    "PDO 실리프팅",
    "PCL 실리프팅",
    "맞춤 실리프팅",
    "라포엘",
    "밸런스랩",
  ],
  openGraph: {
    title: "라포엘 LEVEL 리프팅 | 맞춤형 실리프팅",
    description: "직접 만든 6종의 실로 당신만의 맞춤 리프팅을 설계합니다.",
    image: "/og-image.jpg",
  },
  canonical: "/rapoel-level",
};

// JSON-LD 구조화 데이터
export const generateJsonLd = (config: SiteConfig) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalProcedure",
      name: "라포엘 LEVEL 리프팅",
      alternateName: "라포엘 실리프팅",
      description:
        "PDO와 PCL 복합 소재의 자체 제작 실을 사용한 개인 맞춤형 실리프팅 시술",
      procedureType: "https://schema.org/CosmeticProcedure",
      bodyLocation: "Face",
      howPerformed: "피부 아래에 실을 삽입하여 처진 피부를 끌어올리는 시술",
    },
    {
      "@type": "MedicalBusiness",
      name: config.name,
      image: `${config.url}/logo.png`,
      url: config.url,
      telephone: config.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: config.address.street,
        addressLocality: config.address.city,
        addressRegion: config.address.region,
        postalCode: config.address.postalCode,
        addressCountry: config.address.country,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: config.hours.weekday.open,
          closes: config.hours.weekday.close,
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: config.hours.saturday.open,
          closes: config.hours.saturday.close,
        },
      ],
      priceRange: "₩₩₩",
    },
  ],
});
