import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { ItineraryDay } from '../../data/destinations';

interface Props {
  itinerary: ItineraryDay[];
  /** Section heading. Defaults to "推荐行程". Use "AI 生成行程" for AI results. */
  heading?: string;
}

export default function ItinerarySection({
  itinerary,
  heading = '推荐行程',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>('[data-animate]');
          gsap.fromTo(
            items,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              stagger: 0.1,
            },
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="px-6 sm:px-10 py-10 sm:py-12">
      <p
        data-animate
        className="text-[11px] font-medium tracking-[0.14em] uppercase mb-6"
        style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
      >
        {heading}
      </p>
      <div className="space-y-8">
        {itinerary.map((day) => (
          <div key={day.day} data-animate>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'rgba(200,136,75,0.12)',
                  color: '#C8884B',
                }}
              >
                第{day.day}天
              </span>
              <span
                className="text-[13px] font-medium text-white/75"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {day.title}
              </span>
            </div>
            <div
              className="relative pl-5"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}
            >
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className="relative pb-5 last:pb-0"
                  style={{ paddingLeft: '16px' }}
                >
                  <div
                    className="absolute left-[-23px] top-1.5 w-2.5 h-2.5 rounded-full"
                    style={{
                      background:
                        item.type === '餐饮'
                          ? '#E07B5A'
                          : item.type === '交通'
                            ? '#7B9FC8'
                            : '#C8884B',
                      border: '2px solid rgba(0,0,0,0.78)',
                      boxShadow:
                        i === 0
                          ? `0 0 6px ${
                              item.type === '餐饮'
                                ? 'rgba(224,123,90,0.3)'
                                : item.type === '交通'
                                  ? 'rgba(123,159,200,0.3)'
                                  : 'rgba(200,136,75,0.3)'
                            }`
                          : 'none',
                    }}
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-medium text-white/35"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.time}
                    </span>
                    <span
                      className="text-[13px] font-medium text-white/85"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <p
                    className="text-[12px] leading-relaxed text-white/45 m-0"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
