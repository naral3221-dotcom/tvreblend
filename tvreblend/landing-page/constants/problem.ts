import { Shuffle, AlertCircle, HelpCircle } from "lucide-react";
import type { ProblemSectionContent } from "@/types";

export const problemSectionContent: ProblemSectionContent = {
  headline: {
    text: "왜 다른 곳에선",
    highlight: "안 됐을까요",
  },
  subheadline: [
    "실리프팅을 받아봤지만 만족스럽지 않았다면,",
    "그건 당신 탓이 아닙니다.",
  ],
  emphasis: "실이 달랐기 때문입니다.",
  problems: [
    {
      icon: Shuffle,
      title: "실이 하나뿐이었습니다",
      description: "모든 얼굴이 다른데, 같은 실 하나로 대응하려 했습니다.",
    },
    {
      icon: AlertCircle,
      title: "효과와 유지력, 둘 다 포기했습니다",
      description: "기존 실은 효과가 좋으면 짧고, 오래가면 약합니다.",
    },
    {
      icon: HelpCircle,
      title: "맞춤 설계가 없었습니다",
      description: "얼굴 분석 없이 표준 매뉴얼로만 시술했습니다.",
    },
  ],
};
