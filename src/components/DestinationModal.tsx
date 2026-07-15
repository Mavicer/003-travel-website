import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import type { Destination } from '../data/destinations';

interface Props {
  destination: Destination;
  onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const close = useCallback(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) {
      onClose();
      return;
    }
    gsap.to([panel, overlay], {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
    gsap.to(panel, {
      scale: 0.96,
      y: 16,
      duration: 0.25,
      ease: 'power2.in',
    });
  }, [onClose]);

  // Animate in
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    gsap.set(panel, { opacity: 0, scale: 0.96, y: 24 });
    gsap.set(overlay, { opacity: 0 });

    gsap.to(overlay, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
    gsap.to(panel, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
      delay: 0.05,
    });
  }, []);

  // Esc key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [close]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => {
        if (e.target === overlayRef.current) close();
      }}
    >
      <div
        ref={panelRef}
        className="relative max-w-[520px] w-full rounded-2xl overflow-hidden"
        style={{
          background: '#111',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.08), 0 32px 64px rgba(0,0,0,0.7)',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden">
          <img
            ref={imgRef}
            src={destination.image.replace('w=600', 'w=1200')}
            alt={destination.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <p
            className="text-[11px] font-medium tracking-[0.14em] text-white/40 uppercase mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {destination.subtitle}
          </p>
          <h3
            className="text-2xl font-normal text-white mb-4 m-0 tracking-tight"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.02em',
            }}
          >
            {destination.title}
          </h3>
          <p
            className="text-[15px] leading-relaxed text-white/60 m-0"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {destination.description}
          </p>

          {/* Placeholder CTA for future detail page */}
          <button
            type="button"
            onClick={close}
            className="mt-8 bg-white text-black text-[14px] font-medium rounded-full px-7 py-3 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_24px_2px_rgba(255,255,255,0.15)] active:scale-[0.97]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View full details →
          </button>
        </div>
      </div>
    </div>
  );
}
