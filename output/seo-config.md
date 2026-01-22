# SEO 설정 가이드

> 라포엘 LEVEL 리프팅 랜딩페이지

---

## 1. 키워드 전략

### 주요 키워드

| 키워드 | 검색 의도 | 우선순위 |
|:------|:---------|:--------|
| 실리프팅 | 정보 탐색 | ★★★ |
| 강남 실리프팅 | 지역 기반 | ★★★ |
| 실리프팅 가격 | 구매 의도 | ★★☆ |
| PDO 실리프팅 | 전문 탐색 | ★★☆ |
| PCL 실리프팅 | 전문 탐색 | ★★☆ |
| 맞춤 실리프팅 | 차별화 | ★★☆ |

### 롱테일 키워드

- 강남 실리프팅 잘하는곳
- 실리프팅 PDO PCL 차이
- 자연스러운 실리프팅
- 실리프팅 유지기간
- 팔자주름 실리프팅
- 볼처짐 실리프팅
- 이중턱 실리프팅

### 브랜드 키워드

- 라포엘 실리프팅
- 밸런스랩 실리프팅
- 라포엘 LEVEL

---

## 2. 메타 태그

### Title Tag
```
라포엘 LEVEL 리프팅 | 맞춤형 실리프팅 - 밸런스랩성형외과
```
(55자)

### Meta Description
```
직접 만든 6종의 실로 당신만의 맞춤 리프팅을 설계합니다. PDO+PCL 복합 소재, LEVEL 1/2/3 맞춤 솔루션. 강남 신사역 밸런스랩성형외과 ☎ 1661-8581
```
(97자)

### Keywords (참고용)
```
실리프팅, 강남 실리프팅, PDO 실리프팅, PCL 실리프팅, 맞춤 실리프팅, 라포엘, 밸런스랩
```

---

## 3. Open Graph 태그

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: '라포엘 LEVEL 리프팅 | 맞춤형 실리프팅 - 밸런스랩성형외과',
  description: '직접 만든 6종의 실로 당신만의 맞춤 리프팅을 설계합니다. PDO+PCL 복합 소재, LEVEL 1/2/3 맞춤 솔루션.',
  openGraph: {
    title: '라포엘 LEVEL 리프팅 | 맞춤형 실리프팅',
    description: '직접 만든 6종의 실로 당신만의 맞춤 리프팅을 설계합니다.',
    url: 'https://balancelab.kr/rapoel-level',
    siteName: '밸런스랩성형외과',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '라포엘 LEVEL 리프팅',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '라포엘 LEVEL 리프팅 | 맞춤형 실리프팅',
    description: '직접 만든 6종의 실로 당신만의 맞춤 리프팅을 설계합니다.',
    images: ['/og-image.jpg'],
  },
};
```

---

## 4. 구조화 데이터 (JSON-LD)

### MedicalProcedure (시술 정보)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "라포엘 LEVEL 리프팅",
  "alternateName": "라포엘 실리프팅",
  "description": "PDO와 PCL 복합 소재의 자체 제작 실을 사용한 개인 맞춤형 실리프팅 시술",
  "procedureType": "https://schema.org/CosmeticProcedure",
  "bodyLocation": "Face",
  "howPerformed": "피부 아래에 실을 삽입하여 처진 피부를 끌어올리는 시술",
  "preparation": "시술 전 상담을 통해 LEVEL 1/2/3 중 적합한 플랜을 선택",
  "followup": "시술 후 정기적인 관리 및 터치업 가능",
  "status": "https://schema.org/EventScheduled"
}
```

### LocalBusiness (병원 정보)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "밸런스랩성형외과",
  "image": "https://balancelab.kr/logo.png",
  "url": "https://balancelab.kr",
  "telephone": "1661-8581",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "도산대로 109 동원빌딩 3~4층",
    "addressLocality": "강남구",
    "addressRegion": "서울",
    "postalCode": "06038",
    "addressCountry": "KR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.5172,
    "longitude": 127.0286
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:30"
    }
  ],
  "priceRange": "₩₩₩",
  "medicalSpecialty": "PlasticSurgery"
}
```

### Service (서비스 상세)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "실리프팅",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "밸런스랩성형외과"
  },
  "areaServed": {
    "@type": "City",
    "name": "서울"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "라포엘 LEVEL 시스템",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "LEVEL 1 - 1번 당기는 리프팅",
          "description": "단일 레이어 집중 견인, 자연스러운 첫 리프팅"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "LEVEL 2 - 2번 당기는 리프팅",
          "description": "듀얼 레이어 복합 견인, 확실한 리프팅"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "LEVEL 3 - 프리미엄 리프팅",
          "description": "고강도 복합 견인 + 밀도 강화, 최대 효과"
        }
      }
    ]
  }
}
```

---

## 5. 시맨틱 HTML 권장사항

