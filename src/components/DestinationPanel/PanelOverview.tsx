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

/** Returns true when the character is a CJK unified ideograph — suitable for a drop cap. */
function isDropCapChar(ch: string): boolean {
  return /^[一-鿿㐀-䶿\u{20000}-\u{2a6df}]$/u.test(ch);
}

export default function PanelOverview({ introduction, highlights }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll<HTMLElement>('[data-overview-animate]');
          gsap.fromTo(
            children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.07 },
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paragraphs = introduction.trim().split('\n\n');

  return (
    <div ref={sectionRef} className="px-6 sm:px-10 pt-10 sm:pt-12 pb-8 sm:pb-10">
      {/* ── Section heading ── */}
      <p
        data-overview-animate
        className="text-[11px] font-medium tracking-[0.14em] uppercase mb-5"
        style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
      >
        目的地概述
      </p>

      {/* ── Introduction paragraphs ── */}
      <div className="max-w-[600px] mb-12 sm:mb-14">
        {paragraphs.map((raw, i) => {
          const text = raw.trim();
          const firstChar = text.charAt(0);
          const useDropCap = i === 0 && isDropCapChar(firstChar);

          return (
            <p
              key={i}
              data-overview-animate
              className="text-[15px] sm:text-[16px] m-0 mb-5 last:mb-0"
              style={{
                fontFamily: "'Barlow', sans-serif",
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {useDropCap ? (
                <>
                  <span
                    aria-hidden="true"
                    style={{
                      float: 'left',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                      fontSize: '60px',
                      lineHeight: '48px',
                      color: '#C8884B',
                      marginRight: '8px',
                      marginTop: '5px',
                    }}
                  >
                    {firstChar}
                  </span>
                  {text.slice(1)}
                </>
              ) : (
                text
              )}
            </p>
          );
        })}
      </div>

      {/* ── Highlights grid ── */}
      {highlights.length > 0 && (
        <>
          <p
            data-overview-animate
            className="text-[11px] font-medium tracking-[0.14em] uppercase mb-6"
            style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
          >
            旅行亮点
          </p>
          <div data-overview-animate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h) => {
              const Icon = getIcon(h.icon);
              return (
                <div
                  key={h.title}
                  className="relative flex gap-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Left accent bar — fades in on hover */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full opacity-0 transition-opacity duration-300"
                    style={{ background: '#C8884B' }}
                  />

                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(200,136,75,0.15)' }}
                  >
                    <Icon
                      size={18}
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
