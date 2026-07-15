import { useRef } from 'react';
import gsap from 'gsap';

export interface Destination {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface Props {
  destination: Destination;
  index: number;
}

export default function DestinationCard({ destination, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current || !imgRef.current || !overlayRef.current) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.15), 0 24px 48px rgba(0,0,0,0.6)',
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
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p
          className="text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase mb-1"
          style={{ fontFamily: "'Inter', sans-serif" }}
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
          className="text-[13px] leading-relaxed text-white/60 m-0"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {destination.description}
        </p>
      </div>
    </div>
  );
}
