import { Shuffle, AlertCircle, HelpCircle } from "lucide-react";
import type { ProblemSectionContent } from "@/types";

export const problemSectionContent: ProblemSectionContent = {
  headline: {
    text: "왜 기성품 실로는",
    highlight: "부족",
  },
  subheadline: [
    "모든 얼굴은 다릅니다.",
    "피부 두께, 처짐의 정도, 원하는 변화까지.",
  ],
  emphasis: "내 얼굴에 딱 맞는 리프팅, 정말 불가능할까요?",
  problems: [
    {
      icon: Shuffle,
      title: "한 가지 실로는 부족해요",
      description: "모든 얼굴이 다른데, 기성품 하나로 대응하기엔 한계가 있습니다.",
    },
    {
      icon: AlertCircle,
      title: "효과 vs 유지력, 둘 중 하나?",
      description: "초기 효과가 좋으면 유지력이 짧고, 오래가면 효과가 약합니다.",
    },
    {
      icon: HelpCircle,
      title: "나에게 맞는 시술을 모르겠어요",
      description: "복잡한 재료 설명만 듣고 결정하기가 어렵습니다.",
    },
  ],
};
