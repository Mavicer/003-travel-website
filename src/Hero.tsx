import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Lock } from 'lucide-react';

const IMAGE_SRC = '/hero-fallback.jpg';

const NAV_LINKS = ['JOURNEY', 'BENEFITS', 'JOURNAL', 'GUIDEBOOK'];

export default function Hero() {
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

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
      className="min-h-screen bg-black text-white overflow-x-hidden relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Background ─────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 overflow-hidden">
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
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-10 py-8 flex justify-between items-center">
        {/* Left: Wordmark */}
        <div className="text-[17px] font-semibold tracking-tight text-white">
          Wanderful<sup className="text-[10px]">TM</sup>
        </div>

        {/* Center: Navigation */}
        <nav className="liquid-glass rounded-full px-2 py-2 flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[11px] font-medium tracking-[0.12em] text-white/90 hover:text-white px-4 py-1.5 rounded-full transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <a
          href="#get-roaming"
          className="liquid-glass rounded-full px-5 py-2.5 text-[11px] font-medium tracking-[0.12em] text-white/90 hover:text-white transition-colors duration-200"
        >
          GET ROAMING
        </a>
      </header>

      {/* ── Hero Headline ──────────────────────────────────────── */}
      <div
        ref={headlineRef}
        className="fixed z-20 left-0 right-0 text-center"
        style={{ top: '120px' }}
      >
        <h1
          className="text-white m-0"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Venture without edges.
        </h1>
        <h2
          className="m-0"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(40px, 5.4vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          Uncover with keen instinct.
        </h2>
      </div>

      {/* ── Bottom Block ───────────────────────────────────────── */}
      <div
        ref={bottomRef}
        className="fixed bottom-14 left-0 right-0 z-20 flex flex-col items-center gap-6"
      >
        {/* Description */}
        <p
          className="max-w-[620px] text-[15px] leading-relaxed text-center m-0"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          <span className="text-white">
            Our smart itineraries shape around you — your rhythm, your vibe, your
            hunger for adventure.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>
            {' '}
            Each getaway is tailored, seamless, and wholly yours.
          </span>
        </p>

        {/* CTA Button */}
        <button
          type="button"
          className="bg-white text-black text-[15px] font-medium rounded-full px-8 py-3.5 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_4px_rgba(255,255,255,0.2)] active:scale-[0.97]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Plan my escape today
        </button>

        {/* Security Badge */}
        <div className="flex items-center gap-2">
          <Lock size={13} strokeWidth={1.5} className="text-white/70" />
          <span
            className="text-[11px] font-medium tracking-[0.14em] text-white/70"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            SECURE BY DESIGN. ZERO DATA LEAKS.
          </span>
        </div>
      </div>
    </div>
  );
}
