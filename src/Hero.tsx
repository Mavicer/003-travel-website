import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Lock, Menu, X } from 'lucide-react';

const IMAGE_SRC = '/hero-fallback.jpg';

const NAV_LINKS = [
  { label: '行旅', sectionId: 'journeys' },
  { label: '智选', sectionId: 'smart-picks' },
  { label: '随记', sectionId: 'gallery' },
  { label: '指南', sectionId: 'guide' },
] as const;

interface HeroProps {
  onNavigate?: (sectionId: string) => void;
  onQuickStart?: () => void;
  onPlanMyTrip?: () => void;
}

export default function Hero({ onNavigate, onQuickStart, onPlanMyTrip }: HeroProps) {
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Animate mobile menu in/out
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      gsap.fromTo(
        menu,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [menuOpen]);

  // Mouse parallax on background
  useEffect(() => {
    const bgEl = bgContainerRef.current;
    if (!bgEl) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * 20;
      targetY = ((e.clientY - cy) / cy) * 20;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      gsap.set(bgEl, { x: currentX, y: currentY });
      animFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Fade-in animations on mount
  useEffect(() => {
    const headline = headlineRef.current;
    const bottom = bottomRef.current;

    if (headline) {
      gsap.fromTo(
        headline,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }

    if (bottom) {
      gsap.fromTo(
        bottom,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          ref={bgContainerRef}
          className="absolute inset-0 scale-[1.08] origin-center"
        >
          <img
            src={IMAGE_SRC}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-50 px-5 sm:px-8 md:px-10 py-4 sm:py-5 md:py-8 flex justify-between items-center">
        {/* Left: Wordmark */}
        <div className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold tracking-tight text-white shrink-0">
          Mavicer<sup className="text-[9px] sm:text-[10px]">TM</sup>
        </div>

        {/* Center: Navigation (desktop only) */}
        <nav className="hidden md:flex liquid-glass rounded-full px-2 py-2 items-center gap-1">
          {NAV_LINKS.map(({ label, sectionId }) => (
            <button
              key={label}
              type="button"
              onClick={() => onNavigate?.(sectionId)}
              className="text-[11px] font-medium tracking-[0.12em] text-white/55 px-4 py-1.5 rounded-full transition-all duration-200 hover:text-white/90 hover:bg-white/[0.04] cursor-pointer bg-transparent border-none"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right: CTA (desktop) */}
        <button
          type="button"
          onClick={onQuickStart}
          className="hidden md:inline-flex liquid-glass rounded-full px-5 py-2.5 text-[11px] font-medium tracking-[0.12em] text-white/90 hover:text-amber-450 transition-colors duration-200 cursor-pointer"
        >
          即刻启程
        </button>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden p-2 -mr-2 text-white/80 hover:text-white transition-colors"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <X size={20} strokeWidth={1.5} />
          ) : (
            <Menu size={20} strokeWidth={1.5} />
          )}
        </button>
      </header>

      {/* ── Mobile Menu Overlay ────────────────────────────────── */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-[56px] sm:top-[64px] left-4 right-4 z-40 md:hidden"
        >
          <div className="liquid-glass rounded-2xl px-5 py-6 flex flex-col items-center gap-3">
            {NAV_LINKS.map(({ label, sectionId }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  closeMenu();
                  onNavigate?.(sectionId);
                }}
                className="text-[13px] font-medium tracking-[0.14em] text-white/55 hover:text-white/90 transition-colors py-1 cursor-pointer bg-transparent border-none"
              >
                {label}
              </button>
            ))}
            <hr className="w-12 border-white/10 my-1" />
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onQuickStart?.();
              }}
              className="text-[13px] font-medium tracking-[0.12em] text-amber-450 hover:text-white transition-colors py-1 cursor-pointer bg-transparent border-none"
            >
              即刻启程
            </button>
          </div>
        </div>
      )}

      {/* ── Hero Headline ──────────────────────────────────────── */}
      <div
        ref={headlineRef}
        className="absolute z-20 left-0 right-0 text-center px-5 sm:px-8"
        style={{ top: 'clamp(90px, 18vh, 140px)' }}
      >
        <h1
          className="text-white m-0"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(32px, 5.4vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          行无止境。
        </h1>
        <h2
          className="m-0"
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(28px, 5vw, 68px)',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.55)',
            marginTop: '0.12em',
          }}
        >
          以直觉，遇见未知。
        </h2>
      </div>

      {/* ── Bottom Block ───────────────────────────────────────── */}
      <div
        ref={bottomRef}
        className="absolute bottom-6 sm:bottom-8 md:bottom-14 left-0 right-0 z-20 flex flex-col items-center gap-4 sm:gap-5 md:gap-6 px-5 sm:px-8"
      >
        {/* Description */}
        <p
          className="max-w-[620px] text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed text-center m-0"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          <span className="text-white">
            智能行程，为你而生。跟随你的节奏，呼应你的心情，满足你对远方的渴望。
          </span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>
            {' '}
            每一次出发，都为你量身定制 — 无缝衔接，只属于你。
          </span>
        </p>

        {/* CTA Button */}
        <button
          type="button"
          onClick={onPlanMyTrip}
          className="bg-white text-black text-[14px] sm:text-[15px] font-medium rounded-full px-6 sm:px-8 py-3 sm:py-3.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            fontFamily: "'Inter', sans-serif",
            boxShadow: '0 0 0 0 rgba(200,136,75,0)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 32px 4px rgba(200,136,75,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 0 0 rgba(200,136,75,0)';
          }}
        >
          定制我的旅程
        </button>

        {/* Security Badge */}
        <div className="flex items-center gap-2">
          <Lock size={12} className="text-white/70 shrink-0" strokeWidth={1.5} />
          <span
            className="text-[10px] sm:text-[11px] font-medium tracking-[0.12em] sm:tracking-[0.14em] text-white/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            设计即安全。隐私无忧。
          </span>
        </div>
      </div>
    </div>
  );
}
