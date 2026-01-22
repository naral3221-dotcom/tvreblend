---
name: landing-page
description: 마케팅 콘텐츠와 디자인 가이드를 바탕으로 Next.js 랜딩페이지를 생성합니다. 상세페이지 코딩이 필요할 때 자동으로 사용됩니다.
allowed-tools: Read, Write, Edit, Bash
---

# 랜딩페이지 스킬

마케팅 콘텐츠와 디자인 가이드를 바탕으로 Next.js 기반 랜딩페이지를 구현합니다.

## 기술 스택

```
Next.js 14 (App Router)
├── TypeScript
├── Tailwind CSS
├── shadcn/ui (기본 UI)
├── Aceternity UI (Hero, LEVEL표, CTA)
├── Framer Motion (최소한)
└── Pretendard 폰트
```

## 프로젝트 구조

```
landing-page/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── ProblemSection.tsx
│   ├── LevelSystem.tsx
│   ├── Benefits.tsx
│   ├── CTA.tsx
│   └── ui/
├── lib/
│   └── utils.ts
└── public/
```

## 코딩 가이드라인

### 1. React Server Components 우선
- 'use client'는 인터랙션 필요한 곳만
- 데이터 페칭은 서버에서

### 2. Tailwind CSS
- 유틸리티 클래스 사용
- @apply 최소화
- 반응형: mobile-first

### 3. 컴포넌트 패턴
```tsx
// Server Component (기본)
export function Section() {
  return <section>...</section>;
}

// Client Component (필요시)
'use client';
import { motion } from 'framer-motion';
export function AnimatedSection() {
  return <motion.section>...</motion.section>;
}
```

### 4. 시맨틱 HTML
- section, article, header, footer 적절히 사용
- h1은 페이지당 1개
- 접근성 고려

## UI 컴포넌트 전략

| 영역 | 라이브러리 |
|:----|:----------|
| 기본 UI | shadcn/ui |
| Hero | Aceternity UI |
| LEVEL 비교표 | Aceternity UI |
| CTA 버튼 | Aceternity UI |

## 성능 최적화

- next/image 사용
- next/font로 폰트 최적화
- Lighthouse Performance 90+ 목표

## 반응형 브레이크포인트

```css
/* Mobile first */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```
