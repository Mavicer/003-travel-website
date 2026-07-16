import type { Destination } from './destinations';
import { DESTINATIONS } from './destinations';

/* ══════════════════════════════════════════════════════════════
   SmartPicks — 旅行偏好探索数据模型

   设计原则：
   - 接口与未来 AI 服务对齐（preferences → AI prompt 映射）
   - Demo 匹配逻辑独立封装，替换为 AI 调用时不影响 UI
   ══════════════════════════════════════════════════════════════ */

export type TravelStyle = '自然' | '城市' | '美食' | '文化' | '冒险';
export type TravelPace = '慢旅行' | '深度探索' | '高效打卡';
export type TravelBudget = '经济' | '舒适' | '奢华';
export type TravelCompanion = '独自' | '情侣' | '家庭' | '朋友';

export interface SmartPicksPreferences {
  style: TravelStyle | null;
  pace: TravelPace | null;
  budget: TravelBudget;
  companion: TravelCompanion;
}

export interface MatchResult {
  destination: Destination;
  score: number;
  reasons: string[];
}

/* ── Style → atmosphere mapping ── */
const STYLE_ATMOSPHERE: Record<TravelStyle, string[]> = {
  '自然': ['野性', '宁静'],
  '城市': ['奢华', '文化', '温暖'],
  '美食': ['温暖', '文化'],
  '文化': ['文化', '历史', '禅意'],
  '冒险': ['冒险', '野性'],
};

/* ── Style → tag keywords ── */
const STYLE_KEYWORDS: Record<TravelStyle, string[]> = {
  '自然': ['自然', '徒步', '雪山', '森林', '湖泊', '冰川', '荒野', '瀑布'],
  '城市': ['都市', '建筑', '夜景', '购物', '城市'],
  '美食': ['美食', '和食', '海鲜', '葡萄酒', '料理', '小吃'],
  '文化': ['寺庙', '茶道', '历史', '艺术', '禅修', '博物馆', '藏族'],
  '冒险': ['徒步', '登山', '极限', '滑雪', '自驾', '荒野', '马背'],
};

/* ── Companion → aiTravelStyle keyword mapping ── */
const COMPANION_KEYWORDS: Record<TravelCompanion, string[]> = {
  '独自': ['独行', '修行', '独自', '探索者', '灵性'],
  '情侣': ['情侣', '蜜月', '浪漫', '恋人'],
  '家庭': ['家庭', '亲子', '全家', '轻松'],
  '朋友': ['冒险', '玩家', '朋友', '好友', '探索'],
};

/**
 * Demo 匹配引擎。
 * 未来替换为 AI 调用：将 preferences 序列化为 prompt，调用 AI API，解析返回的 MatchResult[]。
 */
export function matchDestinations(prefs: SmartPicksPreferences): MatchResult[] {
  const results: MatchResult[] = DESTINATIONS.map((dest) => {
    let score = 0;
    const reasons: string[] = [];

    // 1. 氛围匹配 (0-40)
    if (prefs.style) {
      const styleAtmo = STYLE_ATMOSPHERE[prefs.style] ?? [];
      const matched = styleAtmo.filter((a) => (dest.atmosphere as string[]).includes(a));
      if (matched.length > 0) {
        score += Math.round((matched.length / styleAtmo.length) * 40);
        if (matched.length >= 2) reasons.push('氛围完美契合');
        else reasons.push('氛围部分匹配');
      }
    }

    // 2. 标签匹配 (0-30)
    if (prefs.style) {
      const keywords = STYLE_KEYWORDS[prefs.style] ?? [];
      const allTags = [...(dest.aiTags ?? []), ...dest.atmosphere];
      const tagHits = keywords.filter((kw) =>
        allTags.some((t) => t.includes(kw) || kw.includes(t)),
      );
      score += Math.min(30, tagHits.length * 8);
      if (tagHits.length >= 3) reasons.push('兴趣标签高度匹配');
    }

    // 3. 同行者匹配 (0-20)
    const compWords = COMPANION_KEYWORDS[prefs.companion] ?? [];
    const travelStyle = dest.aiTravelStyle ?? '';
    const compHits = compWords.filter((w) => travelStyle.includes(w));
    score += Math.min(20, compHits.length * 7);
    if (compHits.length >= 2) reasons.push(`${prefs.companion}出行首选`);

    // 4. 节奏匹配 (0-10)
    if (prefs.pace === '慢旅行') {
      if ((dest.atmosphere as string[]).includes('宁静')) { score += 10; reasons.push('慢旅行圣地'); }
    } else if (prefs.pace === '深度探索') {
      if ((dest.atmosphere as string[]).includes('文化') || (dest.atmosphere as string[]).includes('历史')) { score += 10; reasons.push('深度探索之选'); }
    } else {
      if ((dest.atmosphere as string[]).includes('奢华') || (dest.atmosphere as string[]).includes('冒险')) { score += 8; reasons.push('高效体验'); }
    }

    return { destination: dest, score: Math.min(100, score), reasons };
  });

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .filter((r) => r.score > 20);
}

export const DEFAULT_PREFERENCES: SmartPicksPreferences = {
  style: null,
  pace: null,
  budget: '舒适',
  companion: '情侣',
};

export const STYLE_OPTIONS: { value: TravelStyle; label: string; desc: string }[] = [
  { value: '自然', label: '自然', desc: '山川湖海，荒野呼唤' },
  { value: '城市', label: '城市', desc: '天际线与街巷故事' },
  { value: '美食', label: '美食', desc: '用舌尖丈量世界' },
  { value: '文化', label: '文化', desc: '在传统中遇见自己' },
  { value: '冒险', label: '冒险', desc: '走出舒适区，走进荒野' },
];

export const PACE_OPTIONS: { value: TravelPace; label: string; desc: string }[] = [
  { value: '慢旅行', label: '慢旅行', desc: '不赶路，感受路' },
  { value: '深度探索', label: '深度探索', desc: '一个地方，钻进深处' },
  { value: '高效打卡', label: '高效打卡', desc: '有限时间，最多精彩' },
];
