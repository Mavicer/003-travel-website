import { Lock } from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';

interface Props {
  onNavigate?: (page: string) => void;
  onCardClick?: (id: string) => void;
}

const NAV_LINKS = [
  { label: '行旅', page: 'journeys' },
  { label: '智选', page: 'smart-picks' },
  { label: '随记', page: 'gallery' },
  { label: '指南', page: 'guide' },
];

export default function Footer({ onNavigate, onCardClick }: Props) {
  return (
    <footer className="bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div
        className="max-w-[960px] mx-auto px-8 pt-20 pb-12"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* ── Brand ── */}
        <div className="mb-12">
          <p className="text-[15px] font-semibold tracking-tight text-white m-0 mb-2">
            Mavicer<sup className="text-[9px]">TM</sup>
          </p>
          <p
            className="text-[13px] text-white/35 m-0 max-w-[360px]"
            style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.6 }}
          >
            行无止境。以直觉，遇见未知。
          </p>
        </div>

        {/* ── Navigation ── */}
        <div className="mb-10">
          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-white/20 mb-3">
            探索
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={page}
                type="button"
                onClick={() => onNavigate?.(page)}
                className="text-[13px] text-white/45 hover:text-white/80 transition-colors bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Destinations ── */}
        <div className="mb-12">
          <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-white/20 mb-3">
            目的地
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                type="button"
                onClick={() => onCardClick?.(dest.id)}
                className="text-[13px] text-white/35 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {dest.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom ── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock size={11} className="text-white/30 shrink-0" strokeWidth={1.5} />
            <span className="text-[10px] font-medium tracking-[0.1em] text-white/25">
              设计即安全。隐私无忧。
            </span>
          </div>
          <span className="text-[10px] text-white/20">
            &copy; 2026 Mavicer
          </span>
        </div>
      </div>
    </footer>
  );
}
