import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Sparkles, X, MapPin, RefreshCw, Calendar, Compass } from 'lucide-react';
import type { Destination } from '../../data/destinations';
import {
  aiClient,
  AIAbortError,
  AITimeoutError,
  AIValidationError,
} from '../../lib/ai-provider';
import type {
  TripPreferences,
  Budget,
  Companion,
  TripResult,
} from '../../lib/ai-provider';
import ItinerarySection from '../DestinationPanel/ItinerarySection';

/* ══════════════════════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════════════════════ */

type PlannerState = 'idle' | 'preferences' | 'generating' | 'result' | 'error';

interface Props {
  destination: Destination;
  onClose: () => void;
  onTripGenerated?: (result: TripResult) => void;
}

/* ══════════════════════════════════════════════════════════════
   Default preferences for the current destination
   ══════════════════════════════════════════════════════════════ */

function defaultPreferences(destination: Destination): TripPreferences {
  return {
    destinationId: destination.id,
    days: 3,
    styles: destination.aiTags?.slice(0, 2) ?? [],
    budget: '舒适',
    companions: '情侣',
    specialRequests: '',
  };
}

/* ══════════════════════════════════════════════════════════════
   Shared segmented-control button
   ══════════════════════════════════════════════════════════════ */

function SegmentedOption({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 text-[13px] font-medium py-2.5 rounded-lg transition-all duration-200"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: selected ? 'rgba(200,136,75,0.18)' : 'transparent',
        color: selected ? '#C8884B' : 'rgba(255,255,255,0.45)',
        border: selected
          ? '1px solid rgba(200,136,75,0.25)'
          : '1px solid transparent',
      }}
    >
      {children}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   Style chip (multi-select)
   ══════════════════════════════════════════════════════════════ */

function StyleChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[12px] font-medium px-3.5 py-2 rounded-full transition-all duration-200"
      style={{
        fontFamily: "'Inter', sans-serif",
        background: selected
          ? 'rgba(200,136,75,0.15)'
          : 'rgba(255,255,255,0.03)',
        color: selected ? '#C8884B' : 'rgba(255,255,255,0.5)',
        border: selected
          ? '1px solid rgba(200,136,75,0.25)'
          : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {label}
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════
   Section label
   ══════════════════════════════════════════════════════════════ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] font-medium tracking-[0.14em] uppercase mb-3"
      style={{ fontFamily: "'Inter', sans-serif", color: '#C8884B' }}
    >
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════
   Error messages for different error types
   ══════════════════════════════════════════════════════════════ */

function errorMessage(err: unknown): string {
  if (err instanceof AIAbortError) return '生成已取消';
  if (err instanceof AITimeoutError) return '请求超时，请检查网络后重试';
  if (err instanceof AIValidationError)
    return 'AI 返回数据格式异常，请稍后重试';
  if (err instanceof Error) return err.message;
  return '发生未知错误，请稍后重试';
}

/* ══════════════════════════════════════════════════════════════
   AITripPlanner
   ══════════════════════════════════════════════════════════════ */

export default function AITripPlanner({
  destination,
  onClose,
  onTripGenerated,
}: Props) {
  const [state, setState] = useState<PlannerState>('preferences');
  const [prefs, setPrefs] = useState<TripPreferences>(
    () => defaultPreferences(destination),
  );
  const [tripResult, setTripResult] = useState<TripResult | null>(null);
  const [stepMessage, setStepMessage] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [err, setErr] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' },
    );
  }, []);

  /* ── Reset prefs when destination changes ── */
  useEffect(() => {
    setPrefs(defaultPreferences(destination));
    setState('preferences');
    setErr('');
  }, [destination.id]);

  /* ── Submit — calls AI client ── */
  const handleSubmit = useCallback(async () => {
    setState('generating');
    setErr('');
    setStepMessage('');
    setStepIndex(0);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await aiClient.generateTrip(
        prefs,
        destination,
        (step) => {
          setStepMessage(step.message);
          setStepIndex((i) => i + 1);
        },
        controller.signal,
      );
      setTripResult(result);
      setState('result');
      onTripGenerated?.(result);
    } catch (e) {
      if (e instanceof AIAbortError) {
        // 用户主动取消 — 回到偏好界面
        setState('preferences');
        return;
      }
      setErr(errorMessage(e));
      setState('error');
    }
  }, [prefs, destination, onTripGenerated]);

  const handleCancel = () => {
    abortRef.current?.abort();
    onClose();
  };

  /* ── Toggle a style chip ── */
  const toggleStyle = (tag: string) => {
    setPrefs((prev) => {
      const exists = prev.styles.includes(tag);
      return {
        ...prev,
        styles: exists
          ? prev.styles.filter((s) => s !== tag)
          : [...prev.styles, tag],
      };
    });
  };

  /* ══════════════════════════════════════════════════════════
     Render
     ══════════════════════════════════════════════════════════ */

  return (
    <div
      ref={containerRef}
      className="w-full rounded-[24px] overflow-hidden"
      style={{
        background: 'rgba(10,10,12,0.82)',
        backdropFilter: 'blur(48px) saturate(1.1)',
        WebkitBackdropFilter: 'blur(48px) saturate(1.1)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow:
          '0 4px 24px rgba(0,0,0,0.3), 0 25px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(200,136,75,0.15)' }}
          >
            <Sparkles size={15} strokeWidth={1.5} style={{ color: '#C8884B' }} />
          </div>
          <span
            className="text-[15px] font-medium text-white/85"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}
          >
            AI 智能行程规划
          </span>
        </div>
        <button
          type="button"
          onClick={handleCancel}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/5"
          aria-label="关闭"
        >
          <X size={16} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </button>
      </div>

      <div className="px-6 sm:px-8 pb-8">
        {/* ═══ State: preferences ═══ */}
        {state === 'preferences' && (
          <div>
            {/* Destination badge */}
            <div
              className="flex items-center gap-2 mb-6 px-3.5 py-2.5 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <MapPin size={13} strokeWidth={1.5} style={{ color: '#C8884B' }} />
              <span
                className="text-[13px] font-medium text-white/70"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {destination.title} · {destination.subtitle}
              </span>
            </div>

            {/* ── Days ── */}
            <SectionLabel>旅行天数</SectionLabel>
            <div className="flex gap-1.5 mb-5">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <SegmentedOption
                  key={d}
                  selected={prefs.days === d}
                  onClick={() => setPrefs((p) => ({ ...p, days: d }))}
                >
                  {d}天
                </SegmentedOption>
              ))}
            </div>

            {/* ── Style ── */}
            <SectionLabel>
              旅行风格
              {prefs.styles.length > 0 && (
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {' '}
                  · 已选 {prefs.styles.length}
                </span>
              )}
            </SectionLabel>
            <div className="flex flex-wrap gap-2 mb-5">
              {(destination.aiTags && destination.aiTags.length > 0
                ? destination.aiTags
                : ['文化', '美食', '自然', '摄影', '历史', '冒险']
              ).map((tag) => (
                <StyleChip
                  key={tag}
                  label={tag}
                  selected={prefs.styles.includes(tag)}
                  onClick={() => toggleStyle(tag)}
                />
              ))}
            </div>

            {/* ── Budget ── */}
            <SectionLabel>预算范围</SectionLabel>
            <div className="flex gap-1.5 mb-5">
              {(['经济', '舒适', '奢华'] as Budget[]).map((b) => (
                <SegmentedOption
                  key={b}
                  selected={prefs.budget === b}
                  onClick={() => setPrefs((p) => ({ ...p, budget: b }))}
                >
                  {b}
                </SegmentedOption>
              ))}
            </div>

            {/* ── Companions ── */}
            <SectionLabel>同行者</SectionLabel>
            <div className="flex gap-1.5 mb-5">
              {([
                { key: '独自', label: '🧍 独自' },
                { key: '情侣', label: '💑 情侣' },
                { key: '家庭', label: '👨‍👩‍👧 家庭' },
                { key: '朋友', label: '👥 朋友' },
              ] as { key: Companion; label: string }[]).map((c) => (
                <SegmentedOption
                  key={c.key}
                  selected={prefs.companions === c.key}
                  onClick={() => setPrefs((p) => ({ ...p, companions: c.key }))}
                >
                  {c.label}
                </SegmentedOption>
              ))}
            </div>

            {/* ── Special requests ── */}
            <SectionLabel>特殊需求（选填）</SectionLabel>
            <textarea
              value={prefs.specialRequests}
              onChange={(e) =>
                setPrefs((p) => ({ ...p, specialRequests: e.target.value }))
              }
              placeholder="例如：素食、行动不便、带小孩、特别想去的景点…"
              rows={3}
              className="w-full text-[14px] leading-relaxed rounded-xl px-4 py-3 mb-6 resize-none transition-colors placeholder:text-white/20"
              style={{
                fontFamily: "'Barlow', sans-serif",
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.75)',
                outline: 'none',
              }}
            />

            {/* ── Actions ── */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex items-center justify-center gap-2 text-[14px] font-medium rounded-xl py-3.5 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: '#C8884B',
                color: '#000',
              }}
            >
              <Sparkles size={15} strokeWidth={1.5} />
              生成我的专属行程
            </button>
          </div>
        )}

        {/* ═══ State: generating ═══ */}
        {state === 'generating' && (
          <div className="py-10 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(200,136,75,0.12)' }}
            >
              <Sparkles
                size={24}
                strokeWidth={1.5}
                style={{ color: '#C8884B' }}
                className="animate-pulse"
              />
            </div>
            <p
              className="text-[15px] font-medium text-white/80 mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              AI 正在为你设计行程
            </p>
            <p
              className="text-[13px] leading-relaxed text-white/40 mb-6"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {stepMessage || '正在分析目的地数据…'}
            </p>
            {/* Progress bar */}
            <div
              className="mx-auto w-full max-w-[200px] h-0.5 rounded-full mb-6 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  background: `linear-gradient(90deg, #C8884B 0%, #D4A76A 100%)`,
                  width: `${Math.max(5, (stepIndex / 4) * 100)}%`,
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => abortRef.current?.abort()}
              className="text-[13px] font-medium text-white/35 hover:text-white/60 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              取消生成
            </button>
          </div>
        )}

        {/* ═══ State: error ═══ */}
        {state === 'error' && (
          <div className="py-10 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <RefreshCw size={22} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.4)' }} />
            </div>
            <p
              className="text-[15px] font-medium text-white/70 mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              生成失败
            </p>
            <p
              className="text-[13px] leading-relaxed text-white/40 mb-6"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {err}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 text-[14px] font-medium rounded-xl px-6 py-3 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'rgba(200,136,75,0.15)',
                  color: '#C8884B',
                  border: '1px solid rgba(200,136,75,0.2)',
                }}
              >
                <RefreshCw size={14} strokeWidth={1.5} />
                重试
              </button>
              <button
                type="button"
                onClick={() => setState('preferences')}
                className="text-[14px] font-medium rounded-xl px-6 py-3 transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                修改偏好
              </button>
            </div>
          </div>
        )}

        {/* ═══ State: result ═══ */}
        {state === 'result' && tripResult && (
          <div>
            {/* Trip header */}
            <div
              className="rounded-2xl p-6 mb-2"
              style={{
                background: 'rgba(200,136,75,0.04)',
                border: '1px solid rgba(200,136,75,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(200,136,75,0.18)' }}
                >
                  <Sparkles size={13} strokeWidth={1.5} style={{ color: '#C8884B' }} />
                </div>
                <span
                  className="text-[17px] font-medium text-white"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.02em',
                  }}
                >
                  {tripResult.title}
                </span>
              </div>
              <p
                className="text-[14px] leading-relaxed text-white/55 m-0 mb-4"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {tripResult.overview}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <Calendar size={10} strokeWidth={1.5} style={{ color: '#C8884B' }} />
                  {prefs.days}天行程
                </span>
                {prefs.styles.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      background: 'rgba(200,136,75,0.08)',
                      color: '#C8884B',
                    }}
                  >
                    {s}
                  </span>
                ))}
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    background: 'rgba(255,255,255,0.03)',
                    color: 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <Compass size={10} strokeWidth={1.5} style={{ color: '#C8884B' }} />
                  {prefs.budget}
                </span>
              </div>
            </div>

            {/* Itinerary timeline — reuses existing component */}
            <ItinerarySection
              itinerary={tripResult.itinerary}
              heading="AI 生成行程"
            />

            {/* Action buttons */}
            <div className="px-6 sm:px-10 pb-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setState('preferences');
                  setPrefs(defaultPreferences(destination));
                  setTripResult(null);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 text-[14px] font-medium rounded-xl py-3 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <RefreshCw size={14} strokeWidth={1.5} />
                重新生成
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 text-[14px] font-medium rounded-xl py-3 transition-all duration-300"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
