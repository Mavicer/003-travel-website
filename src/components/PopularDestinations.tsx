import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DestinationCard, { type Destination } from './DestinationCard';

const DESTINATIONS: Destination[] = [
  {
    image:
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80&fit=crop',
    title: 'Santorini',
    subtitle: 'Greece',
    description:
      'Whitewashed cliffs meet the Aegean blue — sunsets that rewrite your definition of beauty.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80&fit=crop',
    title: 'Kyoto',
    subtitle: 'Japan',
    description:
      'Temples wrapped in bamboo groves, where centuries of stillness meet cherry-blossom air.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&fit=crop',
    title: 'Banff',
    subtitle: 'Canada',
    description:
      'Turquoise lakes cradled by the Rockies — raw wilderness with a lodge-fire welcome.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80&fit=crop',
    title: 'Amalfi Coast',
    subtitle: 'Italy',
    description:
      'Cliffside villages spilling into the Mediterranean — lemon groves, terraced views, la dolce vita.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop',
    title: 'Bali',
    subtitle: 'Indonesia',
    description:
      'Emerald rice terraces and sacred temples — an island where spirit and nature move as one.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80&fit=crop',
    title: 'Patagonia',
    subtitle: 'Argentina',
    description:
      'Jagged peaks above glacial fields — the edge of the world, and the start of something deeper.',
  },
];

export default function PopularDestinations() {
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
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-[1280px] mx-auto px-8 pb-24">
        {/* Section heading */}
        <div ref={headingRef} className="text-center pt-20 pb-16">
          <p
            className="text-[11px] font-medium tracking-[0.18em] text-white/40 uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Curated for the curious
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
            Popular Destinations
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((dest, i) => (
            <DestinationCard key={dest.title} destination={dest} index={i} />
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
