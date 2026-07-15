import { Sparkles, ArrowLeft } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function PanelFooter({ onClose }: Props) {
  return (
    <div
      className="px-6 sm:px-10 py-16 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
    >
      {/* AI CTA placeholder */}
      <div
        className="rounded-2xl p-8 sm:p-10 text-center mb-8"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(200,136,75,0.12)' }}
        >
          <Sparkles size={22} strokeWidth={1.5} style={{ color: '#C8884B' }} />
        </div>
        <h3
          className="text-[18px] font-normal text-white mb-2 m-0"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
        >
          AI 智能行程规划
        </h3>
        <p
          className="text-[14px] leading-relaxed text-white/40 m-0 mb-6 max-w-[360px] mx-auto"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          告诉我们你的旅行偏好，AI 将为你量身定制独一无二的专属行程。
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 bg-white text-black text-[14px] font-medium rounded-full px-6 py-3 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] opacity-50 cursor-not-allowed"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
          disabled
          title="即将推出"
        >
          <Sparkles size={15} strokeWidth={1.5} />
          即将推出
        </button>
      </div>

      {/* Back button */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-2 mx-auto text-[14px] font-medium text-white/50 hover:text-white/80 transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        返回目的地列表
      </button>
    </div>
  );
}
