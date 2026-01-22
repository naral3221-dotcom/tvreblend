import { Factory, Palette, ShieldCheck, Clock } from "lucide-react";
import type { BenefitsSectionContent } from "@/types";

export const benefitsSectionContent: BenefitsSectionContent = {
  headline: {
    text: "왜",
    highlight: "라포엘",
  },
  subheadline: "우리만의 차별점",
  benefits: [
    {
      icon: Factory,
      title: "자체 제작 실",
      description: "기성품이 아닌, 병원이 직접 설계하고 제작한 맞춤형 실",
    },
    {
      icon: Palette,
      title: "6종 맞춤 조합",
      description: "얼굴 구조와 고민에 따라 최적의 실을 선택하여 조합",
    },
    {
      icon: ShieldCheck,
      title: "PDO + PCL 복합",
      description: "고정력의 PDO와 지속성의 PCL을 동시에 사용하는 입체 설계",
    },
    {
      icon: Clock,
      title: "효과 중심 선택",
      description: "복잡한 설명 없이 LEVEL로 직관적인 시술 선택 가능",
    },
  ],
};
