import { ArrowLeft, Share2, Bookmark } from 'lucide-react';

interface Props {
  title: string;
  onClose: () => void;
}

export default function PanelHeader({ title, onClose }: Props) {
  return (
    <div
      className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
      style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Back */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
        aria-label="返回"
      >
        <ArrowLeft size={18} strokeWidth={1.5} />
        <span className="text-[13px] font-medium hidden sm:inline">返回</span>
      </button>

      {/* Title — fades in via GSAP in full implementation */}
      <span
        className="text-[14px] font-medium text-white/80 truncate max-w-[200px]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </span>

      {/* Actions (placeholder) */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="text-white/50 hover:text-white/70 transition-colors"
          aria-label="分享"
          title="分享"
        >
          <Share2 size={17} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="text-white/50 hover:text-white/70 transition-colors"
          aria-label="收藏"
          title="收藏"
        >
          <Bookmark size={17} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
