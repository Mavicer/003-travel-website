import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MapPin, Sparkles, ChevronDown, ChevronUp, PenLine } from 'lucide-react';
import {
  type TravelerNote,
  type NoteMood,
  MOOD_OPTIONS,
  moodColor,
  SAMPLE_NOTES,
} from '../data/traveler-notes';

/* ══════════════════════════════════════════════════════════════
   TravelerNotes — 旅人手记
   ══════════════════════════════════════════════════════════════ */
export default function TravelerNotes() {
  const [notes, setNotes] = useState<TravelerNote[]>(SAMPLE_NOTES);
  const [showForm, setShowForm] = useState(false);
  const [nickname, setNickname] = useState('');
  const [destination, setDestination] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<NoteMood | ''>('');

  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* ── Heading entrance ── */
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

  /* ── Form toggle animation ── */
  useEffect(() => {
    const el = formRef.current;
    if (!el || !showForm) return;
    gsap.fromTo(el, { opacity: 0, y: 16, height: 0 }, { opacity: 1, y: 0, height: 'auto', duration: 0.45, ease: 'power2.out' });
  }, [showForm]);

  /* ── Card entrance ── */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-note-card]');
    if (!cards.length) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.08 });
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [notes.length]);

  const handleSubmit = () => {
    if (!nickname.trim() || !destination.trim() || !title.trim() || !content.trim()) return;
    const note: TravelerNote = {
      id: `user-${Date.now()}`,
      nickname: nickname.trim(),
      destination: destination.trim(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' }),
      mood: mood || undefined,
    };
    setNotes((prev) => [note, ...prev]);
    setNickname(''); setDestination(''); setTitle(''); setContent(''); setMood('');
    setShowForm(false);
  };

  return (
    <section className="relative bg-black text-white">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8 pt-20 pb-24">
        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-10">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase mb-4" style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}>
            Traveler Notes
          </p>
          <h2 className="text-white m-0 mb-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            旅人手记
          </h2>
          <p className="text-[15px] text-white/35 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>
            每一次出发，都有一个值得被记住的瞬间。
          </p>
        </div>

        {/* ── Write entry toggle ── */}
        <div className="text-center mb-12">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 text-[13px] font-medium rounded-full px-6 py-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: showForm ? 'rgba(200,136,75,0.12)' : 'rgba(255,255,255,0.03)',
              color: showForm ? '#C8884B' : 'rgba(255,255,255,0.5)',
              border: showForm ? '1px solid rgba(200,136,75,0.2)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <PenLine size={14} strokeWidth={1.5} />
            {showForm ? '收起' : '写下我的旅行记忆'}
            {showForm ? <ChevronUp size={14} strokeWidth={1.5} /> : <ChevronDown size={14} strokeWidth={1.5} />}
          </button>
        </div>

        {/* ── Form ── */}
        {showForm && (
          <div ref={formRef} className="mb-12">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-white/30 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>昵称</label>
                  <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="你的旅行者名字" className="w-full text-[14px] rounded-xl px-4 py-2.5 bg-transparent text-white/80 placeholder:text-white/15" style={{ fontFamily: "'Barlow', sans-serif", border: '1px solid rgba(255,255,255,0.08)', outline: 'none' }} />
                </div>
                <div>
                  <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-white/30 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>目的地</label>
                  <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="如：杭州、重庆…" className="w-full text-[14px] rounded-xl px-4 py-2.5 bg-transparent text-white/80 placeholder:text-white/15" style={{ fontFamily: "'Barlow', sans-serif", border: '1px solid rgba(255,255,255,0.08)', outline: 'none' }} />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-white/30 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>标题</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="给这段回忆一个名字" className="w-full text-[14px] rounded-xl px-4 py-2.5 bg-transparent text-white/80 placeholder:text-white/15" style={{ fontFamily: "'Barlow', sans-serif", border: '1px solid rgba(255,255,255,0.08)', outline: 'none' }} />
              </div>
              <div className="mb-4">
                <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-white/30 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>你的故事</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={4} placeholder="写下你在旅途中最难忘的那一刻…" className="w-full text-[14px] leading-relaxed rounded-xl px-4 py-3 bg-transparent text-white/80 placeholder:text-white/15 resize-none" style={{ fontFamily: "'Barlow', sans-serif", border: '1px solid rgba(255,255,255,0.08)', outline: 'none' }} />
              </div>
              <div className="mb-6">
                <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-white/30 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>心情标签</label>
                <div className="flex flex-wrap gap-2">
                  {MOOD_OPTIONS.map((m) => (
                    <button key={m} type="button" onClick={() => setMood(mood === m ? '' : m)} className="text-[11px] font-medium px-3 py-1.5 rounded-full transition-all duration-200" style={{ fontFamily: "'Inter', sans-serif", background: mood === m ? `${moodColor(m)}18` : 'rgba(255,255,255,0.02)', color: mood === m ? moodColor(m) : 'rgba(255,255,255,0.35)', border: mood === m ? `1px solid ${moodColor(m)}40` : '1px solid rgba(255,255,255,0.05)' }}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={handleSubmit} disabled={!nickname.trim() || !destination.trim() || !title.trim() || !content.trim()} className="inline-flex items-center gap-2 text-[14px] font-medium rounded-xl px-6 py-3 transition-all duration-300" style={{ fontFamily: "'Inter', sans-serif", background: (nickname && destination && title && content) ? '#C8884B' : 'rgba(255,255,255,0.05)', color: (nickname && destination && title && content) ? '#000' : 'rgba(255,255,255,0.2)', cursor: (nickname && destination && title && content) ? 'pointer' : 'default' }}>
                <Sparkles size={14} strokeWidth={1.5} />
                分享我的故事
              </button>
            </div>
          </div>
        )}

        {/* ── Notes grid ── */}
        <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              data-note-card
              className="relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Demo badge */}
              {note.isSample && (
                <span className="absolute top-4 right-4 text-[9px] font-medium tracking-[0.1em] uppercase px-2 py-0.5 rounded-full" style={{ fontFamily: "'Inter', sans-serif", background: 'rgba(200,136,75,0.08)', color: '#C8884B' }}>
                  Demo
                </span>
              )}

              {/* Destination + mood */}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.08em] text-white/35" style={{ fontFamily: "'Inter', sans-serif" }}>
                  <MapPin size={10} strokeWidth={1.5} style={{ color: '#C8884B' }} />
                  {note.destination}
                </span>
                {note.mood && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ fontFamily: "'Inter', sans-serif", background: `${moodColor(note.mood)}12`, color: moodColor(note.mood) }}>
                    {note.mood}
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="text-[15px] font-medium text-white/85 m-0 mb-2" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}>
                {note.title}
              </h4>

              {/* Content */}
              <p className="text-[13px] leading-relaxed text-white/45 m-0 mb-3" style={{ fontFamily: "'Barlow', sans-serif", lineHeight: 1.75 }}>
                {note.content}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-white/25" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {note.nickname}
                </span>
                {note.date && (
                  <span className="text-[10px] text-white/20" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {note.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[14px] text-white/25 m-0" style={{ fontFamily: "'Barlow', sans-serif" }}>
              还没有旅行故事。成为第一个分享的人。
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
