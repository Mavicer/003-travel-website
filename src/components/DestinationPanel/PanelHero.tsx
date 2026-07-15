import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { AtmosphereTag } from '../../data/destinations';

interface Props {
  image: string;
  title: string;
  subtitle: string;
  atmosphere: AtmosphereTag[];
}

const ATMOSPHERE_LABELS: Record<AtmosphereTag, string> = {
  '浪漫': '浪漫',
  '宁静': '宁静',
  '冒险': '冒险',
  '文化': '文化',
  '禅意': '禅意',
  '野性': '野性',
  '温暖': '温暖',
  '历史': '历史',
  '热带': '热带',
  '奢华': '奢华',
};

export default function PanelHero({ image, title, subtitle, atmosphere }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const content = contentRef.current;
    if (!img || !content) return;

    gsap.fromTo(
      img,
      { scale: 1.12 },
      { scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 }
    );
    gsap.fromTo(
      content,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full" style={{ aspectRatio: '4/5' }}>
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={image.replace('w=600', 'w=1200')}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute bottom-0 left-0 right-0 p-8 sm:p-10"
      >
        {/* Subtitle */}
        <p
          className="text-[12px] font-medium tracking-[0.14em] uppercase mb-3"
          style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
        >
          {subtitle}
        </p>

        {/* Title */}
        <h1
          className="text-white m-0 mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </h1>

        {/* Atmosphere tags */}
        <div className="flex flex-wrap gap-2">
          {atmosphere.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium tracking-[0.08em] px-3 py-1.5 rounded-full"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {ATMOSPHERE_LABELS[tag]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
