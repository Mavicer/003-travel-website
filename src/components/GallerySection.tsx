import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/gallery';
import type { PhotoCategory } from '../data/gallery';

interface Props { onBack?: () => void; }

const CATEGORY_COLORS: Record<PhotoCategory, string> = {
  '自然': '#6BAF7B', '城市': '#7B9FC8', '人文': '#C8A87B', '冒险': '#9B7BC8', '文化': '#E07B5A',
};

function cardTransform(offset: number) {
  const a = Math.abs(offset);
  const s = Math.sign(offset) || 0;
  return {
    x: s * a * 42,
    scale: Math.max(0.5, 1 - a * 0.26),
    opacity: Math.max(0.1, 1 - a * 0.55),
    zIndex: 10 - Math.floor(a * 10),
    rotateY: s * a * 22,
    brightness: Math.max(0.3, 1 - a * 0.42),
  };
}

export default function GallerySection({ onBack }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const total = GALLERY_PHOTOS.length;
  const photo = GALLERY_PHOTOS[((activeIndex % total) + total) % total];

  /* ── Heading entrance ── */
  useEffect(() => {
    gsap.fromTo(headingRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
  }, []);

  /* ── Info fade ── */
  useEffect(() => {
    gsap.fromTo(infoRef.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
  }, [activeIndex]);

  /* ── Navigate ── */
  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % total) + total) % total);
    setDragOffset(0);
  }, [total]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext]);

  /* ═══ Pointer events — simple drag-to-snap ═══ */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX.current);
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const w = containerRef.current?.offsetWidth ?? 400;
    const threshold = w * 0.12;
    if (dragOffset < -threshold) goNext();
    else if (dragOffset > threshold) goPrev();
    else setDragOffset(0);
  }, [isDragging, dragOffset, goNext, goPrev]);

  /* ── Visible cards ── */
  const containerW = containerRef.current?.offsetWidth ?? 400;
  const dragProgress = isDragging ? dragOffset / containerW : 0;

  const cards: { index: number; offset: number }[] = [];
  for (let o = -2; o <= 2; o++) {
    const idx = ((activeIndex + o) % total + total) % total;
    const effectiveOffset = o + dragProgress;
    if (Math.abs(effectiveOffset) < 2.8) {
      cards.push({ index: idx, offset: effectiveOffset });
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 px-5 sm:px-8 py-4 flex items-center justify-between shrink-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-white/55 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[13px] font-medium">返回</span>
        </button>
        <span className="text-[12px] font-medium tracking-[0.1em] text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>随记</span>
      </header>

      {/* ── Page heading ── */}
      <div className="max-w-[880px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-2 shrink-0">
        <div ref={headingRef}>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>Visual Journey</p>
          <h1 className="text-white m-0" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>随记</h1>
        </div>
      </div>

      {/* ═══ Cover Flow Carousel ═══ */}
      <div className="flex-1 flex flex-col justify-center" style={{ perspective: '1200px' }}>
        <div
          ref={containerRef}
          className="relative w-full mx-auto select-none"
          style={{ height: 'clamp(260px, 42vw, 500px)', maxWidth: '960px', touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Nav arrows */}
          <button type="button" onClick={goPrev} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={20} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.7)' }} />
          </button>
          <button type="button" onClick={goNext} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronRight size={20} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.7)' }} />
          </button>

          {/* Cards */}
          {cards.map(({ index, offset }) => {
            const t = cardTransform(offset);
            const isCenter = Math.abs(offset) < 0.3;
            const p = GALLERY_PHOTOS[index];
            return (
              <div
                key={`g-${index}`}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  transform: `translateX(${t.x}%) scale(${t.scale}) rotateY(${t.rotateY}deg)`,
                  opacity: t.opacity,
                  zIndex: t.zIndex,
                  filter: `brightness(${t.brightness})`,
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out, filter 0.5s ease-out',
                }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{ width: 'clamp(260px, 54vw, 680px)', aspectRatio: '16/10', border: isCenter ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent' }}>
                  <img src={p.image} alt={p.title} draggable={false} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
                  {!isCenter && <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />}
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-white/20" style={{ fontFamily: "'Barlow', sans-serif" }}>
            ← 滑动浏览 · {activeIndex + 1}/{total} →
          </div>
        </div>

        {/* ═══ Photo info ═══ */}
        <div ref={infoRef} key={activeIndex} className="max-w-[520px] mx-auto px-5 sm:px-8 pt-6 pb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[10px] font-medium tracking-[0.12em] uppercase px-2 py-0.5 rounded-full" style={{ fontFamily: "'Inter', sans-serif", background: `${CATEGORY_COLORS[photo.category]}18`, color: CATEGORY_COLORS[photo.category] }}>{photo.category}</span>
            <span className="text-[10px] font-medium tracking-[0.08em] text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>{photo.location}</span>
          </div>
          <h3 className="text-[20px] sm:text-[24px] font-medium text-white m-0 mb-3" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}>{photo.title}</h3>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/50 m-0 mb-4 max-w-[400px] mx-auto" style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.8 }}>{photo.story}</p>
          <span className="inline-block text-[12px] font-medium text-white/25 px-3 py-1 rounded-full" style={{ fontFamily: "'Inter', sans-serif", background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>{photo.mood}</span>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {GALLERY_PHOTOS.map((_, i) => (
              <button key={i} type="button" onClick={() => goTo(i)} className="rounded-full transition-all duration-300" style={{ width: i === activeIndex ? '20px' : '6px', height: '6px', background: i === activeIndex ? '#C8884B' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer' }} aria-label={`查看第 ${i + 1} 张`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
