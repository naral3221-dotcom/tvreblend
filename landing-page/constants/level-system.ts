import type { LevelSystemContent } from "@/types";

export const levelSystemContent: LevelSystemContent = {
  headline: {
    text: "나에게 맞는",
    highlight: "LEVEL",
  },
  subheadline: "효과 중심의 직관적 선택, LEVEL 시스템",
  question: [
    "\"몇 번 당기는 리프팅인가요?\"",
    "이 질문 하나로 나에게 맞는 시술을 찾을 수 있습니다.",
  ],
  levels: [
    {
      level: 1,
      title: "1번 당기는 리프팅",
      tagline: "자연스러운 첫 리프팅",
      description: "티 나지 않게, 하지만 확실하게. 미세한 처짐부터 자연스럽게 개선합니다.",
      features: [
        "단일 레이어 집중 견인",
        "PCL & PDO 조합 (12~16줄)",
        "자연스러운 라인 정리",
      ],
      target: "처음 실리프팅을 시작하는 분, 자연스러운 변화를 원하는 분",
      popular: false,
    },
    {
      level: 2,
      title: "2번 당기는 리프팅",
      tagline: "확실하게 끌어올리는 이중 견인",
      description: "한 번이 아닌 두 번. 처진 피부를 확실하게 끌어올립니다.",
      features: [
        "듀얼 레이어 복합 견인",
        "PCL & PDO 조합 (24~26줄)",
        "확실한 리프팅 + 장기 유지",
      ],
      target: "눈에 보이는 변화를 원하는 분, 확실한 라인 개선이 필요한 분",
      popular: true,
    },
    {
      level: 3,
      title: "2번 당김 + 더 탄탄하게",
      tagline: "얼굴의 뼈대를 다시 세우는 프리미엄 설계",
      description: "3중 견인 시스템으로 완성하는 가장 탄탄한 얼굴 골격.",
      features: [
        "고강도 복합 견인 + 밀도 강화",
        "PCL & PDO 조합 (고밀도)",
        "최대 효과 + 최장 유지",
      ],
      target: "최대 효과를 원하는 분, 유지 기간까지 극대화하고 싶은 분",
      popular: false,
    },
  ],
};
