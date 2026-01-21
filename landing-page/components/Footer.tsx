import { footerContent } from "@/constants";

export function Footer() {
  const { hospital, address, phone } = footerContent;

  return (
    <footer className="relative bg-slate-900 text-slate-400 py-12 overflow-hidden">
      {/* 상단 그라데이션 라인 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* 글로우 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center text-sm space-y-3">
          {/* 로고/병원명 */}
          <p className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
            {hospital}
          </p>

          {/* 주소 */}
          <p className="text-slate-500">{address}</p>

          {/* 전화 */}
          <p className="text-slate-400">
            대표전화:{" "}
            <a
              href={`tel:${phone}`}
              className="text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {phone}
            </a>
          </p>

          {/* 구분선 */}
          <div className="w-16 h-px bg-slate-700 mx-auto my-4" />

          {/* 저작권 */}
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} {hospital}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
