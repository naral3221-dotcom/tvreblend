import type { BeforeAfterSectionContent } from "@/types";

export const beforeAfterSectionContent: BeforeAfterSectionContent = {
  headline: {
    text: "실이 다르면,",
    highlight: "결과",
  },
  subheadline: "RAPPO.L 실로 완성한 실제 변화입니다",
  cases: [
    {
      id: 1,
      level: 1,
      label: "LEVEL 1",
      description: "자연스러운 라인 정리",
      pairs: [
        {
          beforeImage: "/before-after/level1-before-1.webp",
          afterImage: "/before-after/level1-after-1.webp",
        },
        {
          beforeImage: "/before-after/level1-before-2.webp",
          afterImage: "/before-after/level1-after-2.webp",
        },
      ],
    },
    {
      id: 2,
      level: 2,
      label: "LEVEL 2",
      description: "확실한 V라인 리프팅",
      pairs: [
        {
          beforeImage: "/before-after/level2-before-1.webp",
          afterImage: "/before-after/level2-after-1.webp",
        },
        {
          beforeImage: "/before-after/level2-before-2.webp",
          afterImage: "/before-after/level2-after-2.webp",
        },
      ],
    },
    {
      id: 3,
      level: 3,
      label: "LEVEL 3",
      description: "탄탄한 얼굴 골격 완성",
      pairs: [
        {
          beforeImage: "/before-after/level3-before-1.webp",
          afterImage: "/before-after/level3-after-1.webp",
        },
        {
          beforeImage: "/before-after/level3-before-2.webp",
          afterImage: "/before-after/level3-after-2.webp",
        },
      ],
    },
  ],
};
