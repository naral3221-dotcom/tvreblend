import { Hero } from "@/components/Hero";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhyDifferent } from "@/components/WhyDifferent";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { LevelSystem } from "@/components/LevelSystem";
import { Benefits } from "@/components/Benefits";
import { TrustSection } from "@/components/TrustSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ReviewSlider } from "@/components/ReviewSlider";
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero - 메인 비주얼 */}
      <Hero />

      {/* 2. WhyDifferent - 3D 실 뷰어 */}
      <WhyDifferent />

      {/* 3. LEVEL System - "나는 몇 번이 맞지?" 선택 유도 */}
      <LevelSystem />

      {/* 4. Before/After - 첫 스크롤에서 "와 대박" 후킹 */}
      <BeforeAfter />

      {/* 5. Problem - "왜 나는 안 됐을까?" 공감 유발 */}
      <ProblemSection />

      {/* 6. Solution - "아, 이래서 다른 거구나" 논리적 납득 */}
      <SolutionSection />

      {/* 6. Benefits + Trust - "여기 믿을 만하네" 확신 */}
      <Benefits />
      <TrustSection />

      {/* ReviewSlider - Best Selfie 후기 카드 슬라이더 */}
      <ReviewSlider />

      {/* CTA - "상담 받아볼까" 전환 */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
