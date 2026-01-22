---
name: seo-optimize
description: 웹페이지의 SEO를 최적화합니다. 메타태그, 키워드, 구조화 데이터가 필요할 때 자동으로 사용됩니다.
allowed-tools: Read, Write, Edit
---

# SEO 최적화 스킬

웹페이지의 검색 엔진 최적화를 수행합니다.

## Next.js SEO 구현

### 1. Metadata API

```tsx
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '사이트명',
    template: '%s | 사이트명',
  },
  description: '설명',
  openGraph: {
    title: '',
    description: '',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

### 2. 동적 메타데이터

```tsx
// app/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const data = await getData(params.slug);
  return {
    title: data.title,
    description: data.description,
  };
}
```

## JSON-LD 구조화 데이터

### MedicalProcedure (시술 정보)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": "라포엘 LEVEL 리프팅",
  "description": "개인 맞춤형 실리프팅",
  "procedureType": "https://schema.org/CosmeticProcedure",
  "howPerformed": "실을 이용한 리프팅"
}
```

### LocalBusiness (병원 정보)

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "밸런스랩성형외과",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "도산대로 109",
    "addressLocality": "서울 강남구"
  },
  "telephone": "1661-8581"
}
```

## 시맨틱 HTML 가이드

```html
<header>
  <nav>...</nav>
</header>
<main>
  <section aria-label="Hero">
    <h1>메인 제목</h1>
  </section>
  <section aria-label="Features">
    <h2>섹션 제목</h2>
  </section>
</main>
<footer>...</footer>
```

## 이미지 최적화

```tsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="키워드 포함 설명"
  width={800}
  height={600}
  priority={isAboveFold}
/>
```

## 의료 분야 SEO 주의사항

- 과장 광고 표현 피하기
- E-E-A-T (경험, 전문성, 권위, 신뢰) 강조
- 의료법 준수 문구 확인
