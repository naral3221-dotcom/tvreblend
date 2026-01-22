import { Wrench, Layers, Zap } from "lucide-react";
import type { SolutionSectionContent } from "@/types";

export const solutionSectionContent: SolutionSectionContent = {
  badge: "해답",
  headline: {
    line1: "그래서 저희는",
    line2: "실부터 다르게",
    highlight: "시작",
  },
  subheadline: [
    "기성품에 의존하지 않습니다.",
    "RAPPO.L — 직접 설계하고 제작한 실로",
    "근본부터 다른 결과를 만듭니다.",
  ],
  features: [
    {
      icon: Wrench,
      title: "자체 개발 실",
      description: "6년 연구 끝에 완성한 RAPPO.L 특허 실",
    },
    {
      icon: Layers,
      title: "복합 설계",
      description: "PDO + PCL, 안전성과 지속력을 동시에",
    },
    {
      icon: Zap,
      title: "맞춤 시술",
      description: "골격·피부 분석 기반 1:1 설계",
    },
  ],
  cta: {
    title: ["처음부터 다른 시작"],
    highlight: "RAPPO.L",
    description: [
      "실이 다르면, 설계가 다르고",
      "설계가 다르면, 결과가 다릅니다.",
    ],
  },
};
