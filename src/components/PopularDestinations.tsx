import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import DestinationCard from './DestinationCard';
import { DESTINATIONS } from '../data/destinations';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  onCardClick?: (id: string) => void;
}

const VISIBLE_DEFAULT = 6;

export default function PopularDestinations({ onCardClick }: Props) {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);

  const displayed = showAll ? DESTINATIONS : DESTINATIONS.slice(0, VISIBLE_DEFAULT);
  const hidden = DESTINATIONS.length - VISIBLE_DEFAULT;

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

        {/* Card grid — key forces animation remount on expand */}
        <div key={showAll ? 'all' : 'folded'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((dest, i) => (
              <DestinationCard
                key={dest.title}
                destination={dest}
                index={i}
                onClick={onCardClick}
              />
            ))}
          </div>
        </div>

        {/* Expand toggle — Apple-style subtle button */}
        {hidden > 0 && (
          <div ref={expandRef} className="text-center pt-10">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-[13px] font-medium rounded-full px-6 py-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: 'rgba(255,255,255,0.03)',
                color: showAll ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {showAll ? (
                <>
                  收起
                  <ChevronUp size={14} strokeWidth={1.5} />
                </>
              ) : (
                <>
                  探索更多目的地
                  <ChevronDown size={14} strokeWidth={1.5} />
                  <span style={{ color: '#C8884B', marginLeft: '2px' }}>+{hidden}</span>
                </>
              )}
            </button>
          </div>
        )}
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
