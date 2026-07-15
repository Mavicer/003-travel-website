import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DestinationCard from './DestinationCard';
import { DESTINATIONS } from '../data/destinations';

interface Props {
  onCardClick?: (id: string) => void;
}

export default function PopularDestinations({ onCardClick }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            heading,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          );
          observer.unobserve(heading);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(heading);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        {/* Section heading */}
        <div ref={headingRef} className="text-center pt-20 pb-16">
          <p
            className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
          >
            为探索者甄选
          </p>
          <h2
            className="text-white m-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            灵感目的地
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <DestinationCard
              key={dest.title}
              destination={dest}
              index={i}
              onClick={onCardClick}
            />
          ))}
        </div>
      </div>

      {/* Card fade-in keyframes */}
      <style>{`
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
