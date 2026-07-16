import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowLeft, Sparkles, MapPin, Star, ChevronRight,
} from 'lucide-react';
import {
  type SmartPicksPreferences,
  type TravelStyle,
  type TravelPace,
  type MatchResult,
  matchDestinations,
  DEFAULT_PREFERENCES,
  STYLE_OPTIONS,
  PACE_OPTIONS,
} from '../data/smart-picks';

interface Props {
  onCardClick?: (id: string) => void;
  onBack?: () => void;
}

type Phase = 'preferences' | 'matching' | 'results';

/* ── Style colors ── */
const STYLE_COLORS: Record<string, string> = {
  '自然': '#6BAF7B',
  '城市': '#7B9FC8',
  '美食': '#E07B5A',
  '文化': '#C8A87B',
  '冒险': '#9B7BC8',
};

/* ── Preference card (visual, not form-like) ── */
function StyleCard({ option, selected, onClick }: {
  option: typeof STYLE_OPTIONS[0];
  selected: boolean;
  onClick: () => void;
}) {
  const color = STYLE_COLORS[option.value] ?? '#C8884B';
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 min-w-[140px] p-5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1"
      style={{
        background: selected ? `${color}14` : 'rgba(255,255,255,0.015)',
        border: selected ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span className="block text-[13px] font-medium mb-1" style={{ fontFamily: "'Inter', sans-serif", color: selected ? color : 'rgba(255,255,255,0.6)' }}>
        {option.label}
      </span>
      <span className="block text-[11px]" style={{ fontFamily: "'Barlow', sans-serif", color: 'rgba(255,255,255,0.35)' }}>
        {option.desc}
      </span>
    </button>
  );
}

function PaceCard({ option, selected, onClick }: {
  option: typeof PACE_OPTIONS[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 p-4 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
      style={{
        background: selected ? 'rgba(200,136,75,0.08)' : 'rgba(255,255,255,0.015)',
        border: selected ? '1px solid rgba(200,136,75,0.25)' : '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <span className="block text-[13px] font-medium mb-0.5" style={{ fontFamily: "'Inter', sans-serif", color: selected ? '#C8884B' : 'rgba(255,255,255,0.6)' }}>
        {option.label}
      </span>
      <span className="block text-[11px]" style={{ fontFamily: "'Barlow', sans-serif", color: 'rgba(255,255,255,0.35)' }}>
        {option.desc}
      </span>
    </button>
  );
}

/* ── Result Card ── */
function ResultCard({ result, rank, onClick }: { result: MatchResult; rank: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { destination, score, reasons } = result;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, delay: 0.2 + rank * 0.12, ease: 'power2.out' });
  }, [rank]);

  return (
    <div ref={ref}>
      <button
        type="button"
        onClick={onClick}
        className="w-full text-left rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
        style={{
          background: 'rgba(10,10,12,0.6)',
          border: rank === 0 ? '1px solid rgba(200,136,75,0.25)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex">
          {/* Image */}
          <div className="relative w-[120px] sm:w-[160px] shrink-0 overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img src={destination.image} alt={destination.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)' }} />
          </div>
          {/* Content */}
          <div className="flex-1 p-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              {rank === 0 && <Star size={13} strokeWidth={2} style={{ color: '#C8884B' }} fill="#C8884B" />}
              <span className="text-[10px] font-medium tracking-[0.1em] uppercase" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
                {destination.subtitle}
              </span>
            </div>
            <h4 className="text-[17px] font-medium text-white m-0 mb-1.5" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>
              {destination.title}
            </h4>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[20px] font-medium" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
                {score}%
              </span>
              <span className="text-[11px] text-white/30" style={{ fontFamily: "'Barlow', sans-serif" }}>匹配度</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {reasons.map((r) => (
                <span key={r} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ fontFamily: "'Inter', sans-serif", background: 'rgba(200,136,75,0.08)', color: '#C8884B' }}>
                  {r}
                </span>
              ))}
              {destination.atmosphere.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{ fontFamily: "'Inter', sans-serif", background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.4)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SmartPicksSection
   ══════════════════════════════════════════════════════════════ */
export default function SmartPicksSection({ onCardClick, onBack }: Props) {
  const [phase, setPhase] = useState<Phase>('preferences');
  const [prefs, setPrefs] = useState<SmartPicksPreferences>(DEFAULT_PREFERENCES);
  const [results, setResults] = useState<MatchResult[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
  }, []);

  const handleDiscover = useCallback(() => {
    if (!prefs.style) return;
    setPhase('matching');
    // Simulate AI thinking time
    setTimeout(() => {
      const matched = matchDestinations(prefs);
      setResults(matched);
      setPhase('results');
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1200);
  }, [prefs]);

  const handleReset = () => {
    setPhase('preferences');
    setPrefs(DEFAULT_PREFERENCES);
    setResults([]);
  };

  const canDiscover = prefs.style !== null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 px-5 sm:px-8 py-4 flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-white/55 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[13px] font-medium">返回</span>
        </button>
        <span className="text-[12px] font-medium tracking-[0.1em] text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>智选</span>
      </header>

      <div className="max-w-[720px] mx-auto px-5 sm:px-8 pt-16 pb-24">
        {/* ── Editorial header ── */}
        <div ref={headingRef} className="mb-14">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
            AI-Powered Discovery
          </p>
          <h1 className="text-white m-0 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            智选
          </h1>
          <p className="text-[16px] sm:text-[18px] m-0 max-w-[500px]" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
            告诉我们你的旅行想象，让智能算法为你找到灵魂共鸣的目的地。
          </p>
        </div>

        {/* ── Hero image ── */}
        <div className="relative rounded-2xl overflow-hidden mb-14" style={{ aspectRatio: '16/9' }}>
          <img src="/journeys/smartpicks-hero.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.7) 100%)' }} />
          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-[14px] sm:text-[15px] m-0 italic text-white/60" style={{ fontFamily: "'Instrument Serif', serif" }}>
              你的旅行 DNA，正在等待被发现。
            </p>
          </div>
        </div>

        {/* ═══ Phase: Preferences ═══ */}
        {phase === 'preferences' && (
          <div>
            {/* Q1: Travel style */}
            <div className="mb-10">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
                旅行风格
              </p>
              <p className="text-[14px] text-white/40 m-0 mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                什么样的旅行让你心动？
              </p>
              <div className="flex flex-wrap gap-3">
                {STYLE_OPTIONS.map((opt) => (
                  <StyleCard
                    key={opt.value}
                    option={opt}
                    selected={prefs.style === opt.value}
                    onClick={() => setPrefs((p) => ({ ...p, style: opt.value as TravelStyle }))}
                  />
                ))}
              </div>
            </div>

            {/* Q2: Pace */}
            <div className="mb-10">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
                旅行节奏
              </p>
              <p className="text-[14px] text-white/40 m-0 mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                你希望以什么速度探索？
              </p>
              <div className="flex gap-3">
                {PACE_OPTIONS.map((opt) => (
                  <PaceCard
                    key={opt.value}
                    option={opt}
                    selected={prefs.pace === opt.value}
                    onClick={() => setPrefs((p) => ({ ...p, pace: opt.value as TravelPace }))}
                  />
                ))}
              </div>
            </div>

            {/* Q3: Companion */}
            <div className="mb-12">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-1" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
                同行者
              </p>
              <p className="text-[14px] text-white/40 m-0 mb-5" style={{ fontFamily: "'Barlow', sans-serif" }}>
                这次旅程和谁一起？
              </p>
              <div className="flex gap-2">
                {(['独自', '情侣', '家庭', '朋友'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setPrefs((p) => ({ ...p, companion: c }))}
                    className="flex-1 text-[13px] font-medium py-2.5 rounded-xl transition-all duration-200"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: prefs.companion === c ? 'rgba(200,136,75,0.12)' : 'rgba(255,255,255,0.02)',
                      color: prefs.companion === c ? '#C8884B' : 'rgba(255,255,255,0.5)',
                      border: prefs.companion === c ? '1px solid rgba(200,136,75,0.2)' : '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleDiscover}
              disabled={!canDiscover}
              className="w-full inline-flex items-center justify-center gap-2 text-[15px] font-medium rounded-2xl py-4 transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: canDiscover ? '#C8884B' : 'rgba(255,255,255,0.05)',
                color: canDiscover ? '#000' : 'rgba(255,255,255,0.2)',
                cursor: canDiscover ? 'pointer' : 'default',
              }}
            >
              <Sparkles size={16} strokeWidth={1.5} />
              发现我的目的地
            </button>
          </div>
        )}

        {/* ═══ Phase: Matching ═══ */}
        {phase === 'matching' && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(200,136,75,0.12)' }}>
              <Sparkles size={28} strokeWidth={1.5} style={{ color: '#C8884B' }} className="animate-pulse" />
            </div>
            <p className="text-[16px] font-medium text-white/80 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              AI 正在理解你的旅行偏好
            </p>
            <p className="text-[14px] text-white/35 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>
              分析八个目的地的氛围、风格与体验…
            </p>
          </div>
        )}

        {/* ═══ Phase: Results ═══ */}
        {phase === 'results' && (
          <div ref={resultsRef}>
            <div className="mb-8">
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-3" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
                为你匹配
              </p>
              <h3 className="text-white m-0 mb-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 350, fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                最佳目的地
              </h3>
              <p className="text-[14px] text-white/40 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>
                基于你的偏好，以下是匹配度最高的 {results.length} 个目的地
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {results.map((r, i) => (
                <ResultCard key={r.destination.id} result={r} rank={i} onClick={() => onCardClick?.(r.destination.id)} />
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[15px] text-white/50 m-0 mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  没有找到高度匹配的目的地，试试调整你的偏好？
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 text-[14px] font-medium rounded-xl py-3 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                重新选择
              </button>
              <button
                type="button"
                onClick={handleDiscover}
                className="flex-1 inline-flex items-center justify-center gap-2 text-[14px] font-medium rounded-xl py-3 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'rgba(200,136,75,0.12)',
                  color: '#C8884B',
                  border: '1px solid rgba(200,136,75,0.18)',
                }}
              >
                <Sparkles size={14} strokeWidth={1.5} />
                刷新推荐
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
