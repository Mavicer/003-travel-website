import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import * as LucideIcons from 'lucide-react';
import type { Highlight } from '../../data/destinations';

interface Props {
  introduction: string;
  highlights: Highlight[];
}

function getIcon(name: string) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>>)[name];
  return Icon || LucideIcons.MapPin;
}

export default function PanelOverview({ introduction, highlights }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paragraphs = introduction.trim().split('\n\n');

  return (
    <div ref={sectionRef} className="px-6 sm:px-10 py-12 sm:py-16">
      {/* Introduction */}
      <div className="max-w-[600px] mb-12 sm:mb-16">
        <p
          className="text-[11px] font-medium tracking-[0.14em] uppercase mb-4"
          style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
        >
          目的地概述
        </p>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="text-[15px] sm:text-[16px] leading-[1.8] text-white/65 m-0 mb-4 last:mb-0"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {para.trim()}
          </p>
        ))}
      </div>

      {/* Highlights grid */}
      {highlights.length > 0 && (
        <>
          <p
            className="text-[11px] font-medium tracking-[0.14em] uppercase mb-6"
            style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
          >
            旅行亮点
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h) => {
              const Icon = getIcon(h.icon);
              return (
                <div
                  key={h.title}
                  className="flex gap-4 p-5 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(200,136,75,0.12)' }}
                  >
                    <Icon
                      size={17}
                      strokeWidth={1.5}
                      style={{ color: '#C8884B' }}
                    />
                  </div>
                  <div>
                    <h4
                      className="text-[14px] font-medium text-white/90 mb-1 m-0"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {h.title}
                    </h4>
                    <p
                      className="text-[13px] leading-relaxed text-white/50 m-0"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {h.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
