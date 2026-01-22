import { LucideIcon } from "lucide-react";

// ============================================
// Hero Section
// ============================================
export interface HeroContent {
  badge: string;
  headline: {
    line1: string;
    highlight: string;
  };
  subheadline: string;
  cta: {
    primary: string;
    secondary: string;
  };
}

// ============================================
// Before/After Section
// ============================================
export interface BeforeAfterPair {
  beforeImage: string;
  afterImage: string;
}

export interface BeforeAfterCase {
  id: number;
  level: number;
  label: string;
  description: string;
  pairs: BeforeAfterPair[];
}

export interface BeforeAfterSectionContent {
  headline: {
    text: string;
    highlight: string;
  };
  subheadline: string;
  cases: BeforeAfterCase[];
}

// ============================================
// Problem Section
// ============================================
export interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProblemSectionContent {
  headline: {
    text: string;
    highlight: string;
  };
  subheadline: string[];
  emphasis: string;
  problems: Problem[];
}

// ============================================
// Solution Section
// ============================================
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SolutionSectionContent {
  badge: string;
  headline: {
    line1: string;
    line2: string;
    highlight: string;
  };
  subheadline: string[];
  features: Feature[];
  cta: {
    title: string[];
    highlight: string;
    description: string[];
  };
}

// ============================================
// Level System Section
// ============================================
export interface LevelStep {
  step: number;
  name: string;
  shapeKey: string;
  description?: string;
}

export interface Level {
  level: number;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  target: string;
  popular: boolean;
  available: boolean; // 활성화 여부 (준비 중이면 false)
  steps: LevelStep[];
}

export interface LevelSystemContent {
  headline: {
    text: string;
    highlight: string;
  };
  subheadline: string;
  question: string[];
  levels: Level[];
}

// ============================================
// Benefits Section
// ============================================
export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface BenefitsSectionContent {
  headline: {
    text: string;
    highlight: string;
  };
  subheadline: string;
  benefits: Benefit[];
}

// ============================================
// Trust Section
// ============================================
export interface TrustSectionContent {
  badge: string;
  headline: string[];
  subheadline: {
    text: string;
    highlight: string;
  };
  hospital: {
    name: string;
    address: string;
    phone: string;
  };
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

// ============================================
// CTA Section
// ============================================
export interface CTASectionContent {
  headline: string;
  subheadline: string;
  buttons: {
    phone: {
      label: string;
      number: string;
    };
    kakao: {
      label: string;
      url: string;
    };
  };
}

// ============================================
// Footer
// ============================================
export interface FooterContent {
  hospital: string;
  address: string;
  phone: string;
}

// ============================================
// Site Config
// ============================================
export interface SiteConfig {
  name: string;
  url: string;
  phone: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  hours: {
    weekday: { open: string; close: string };
    saturday: { open: string; close: string };
  };
}
