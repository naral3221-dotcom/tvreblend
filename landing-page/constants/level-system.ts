import type { LevelSystemContent } from "@/types";

// LEVEL별 3D 모델 경로
export const LEVEL_MODELS = {
  1: null, // 추후 추가 예정
  2: null, // 추후 추가 예정
  3: "/3d-model/LOW LEVEL 3_final.glb",
} as const;

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
      title: "LEVEL 1",
      tagline: "1번 당기는 리프팅",
      description: "티 나지 않게, 하지만 확실하게. 미세한 처짐부터 자연스럽게 개선합니다.",
      features: [
        "단일 레이어 집중 견인",
        "PCL & PDO 조합 (12~16줄)",
        "자연스러운 라인 정리",
      ],
      target: "처음 실리프팅을 시작하는 분, 자연스러운 변화를 원하는 분",
      popular: false,
      available: false, // 준비 중
      steps: [
        { step: 1, name: "STEP 1", shapeKey: "level 1_1" },
        { step: 2, name: "STEP 2", shapeKey: "level 1_2" },
        { step: 3, name: "STEP 3", shapeKey: "level 1_3" },
      ],
    },
    {
      level: 2,
      title: "LEVEL 2",
      tagline: "2번 당기는 리프팅",
      description: "한 번이 아닌 두 번. 처진 피부를 확실하게 끌어올립니다.",
      features: [
        "듀얼 레이어 복합 견인",
        "PCL & PDO 조합 (24~26줄)",
        "확실한 리프팅 + 장기 유지",
      ],
      target: "눈에 보이는 변화를 원하는 분, 확실한 라인 개선이 필요한 분",
      popular: true,
      available: false, // 준비 중
      steps: [
        { step: 1, name: "STEP 1", shapeKey: "level 2_1" },
        { step: 2, name: "STEP 2", shapeKey: "level 2_2" },
        { step: 3, name: "STEP 3", shapeKey: "level 2_3" },
      ],
    },
    {
      level: 3,
      title: "LEVEL 3",
      tagline: "2번 당김 + 더 탄탄하게",
      description: "3중 견인 시스템으로 완성하는 가장 탄탄한 얼굴 골격.",
      features: [
        "고강도 복합 견인 + 밀도 강화",
        "PCL & PDO 조합 (고밀도)",
        "최대 효과 + 최장 유지",
      ],
      target: "최대 효과를 원하는 분, 유지 기간까지 극대화하고 싶은 분",
      popular: false,
      available: true, // 활성화
      steps: [
        { step: 1, name: "STEP 1", shapeKey: "level 3_1", description: "기초 리프팅" },
        { step: 2, name: "STEP 2", shapeKey: "level 3_2", description: "중간 강화" },
        { step: 3, name: "STEP 3", shapeKey: "level 3_3", description: "최종 완성" },
      ],
    },
  ],
};
