export interface Review {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export const REVIEWS_SECTION = {
  title: "Best Selfie",
  subtitle: "아름다운 변화의 주인공",
};

export const REVIEWS: Review[] = [
  {
    id: 1,
    title: "처진 볼살이 올라갔어요!",
    description: "#LEVEL3 #자연스러움",
    image: "/before-after/level2-before-1.webp",
    link: "#",
  },
  {
    id: 2,
    title: "브이라인 완성",
    description: "#투명실 #리프팅효과",
    image: "/before-after/level2-after-1.webp",
    link: "#",
  },
  {
    id: 3,
    title: "턱선이 살아났어요",
    description: "#LEVEL2 #탄력개선",
    image: "/before-after/level2-after-2.webp",
    link: "#",
  },
  {
    id: 4,
    title: "팔자주름 개선",
    description: "#자연스러운변화 #동안피부",
    image: "/before-after/level2-before-1.webp",
    link: "#",
  },
  {
    id: 5,
    title: "얼굴 윤곽이 살아났어요",
    description: "#LEVEL4 #리프팅맛집",
    image: "/before-after/level2-after-1.webp",
    link: "#",
  },
  {
    id: 6,
    title: "처짐 고민 해결",
    description: "#투명브이리프팅 #만족",
    image: "/before-after/level2-after-2.webp",
    link: "#",
  },
];
