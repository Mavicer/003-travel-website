import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowLeft, Compass, Sparkles, MapPin,
  Calendar, Camera, Sunrise, Coffee,
} from 'lucide-react';

interface Props {
  onExploreAll?: () => void;
  onBack?: () => void;
}

const STEPS = [
  { num: '01', title: '发现', desc: '浏览灵感目的地与体验', Icon: Compass },
  { num: '02', title: '智选', desc: '找到与你共鸣的目的地', Icon: Sparkles },
  { num: '03', title: '启程', desc: '生成专属行程，出发', Icon: MapPin },
];

const ATMOSPHERE_TAGS = ['浪漫', '宁静', '冒险', '文化', '禅意', '野性', '温暖', '历史', '热带', '奢华'];

const SEASONS = [
  { season: '春', months: '3–5月', tip: '北半球目的地的最佳窗口。日本樱花、荷兰郁金香、江南烟雨——春天适合文化之旅。', Icon: Sunrise },
  { season: '夏', months: '6–8月', tip: '高纬度与高海拔的天堂。北欧午夜太阳、阿尔卑斯徒步、海岛浮潜——夏天属于户外。', Icon: Sunrise },
  { season: '秋', months: '9–11月', tip: '色彩与光影的巅峰。九寨沟彩林、京都红叶、托斯卡纳葡萄收获——秋天是摄影师的黄金季。', Icon: Calendar },
  { season: '冬', months: '12–2月', tip: '要么追极光，要么躲进南半球夏天。冰岛极光、北海道温泉、巴塔哥尼亚盛夏徒步——冬天有最极致的反差。', Icon: Sunrise },
];

const TIPS = [
  { icon: Camera, title: '摄影建议', text: '黄金时刻（日出后一小时 + 日落前一小时）是任何目的地的最佳光线。提前踩点，等光来，而不是追光跑。带一支轻便的三脚架——夜景和长曝光会让你的旅行照片提升一个维度。' },
  { icon: Coffee, title: '体验优先', text: '每天只安排两个核心体验，留出空白。最好的旅行记忆往往来自计划之外——那个拐角处的咖啡馆、雨后出现的双彩虹、当地大爷邀请你参加的广场舞。' },
  { icon: Compass, title: '探索方式', text: '落地第一天用脚步丈量——走路能发现地图上没有的巷子。第二天租一辆自行车扩大半径。第三天再回到第一天路过的那家店——你会发现你已经不是刚来时的你了。' },
];

/* ── Scroll-reveal block ── */
function AnimateIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref}>{children}</div>;
}

export default function GuideSection({ onExploreAll, onBack }: Props) {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 px-5 sm:px-8 py-4 flex items-center justify-between" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-white/55 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[13px] font-medium">返回</span>
        </button>
        <span className="text-[12px] font-medium tracking-[0.1em] text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>指南</span>
      </header>

      <div className="max-w-[680px] mx-auto px-5 sm:px-8 pt-16 pb-24">
        {/* ── Editorial header ── */}
        <div ref={headingRef} className="text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
            Travel Guide
          </p>
          <h1 className="text-white m-0 mb-4" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            指南
          </h1>
          <p className="text-[16px] sm:text-[18px] m-0 max-w-[480px] mx-auto" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
            不是告诉你该去哪里，<br />而是帮你找到属于自己的出发方式。
          </p>
        </div>

        {/* ── Philosophy ── */}
        <AnimateIn>
          <div className="mb-16">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
              旅行哲学
            </p>
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-white/65 m-0 mb-5" style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.85 }}>
              <span aria-hidden="true" style={{ float: 'left', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '60px', lineHeight: '48px', color: '#C8884B', marginRight: '8px', marginTop: '5px' }}>
                最
              </span>
              好的旅行不是打卡景点，而是找到与自己共鸣的目的地。有人为了一碗正宗的担担面飞越半个中国，有人在冰岛的暴风雪中第一次听见自己的心跳——旅行的意义不在远方，在于远方让你重新认识了自己。我们相信，每一次出发都应该是一次与自我的对话。
            </p>
          </div>
        </AnimateIn>

        {/* ── How it works ── */}
        <AnimateIn>
          <div className="mb-16">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
              三步启程
            </p>
            <div className="grid grid-cols-3 gap-4">
              {STEPS.map(({ num, title, desc, Icon }) => (
                <div key={num} className="text-center p-5 rounded-xl transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="block text-[36px] mb-2" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: '#C8884B' }}>{num}</span>
                  <Icon size={18} strokeWidth={1.5} style={{ color: '#C8884B', margin: '0 auto 8px' }} />
                  <h4 className="text-[14px] font-medium text-white/85 m-0 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{title}</h4>
                  <p className="text-[12px] text-white/40 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* ── Season guide ── */}
        <AnimateIn>
          <div className="mb-16">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
              四季建议
            </p>
            <div className="space-y-3">
              {SEASONS.map(({ season, months, tip, Icon }) => (
                <div key={season} className="flex gap-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(200,136,75,0.1)' }}>
                    <Icon size={16} strokeWidth={1.5} style={{ color: '#C8884B' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[13px] font-medium text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>{season}</span>
                      <span className="text-[10px] text-white/30" style={{ fontFamily: "'Barlow', sans-serif" }}>{months}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-white/45 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* ── Travel tips ── */}
        <AnimateIn>
          <div className="mb-16">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-5" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
              旅行建议
            </p>
            <div className="space-y-3">
              {TIPS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(200,136,75,0.1)' }}>
                    <Icon size={16} strokeWidth={1.5} style={{ color: '#C8884B' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-medium text-white/80 m-0 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>{title}</h4>
                    <p className="text-[13px] leading-relaxed text-white/45 m-0" style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.75 }}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* ── Mood compass ── */}
        <AnimateIn>
          <div className="text-center mb-16">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
              情绪罗盘
            </p>
            <p className="text-[15px] m-0 mb-6" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
              每一种心情，都有一个目的地
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {ATMOSPHERE_TAGS.map((tag) => (
                <span key={tag} className="text-[12px] font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/[0.06]" style={{ fontFamily: "'Inter', sans-serif", background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* ── CTA ── */}
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
