import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';
import PanelDestinationHero from './PanelDestinationHero';
import PanelMap from './PanelMap';
import PanelOverview from './PanelOverview';
import PanelFooter from './PanelFooter';
import ItinerarySection from './ItinerarySection';
import AITripPlanner from '../AI/AITripPlanner';

interface Props {
  destinationId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DestinationPanel({
  destinationId,
  isOpen,
  onClose,
}: Props) {
  const blurRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const plannerRef = useRef<HTMLDivElement>(null);

  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const destination = DESTINATIONS.find((d) => d.id === destinationId) ?? null;

  const close = useCallback(() => {
    const blur = blurRef.current;
    const tint = tintRef.current;
    const card = cardRef.current;
    if (!blur || !tint || !card) {
      onClose();
      return;
    }

    // Synchronized exit: card, tint, and blur all fade together
    gsap.to(card, {
      scale: 0.96,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
    });
    gsap.to([tint, blur], {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: onClose,
    });
  }, [onClose]);

  // Animate in — only tint fades; blur stays static
  useEffect(() => {
    if (!isOpen || !tintRef.current || !cardRef.current) return;

    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    gsap.set(tintRef.current, { opacity: 0 });
    gsap.set(cardRef.current, { opacity: 0, scale: 0.96, y: 16 });

    gsap.to(tintRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(cardRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.55,
      ease: 'power2.out',
      delay: 0.08,
    });
  }, [isOpen]);

  // Reset planner when panel closes or destination changes
  useEffect(() => {
    setIsPlannerOpen(false);
  }, [destinationId, isOpen]);

  // Scroll to planner when it opens
  useEffect(() => {
    if (isPlannerOpen && plannerRef.current) {
      plannerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isPlannerOpen]);

  // Esc key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  if (!destination) return null;

  return (
    <div
      className="fixed inset-0 z-[100]"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
    >
      {/* ═══ Backdrop blur — static full intensity on open, animated out on close ═══ */}
      <div
        ref={blurRef}
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        }}
      />
      {/* ═══ Dark tint overlay — only this opacity animates ═══ */}
      <div
        ref={tintRef}
        className="absolute inset-0"
        onClick={close}
        style={{
          background: 'rgba(0,0,0,0.6)',
        }}
      />

      {/* ═══ Close button — floating glass circle, top-right ═══ */}
      <button
        type="button"
        onClick={close}
        className="fixed top-6 right-6 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
        aria-label="关闭"
      >
        <X size={18} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.8)' }} />
      </button>

