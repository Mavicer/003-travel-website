import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, Compass, Sparkles, MapPin } from 'lucide-react';

interface Props {
  onExploreAll?: () => void;
  onBack?: () => void;
}

const STEPS = [
  { num: '01', title: '发现', desc: '浏览灵感目的地与体验', Icon: Compass },
  { num: '02', title: '智选', desc: '让 AI 找到完美匹配', Icon: Sparkles },
  { num: '03', title: '启程', desc: '一键生成专属行程', Icon: MapPin },
];

const ATMOSPHERE_TAGS = ['浪漫', '宁静', '冒险', '文化', '禅意', '野性', '温暖', '历史', '热带', '奢华'];

export default function GuideSection({ onExploreAll, onBack }: Props) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(el, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 px-5 sm:px-8 py-4 flex items-center" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[13px] font-medium">返回</span>
        </button>
      </header>

      <div className="max-w-[680px] mx-auto px-8 pt-12 pb-24">
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
            关于马维策
          </p>
          <h2 className="text-white m-0" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            指南
          </h2>
        </div>

        <p className="text-[16px] leading-relaxed m-0 mb-16" style={{ fontFamily: "'Barlow', sans-serif", color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>
          <span aria-hidden="true" style={{ float: 'left', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '60px', lineHeight: '48px', color: '#C8884B', marginRight: '8px', marginTop: '5px' }}>
            我
          </span>
          们相信，最好的旅行不是打卡景点，而是找到与自己共鸣的目的地。马维策将人工智能的精准与人类直觉的诗意融合，为你匹配最适合的旅行目的地与体验。每一次出发，都应该是一次与自我的对话。
        </p>

        <div className="grid grid-cols-3 gap-4 mb-16">
          {STEPS.map(({ num, title, desc, Icon }) => (
            <div key={num} className="text-center p-5 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="block text-[36px] mb-2" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#C8884B' }}>{num}</span>
              <Icon size={18} strokeWidth={1.5} style={{ color: '#C8884B', margin: '0 auto 8px' }} />
              <h4 className="text-[14px] font-medium text-white/85 m-0 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{title}</h4>
              <p className="text-[12px] text-white/40 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
            旅行情绪罗盘
          </p>
          <p className="text-[15px] m-0 mb-6" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
            每一种心情，都有一个目的地
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {ATMOSPHERE_TAGS.map((tag) => (
              <span key={tag} className="text-[12px] font-medium px-4 py-2 rounded-full" style={{ fontFamily: "'Inter', sans-serif", background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onExploreAll}
            className="bg-white text-black text-[14px] font-medium rounded-full px-8 py-3.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            探索全部目的地
          </button>
        </div>
      </div>
    </div>
  );
}
