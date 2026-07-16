import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowLeft, Mountain, Landmark, Camera, Utensils, Compass, Heart,
  MapPin, Users,
} from 'lucide-react';
import { TRAVEL_THEMES } from '../data/travel-themes';
import { DESTINATIONS } from '../data/destinations';
import type { TravelTheme } from '../data/travel-themes';

interface Props {
  onCardClick?: (id: string) => void;
  onBack?: () => void;
}

/* ── Theme accent color ── */
const THEME_COLORS: Record<string, { primary: string; bg: string; border: string }> = {
  nature:     { primary: '#6BAF7B', bg: 'rgba(107,175,123,0.06)',  border: 'rgba(107,175,123,0.15)' },
  culture:    { primary: '#C8A87B', bg: 'rgba(200,168,123,0.06)',  border: 'rgba(200,168,123,0.15)' },
  photography:{ primary: '#7B9FC8', bg: 'rgba(123,159,200,0.06)',  border: 'rgba(123,159,200,0.15)' },
  culinary:   { primary: '#E07B5A', bg: 'rgba(224,123,90,0.06)',   border: 'rgba(224,123,90,0.15)' },
  adventure:  { primary: '#9B7BC8', bg: 'rgba(155,123,200,0.06)',  border: 'rgba(155,123,200,0.15)' },
  romance:    { primary: '#D4789B', bg: 'rgba(212,120,155,0.06)',  border: 'rgba(212,120,155,0.15)' },
};

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties }>> = {
  Mountain, Landmark, Camera, Utensils, Compass, Heart,
};

/* ══════════════════════════════════════════════════════════════
   Scroll-reveal wrapper
   ══════════════════════════════════════════════════════════════ */
function AnimateIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref}>{children}</div>;
}

/* ══════════════════════════════════════════════════════════════
   Theme Card — image-first editorial layout
   ══════════════════════════════════════════════════════════════ */
function ThemeCard({
  theme,
  onCardClick,
}: {
  theme: TravelTheme;
  onCardClick?: (id: string) => void;
}) {
  const colors = THEME_COLORS[theme.id] ?? THEME_COLORS.nature;
  const IconComp = ICON_MAP[theme.icon] ?? Mountain;
  const destinations = theme.destinationIds
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter(Boolean);
  const getImage = (destId: string, fallback: string) =>
    theme.themeImages?.[destId] || fallback;

  return (
    <AnimateIn>
      <div
        className="rounded-[24px] overflow-hidden mb-12"
        style={{
          background: 'rgba(10,10,12,0.6)',
          border: `1px solid ${colors.border}`,
        }}
      >
        {/* ── Theme hero image — content-matched, not a destination cover ── */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img
            src={theme.image}
            alt={theme.imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg,
                rgba(0,0,0,0.1) 0%,
                rgba(0,0,0,0) 30%,
                rgba(0,0,0,0.45) 65%,
                rgba(10,10,12,0.85) 100%)`,
            }}
          />
          {/* Mood label — subtle text on image */}
          <div className="absolute bottom-5 left-6 sm:left-10 right-6 sm:right-10">
            <p
              className="text-[13px] sm:text-[14px] m-0 italic max-w-[480px]"
              style={{
                fontFamily: "'Instrument Serif', serif",
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.45,
                letterSpacing: '0.01em',
              }}
            >
              {theme.mood}
            </p>
          </div>
        </div>

        {/* ── Content block ── */}
        <div className="px-6 sm:px-10 pt-8 pb-6">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: colors.bg }}
            >
              <IconComp size={20} strokeWidth={1.5} style={{ color: colors.primary }} />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="text-[11px] font-medium tracking-[0.14em] uppercase mb-1.5"
                style={{ fontFamily: "'Inter', sans-serif", color: colors.primary }}
              >
                {theme.subtitle}
              </p>
              <h3
                className="text-white m-0 mb-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 350,
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                }}
              >
                {theme.title}
              </h3>
              <p
                className="text-[14px] sm:text-[15px] leading-relaxed text-white/55 m-0 mb-3 max-w-[540px]"
                style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.8 }}
              >
                {theme.description}
              </p>
              {/* Visual description — explains why this image matters */}
              <p
                className="text-[13px] text-white/35 m-0 mb-3 italic"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {theme.visualDescription}
              </p>
              <p
                className="text-[14px] sm:text-[15px] m-0"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.5,
                }}
              >
                「{theme.highlight}」
              </p>
            </div>
          </div>
        </div>

        {/* ── Destination previews ── */}
        <div className="px-6 sm:px-10 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {destinations.map((dest) =>
              dest ? (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => onCardClick?.(dest.id)}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer text-left border-0 bg-transparent p-0"
                  style={{ aspectRatio: '16/10' }}
                >
                  <img
                    src={getImage(dest.id, dest.image)}
                    alt={dest.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)',
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[10px] font-medium tracking-[0.12em] uppercase mb-0.5" style={{ fontFamily: "'Inter', sans-serif", color: colors.primary }}>
                      {dest.subtitle}
                    </p>
                    <p className="text-[14px] font-medium text-white/90 m-0" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {dest.title}
                    </p>
                  </div>
                </button>
              ) : null,
            )}
          </div>
        </div>

        {/* ── Footer metadata ── */}
        <div className="px-6 sm:px-10 pb-8 sm:pb-10 pt-4 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {theme.atmosphere.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium tracking-[0.06em] px-2.5 py-1 rounded-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'rgba(200,136,75,0.08)',
                  color: '#C8884B',
                  border: '1px solid rgba(200,136,75,0.12)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-white/15 select-none">|</span>
          <span className="text-[10px] text-white/35 flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Users size={11} strokeWidth={1.5} />
            {theme.suitableFor}
          </span>
          <span className="text-white/15 select-none">|</span>
          <span className="text-[10px] text-white/35 flex items-center gap-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
            <MapPin size={11} strokeWidth={1.5} />
            {theme.destinationIds.length} 个目的地
          </span>
        </div>
      </div>
    </AnimateIn>
  );
}

/* ══════════════════════════════════════════════════════════════
   JourneysSection
   ══════════════════════════════════════════════════════════════ */
export default function JourneysSection({ onCardClick, onBack }: Props) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Sticky back header ── */}
      <header
        className="sticky top-0 z-40 px-5 sm:px-8 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/55 hover:text-white transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[13px] font-medium">返回</span>
        </button>
        <span className="text-[12px] font-medium tracking-[0.1em] text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
          行旅
        </span>
      </header>

      {/* ── Editorial header ── */}
      <div className="max-w-[880px] mx-auto px-5 sm:px-8 pt-16 pb-4">
        <div ref={headingRef} className="mb-16">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
            Curated Journeys
          </p>
          <h1
            className="text-white m-0 mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            行旅
          </h1>
          <p
            className="text-[16px] sm:text-[18px] m-0 max-w-[560px]"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.5,
              letterSpacing: '0.01em',
            }}
          >
            六大旅行主题，八座精选目的地。<br />
            不按地图寻找，而是以心灵的节奏出发——找到与你共鸣的旅行方式。
          </p>
        </div>
      </div>

      {/* ── Theme cards ── */}
      <div className="max-w-[880px] mx-auto px-5 sm:px-8 pb-24">
        {TRAVEL_THEMES.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} onCardClick={onCardClick} />
        ))}
        <div className="text-center pt-8">
          <p className="text-[12px] text-white/25 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>
            点击任意目的地卡片，查看完整行程与 AI 规划
          </p>
        </div>
      </div>
    </div>
  );
}
