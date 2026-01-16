import { Wrench, Layers, Zap } from "lucide-react";
import type { SolutionSectionContent } from "@/types";

export const solutionSectionContent: SolutionSectionContent = {
  badge: "Designer & Maker",
  headline: {
    line1: "우리가 직접 만든 실로,",
    line2: "당신의 얼굴을",
    highlight: "설계",
  },
  subheadline: [
    "라포엘은 기성품에 의존하지 않습니다.",
    "병원이 직접 설계하고 제작한 6종의 실로",
    "당신의 얼굴 구조와 고민에 맞춘 최적의 조합을 찾습니다.",
  ],
  features: [
    {
      icon: Wrench,
      title: "자체 제작",
      description: "병원이 직접 설계하고 만든 라포엘 실",
    },
    {
      icon: Layers,
      title: "6종 라인업",
      description: "효과와 부위별 최적화된 실 구성",
    },
    {
      icon: Zap,
      title: "복합 소재",
      description: "PDO + PCL, 고정력과 지속성 동시에",
    },
  ],
  cta: {
    title: ["장실로 끌어올리고, 단실로 채우는"],
    highlight: "입체 설계",
    description: [
      "PDO의 고정력과 PCL의 지속성을 동시에.",
      "이것이 라포엘만의 맞춤 리프팅입니다.",
    ],
  },
};
