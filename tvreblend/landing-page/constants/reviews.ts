export interface Review {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export const REVIEWS_SECTION = {
  title: "REAL VOICE",
  subtitle: "실제 고객이 말하는 '실'의 차이",
};

export const REVIEWS: Review[] = [
  {
    id: 1,
    title: "다른 곳에서 2번 받았는데...",
    description: "#RAPPO.L #확실한차이",
    image: "/before-after/level2-before-1.webp",
    link: "#",
  },
  {
    id: 2,
    title: "실이 다르니까 결과가 다르네요",
    description: "#LEVEL2 #유지력좋음",
    image: "/before-after/level2-after-1.webp",
    link: "#",
  },
  {
    id: 3,
    title: "이제야 제대로 된 리프팅을",
    description: "#맞춤설계 #만족도100",
    image: "/before-after/level2-after-2.webp",
    link: "#",
  },
  {
    id: 4,
    title: "왜 여기서 시작 안했을까",
    description: "#RAPPO.L #자연스러움",
    image: "/before-after/level2-before-1.webp",
    link: "#",
  },
  {
    id: 5,
    title: "복합실이라 효과+유지 둘 다",
    description: "#PDO+PCL #LEVEL3",
    image: "/before-after/level2-after-1.webp",
    link: "#",
  },
  {
    id: 6,
    title: "3개월 지났는데도 유지돼요",
    description: "#RAPPO.L #장기유지",
    image: "/before-after/level2-after-2.webp",
    link: "#",
  },
];