      {/* ═══ Scrollable container for the floating card ═══ */}
      <div
        ref={scrollRef}
        className="absolute inset-0 overflow-y-auto"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {/* Centering wrapper */}
        <div className="min-h-full flex items-start justify-center px-4 pt-20 pb-20">
          {/* ══════════════════════════════════════════════════════ */}
          {/* FLOATING GLASS CARD */}
          {/* ══════════════════════════════════════════════════════ */}
          <div
            ref={cardRef}
            className="w-full max-w-[680px] rounded-[28px] overflow-hidden"
            style={{
              background: 'rgba(10,10,12,0.82)',
              backdropFilter: 'blur(48px) saturate(1.1)',
              WebkitBackdropFilter: 'blur(48px) saturate(1.1)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow:
                '0 4px 24px rgba(0,0,0,0.3), 0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* ── Destination Hero Section ── */}
            <PanelDestinationHero destination={destination} />

            {/* ── Overview Section ── */}
            <PanelOverview
              introduction={destination.introduction}
              highlights={destination.highlights}
            />

            {/* ── Map Section (inside the card, NOT as background) ── */}
            <PanelMap
              center={destination.coordinates}
              zoom={destination.mapViewport.zoom}
              pitch={destination.mapViewport.pitch}
              bearing={destination.mapViewport.bearing}
              attractions={destination.attractions}
            />

            {/* ── Attractions ── */}
            {destination.attractions.length > 0 && (
              <AttractionsSection attractions={destination.attractions} />
            )}

            {/* ── Experiences ── */}
            {destination.experiences.length > 0 && (
              <ExperiencesSection experiences={destination.experiences} />
            )}

            {/* ── Itinerary ── */}
            {destination.itinerary.length > 0 && (
              <ItinerarySection itinerary={destination.itinerary} />
            )}

            {/* ── Seasons ── */}
            {destination.seasons.length > 0 && (
              <SeasonsSection seasons={destination.seasons} />
            )}

            {/* ── Practical Info ── */}
            <PracticalSection info={destination.practicalInfo} />

            {/* ── AI Trip Planner ── */}
            <div ref={plannerRef}>
              {isPlannerOpen && (
                <div className="px-6 sm:px-10 pb-6">
                  <AITripPlanner
                    destination={destination}
                    onClose={() => setIsPlannerOpen(false)}
                  />
                </div>
              )}
            </div>

            <PanelFooter
              onClose={close}
              onAIClick={() => setIsPlannerOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Inline section components (kept in same file for cohesion)
   Each follows the same visual language: amber label, subtle typography
   ══════════════════════════════════════════════════════════════════ */

import type { Attraction, Experience, SeasonInfo, PracticalInfo } from '../../data/destinations';
import { MapPin, Clock } from 'lucide-react';

/* ── Attractions ── */
function AttractionsSection({ attractions }: { attractions: Attraction[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>('[data-animate]');
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06 },
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="px-6 sm:px-10 py-10 sm:py-12">
      <p
        data-animate
        className="text-[11px] font-medium tracking-[0.14em] uppercase mb-6"
        style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
      >
        必游景点
      </p>
      <div className="space-y-3">
        {attractions.map((a) => (
          <div
            key={a.id}
            data-animate
            className="relative flex gap-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {/* Left accent bar — fades in on hover */}
            <div
              className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 transition-opacity duration-300"
              style={{ background: '#C8884B' }}
            />
            <div
              className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
              style={{ background: 'rgba(200,136,75,0.12)' }}
            >
              <MapPin size={16} strokeWidth={1.5} style={{ color: '#C8884B' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4
                  className="text-[14px] font-medium text-white/90 m-0"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {a.name}
                </h4>
                {a.rating && (
                  <span className="text-[11px] tracking-[0.05em]" style={{ color: '#C8884B' }}>
                    {'★'.repeat(a.rating)}{'★'.repeat(5 - a.rating).replace(/★/g, '☆')}
                  </span>
                )}
              </div>
              <p
                className="text-[13px] leading-relaxed text-white/55 m-0 mb-1.5"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {a.description}
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: 'rgba(200,136,75,0.08)',
                    color: '#C8884B',
                  }}
                >
                  {a.category}
                </span>
                {a.bestTime && (
                  <span
                    className="text-[11px] text-white/45 flex items-center gap-1"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    <Clock size={10} strokeWidth={1.5} />
                    {a.bestTime}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Experiences ── */
function ExperiencesSection({ experiences }: { experiences: Experience[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>('[data-animate]');
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06 },
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const categoryColor = (cat: Experience['category']) => {
    const map: Record<string, string> = {
      '美食': '#E07B5A',
      '文化': '#C8A87B',
      '自然': '#6BAF7B',
      '户外': '#6BAF7B',
      '养生': '#9B7BC8',
      '夜生活': '#7B9FC8',
    };
    return map[cat] || '#C8884B';
  };

  return (
    <div ref={ref} className="px-6 sm:px-10 py-10 sm:py-12">
      <p
        data-animate
        className="text-[11px] font-medium tracking-[0.14em] uppercase mb-6"
        style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
      >
        体验推荐
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            data-animate
            className="relative p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {/* Left accent bar — category color, fades in on hover */}
            <div
              className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 transition-opacity duration-300"
              style={{ background: categoryColor(exp.category) }}
            />
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: `${categoryColor(exp.category)}18`,
                  color: categoryColor(exp.category),
                }}
              >
                {exp.category}
              </span>
              {exp.duration && (
                <span
                  className="text-[10px] text-white/35"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {exp.duration}
                </span>
              )}
              {exp.difficulty && (
                <span
                  className="text-[10px] text-white/35"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  {exp.difficulty}
                </span>
              )}
            </div>
            <h4
              className="text-[14px] font-medium text-white/90 m-0 mb-1.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {exp.title}
            </h4>
            <p
              className="text-[13px] leading-relaxed text-white/55 m-0"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ── Seasons ── */
function SeasonsSection({ seasons }: { seasons: SeasonInfo[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>('[data-animate]');
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06 },
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const seasonIcon = (s: SeasonInfo['season']) => {
    const map: Record<string, string> = { '春': '🌸', '夏': '☀️', '秋': '🍁', '冬': '❄️' };
    return map[s] || '';
  };

  return (
    <div ref={ref} className="px-6 sm:px-10 py-10 sm:py-12">
      <p
        data-animate
        className="text-[11px] font-medium tracking-[0.14em] uppercase mb-6"
        style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
      >
        四季指南
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {seasons.map((s) => (
          <div
            key={s.season}
            data-animate
            className="p-4 rounded-xl text-center transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: s.rating === 5 ? 'rgba(200,136,75,0.06)' : 'rgba(255,255,255,0.015)',
              border:
                s.rating === 5
                  ? '1px solid rgba(200,136,75,0.18)'
                  : '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div className="text-xl mb-1">{seasonIcon(s.season)}</div>
            <div
              className="text-[13px] font-medium text-white/85 mb-0.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {s.season}
            </div>
            <div
              className="text-[10px] text-white/40 mb-1.5"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {s.months}
            </div>
            <div className="flex justify-center gap-0.5 mb-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="text-[10px]"
                  style={{ color: i < s.rating ? '#C8884B' : 'rgba(255,255,255,0.12)' }}
                >
                  ★
                </span>
              ))}
            </div>
            <div
              className="text-[11px] text-white/45 leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {s.temperature}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Practical Info ── */
function PracticalSection({ info }: { info: PracticalInfo }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>('[data-animate]');
          gsap.fromTo(
            items,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06 },
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = [
    { label: '语言', value: info.language },
    { label: '货币', value: info.currency },
    { label: '时区', value: info.timezone },
    ...(info.visa ? [{ label: '签证', value: info.visa }] : []),
    ...(info.bestSeason ? [{ label: '最佳季节', value: info.bestSeason }] : []),
    ...(info.averageCost ? [{ label: '日均消费', value: info.averageCost }] : []),
  ];

  if (items.every((i) => !i.value)) return null;

  return (
    <div ref={ref} className="px-6 sm:px-10 py-10 sm:py-12">
      <p
        data-animate
        className="text-[11px] font-medium tracking-[0.14em] uppercase mb-6"
        style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
      >
        实用信息
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items
          .filter((i) => i.value)
          .map((item) => (
            <div
              key={item.label}
              data-animate
              className="p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div
                className="text-[10px] text-white/40 mb-1 tracking-wider uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item.label}
              </div>
              <div
                className="text-[13px] text-white/75 leading-snug"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {item.value}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

