import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Calendar, Compass } from 'lucide-react';
import type { Destination } from '../../data/destinations';

interface Props {
  destination: Destination;
}

export default function PanelDestinationHero({ destination }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);
  const countryLabelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      countryLabelRef.current,
      titleRef.current,
      taglineRef.current,
      metadataRef.current,
    ].filter(Boolean);

    // Set initial hidden state
    gsap.set(elements, { opacity: 0, y: 20 });

    // Staggered fade-up entrance
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      delay: 0.2,
    });

    // Image scale-in (subtle, matches existing pattern)
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.2, ease: 'power2.out' },
      );
    }
  }, [destination.id]);

  // Extract short style label from aiTravelStyle (everything before " — ")
  const shortStyle = destination.aiTravelStyle
    ? destination.aiTravelStyle.split(' — ')[0]
    : null;

  return (
    <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
      {/* ── Hero image ── */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={destination.image}
          alt={destination.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.82) 85%, rgba(10,10,12,0.92) 100%)',
        }}
      />

      {/* ── Text content ── */}
      <div className="absolute inset-x-0 bottom-0 px-6 sm:px-10 pb-7">
        {/* Country / Region label */}
        <p
          ref={countryLabelRef}
          className="text-[11px] font-medium tracking-[0.16em] uppercase mb-2"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#C8884B',
          }}
        >
          {destination.subtitle}
        </p>

        {/* Destination title */}
        <h1
          ref={titleRef}
          className="text-white m-0 mb-2.5"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 250,
            fontSize: 'clamp(34px, 4.5vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
          }}
        >
          {destination.title}
        </h1>

        {/* Emotional tagline — Instrument Serif italic */}
        <p
          ref={taglineRef}
          className="m-0 mb-4"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            lineHeight: 1.35,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.01em',
          }}
        >
          {destination.description}
        </p>

        {/* ── Metadata row ── */}
        <div ref={metadataRef} className="flex flex-wrap items-center gap-2">
          {/* Best season */}
          {destination.practicalInfo.bestSeason && (
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Calendar size={10} strokeWidth={1.5} style={{ color: '#C8884B' }} />
              最佳季节 {destination.practicalInfo.bestSeason}
            </span>
          )}

          {/* Travel style */}
          {shortStyle && (
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <Compass size={10} strokeWidth={1.5} style={{ color: '#C8884B' }} />
              {shortStyle}
            </span>
          )}

          {/* Atmosphere vibe tags (first 2) */}
          {destination.atmosphere.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium tracking-[0.06em] px-2 py-1 rounded-full"
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
      </div>

      {/* ── Subtle bottom divider between hero and content ── */}
      <div
        className="absolute bottom-0 inset-x-0"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 80%, transparent 100%)',
        }}
      />
    </div>
  );
}
