import { useRef } from 'react';
import gsap from 'gsap';
import type { Destination } from '../data/destinations';

interface Props {
  destination: Destination;
  index: number;
  onClick?: (destination: Destination) => void;
}

export default function DestinationCard({ destination, index, onClick }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const discoverRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current || !imgRef.current || !overlayRef.current) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      boxShadow:
        '0 0 0 1px rgba(200,136,75,0.35), 0 24px 48px rgba(0,0,0,0.6)',
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(imgRef.current, {
      scale: 1.08,
      duration: 0.7,
      ease: 'power2.out',
    });
    gsap.to(overlayRef.current, {
      opacity: 0.25,
      duration: 0.5,
      ease: 'power2.out',
    });
    if (discoverRef.current) {
      gsap.to(discoverRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !imgRef.current || !overlayRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.7,
      ease: 'power2.out',
    });
    gsap.to(overlayRef.current, {
      opacity: 0.4,
      duration: 0.5,
      ease: 'power2.out',
    });
    if (discoverRef.current) {
      gsap.to(discoverRef.current, {
        opacity: 0,
        y: 6,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick?.(destination)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
        animation: `fadeInCard 0.8s ease-out ${0.1 + index * 0.08}s both`,
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img
          ref={imgRef}
          src={destination.image}
          alt={destination.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transformOrigin: 'center center' }}
        />
        {/* Gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.9) 100%)',
            opacity: 0.4,
          }}
        />
      </div>

      {/* Discover affordance — fades in on hover */}
      <span
        ref={discoverRef}
        className="absolute top-5 right-5 opacity-0 translate-y-1.5 text-[11px] font-medium tracking-[0.12em] text-white/90 pointer-events-none"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        探索 →
      </span>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p
          className="text-[11px] font-medium tracking-[0.14em] uppercase mb-1"
          style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
        >
          {destination.subtitle}
        </p>
        <h3
          className="text-xl font-normal text-white mb-2 m-0 tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {destination.title}
        </h3>
        <p
          className="text-[13px] leading-relaxed m-0"
          style={{ fontFamily: "'Barlow', sans-serif", color: 'rgba(255,255,255,0.6)' }}
        >
          {destination.description}
        </p>
      </div>
    </div>
  );
}