### 페이지 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <!-- Meta tags -->
  <!-- JSON-LD -->
</head>
<body>
  <header>
    <nav aria-label="메인 네비게이션">...</nav>
  </header>

  <main>
    <section aria-labelledby="hero-title">
      <h1 id="hero-title">당신의 얼굴을 설계합니다</h1>
    </section>

    <section aria-labelledby="problem-title">
      <h2 id="problem-title">왜 기성품 실로는 부족할까요?</h2>
    </section>

    <section aria-labelledby="solution-title">
      <h2 id="solution-title">Designer & Maker, 라포엘</h2>
    </section>

    <section aria-labelledby="level-title">
      <h2 id="level-title">나에게 맞는 LEVEL은?</h2>
      <article><!-- LEVEL 1 --></article>
      <article><!-- LEVEL 2 --></article>
      <article><!-- LEVEL 3 --></article>
    </section>

    <section aria-labelledby="benefits-title">
      <h2 id="benefits-title">왜 라포엘인가요?</h2>
    </section>

    <section aria-labelledby="cta-title">
      <h2 id="cta-title">지금 상담 예약하기</h2>
    </section>
  </main>

  <footer>
    <address>...</address>
  </footer>
</body>
</html>
```

### Heading 구조

```
h1: 당신의 얼굴을 설계합니다 (페이지당 1개)
├── h2: 왜 기성품 실로는 부족할까요?
├── h2: Designer & Maker, 라포엘
├── h2: 나에게 맞는 LEVEL은?
│   ├── h3: LEVEL 1
│   ├── h3: LEVEL 2
│   └── h3: LEVEL 3
├── h2: 왜 라포엘인가요?
└── h2: 지금 상담 예약하기
```

---

## 6. 이미지 최적화 가이드

### 파일명 규칙
```
rapoel-level-lifting-hero.webp
level-1-natural-lifting.webp
level-2-double-lifting.webp
level-3-premium-lifting.webp
```

### Alt 텍스트 예시

| 이미지 | Alt 텍스트 |
|:------|:----------|
| Hero 배경 | "라포엘 LEVEL 리프팅 - 맞춤형 실리프팅" |
| LEVEL 1 | "LEVEL 1 자연스러운 첫 리프팅 - 단일 레이어 견인" |
| LEVEL 2 | "LEVEL 2 확실한 이중 견인 리프팅" |
| LEVEL 3 | "LEVEL 3 프리미엄 3중 견인 리프팅" |

### 이미지 사이즈

| 용도 | 권장 사이즈 | 포맷 |
|:----|:----------|:----|
| OG Image | 1200 x 630 | JPG |
| Hero 배경 | 1920 x 1080 | WebP |
| 카드 이미지 | 600 x 400 | WebP |
| 아이콘 | SVG | SVG |

---

## 7. 성능 최적화 체크리스트

### Core Web Vitals 목표

| 지표 | 목표 | 설명 |
|:----|:----|:----|
| LCP | < 2.5s | 최대 콘텐츠 페인트 |
| FID | < 100ms | 첫 입력 지연 |
| CLS | < 0.1 | 누적 레이아웃 이동 |

### 최적화 방법

1. **이미지**: next/image 사용, WebP 포맷
2. **폰트**: next/font로 Pretendard 최적화
3. **JS**: 동적 import, 코드 스플리팅
4. **CSS**: Tailwind purge, 미사용 스타일 제거

---

## 8. 의료 분야 SEO 주의사항

### 피해야 할 표현
- "최고의", "최초의", "완벽한"
- 확정적 효과 보장 문구
- 타 병원 비방

### 권장 표현
- "개인차가 있을 수 있습니다"
- "상담을 통해 확인해 주세요"
- 객관적인 정보 제공

### E-E-A-T 강화
- **Experience**: 실제 시술 경험/사례
- **Expertise**: 전문 의료진 정보
- **Authoritativeness**: 병원 공식 정보
- **Trustworthiness**: 정확한 연락처, 주소

---

## 9. 구현 코드 (Next.js)

### layout.tsx에 적용

```tsx
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://balancelab.kr'),
  title: {
    default: '라포엘 LEVEL 리프팅 | 맞춤형 실리프팅 - 밸런스랩성형외과',
    template: '%s | 밸런스랩성형외과',
  },
  description: '직접 만든 6종의 실로 당신만의 맞춤 리프팅을 설계합니다.',
  keywords: ['실리프팅', '강남 실리프팅', 'PDO 실리프팅', '라포엘', '밸런스랩'],
  authors: [{ name: '밸런스랩성형외과' }],
  openGraph: {
    // ... OG 설정
  },
  twitter: {
    // ... Twitter 설정
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://balancelab.kr/rapoel-level',
  },
};

// JSON-LD 스크립트
const jsonLd = {
  // ... 구조화 데이터
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```
