import { Hero } from "@/components/Hero";
import { ThreadShowcaseSection } from "@/components/test/ThreadShowcaseSection";
import { FaceShowcaseSection } from "@/components/test/FaceShowcaseSection";
import { BeforeAfter } from "@/components/BeforeAfter";
import { WhyDifferent } from "@/components/WhyDifferent";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { LevelSystem } from "@/components/LevelSystem";
import { Benefits } from "@/components/Benefits";
import { TrustSection } from "@/components/TrustSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 0. 3D Thread Showcase (Test Section) */}
      <ThreadShowcaseSection />

      {/* 0-1. 3D Face Showcase */}
      <FaceShowcaseSection />

      {/* 1. Hero - 메인 비주얼 */}
      <Hero />

      {/* NEW: 하늘색 크리스탈 테마 - 3페이지 예시 */}
      <WhyDifferent />

      {/* 2. Before/After - 첫 스크롤에서 "와 대박" 후킹 */}
      <BeforeAfter />

      {/* 3. Problem - "왜 나는 안 됐을까?" 공감 유발 */}
      <ProblemSection />

      {/* 4. Solution - "아, 이래서 다른 거구나" 논리적 납득 */}
      <SolutionSection />

      {/* 5. LEVEL System - "나는 몇 번이 맞지?" 선택 유도 */}
      <LevelSystem />

      {/* 6. Benefits + Trust - "여기 믿을 만하네" 확신 */}
      <Benefits />
      <TrustSection />

      {/* 7. CTA - "상담 받아볼까" 전환 */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
