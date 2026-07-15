/**
 * AI Provider — 可替换的 AI 服务抽象层
 *
 * 设计原则：
 * - 统一的 generateTrip() 接口，所有 provider 实现相同的签名
 * - 调用方不关心底层是 Claude、GPT 还是 Demo 模式
 * - 通过环境变量 VITE_AI_PROVIDER 切换实现
 * - onStep 回调用于向 UI 报告生成进度（thinking 动画的文字阶段）
 * - AbortSignal 支持取消正在进行的生成
 *
 * 未来接入真实 API 只需：
 *   1. 实现 createAnthropicProvider() / createOpenAIProvider() 等函数
 *   2. 在 createAIProvider() 的 switch 中添加对应分支
 *   3. 设置 VITE_AI_PROVIDER 环境变量
 * 接口无需任何改动。
 */

import type { Destination, ItineraryDay } from '../data/destinations';
import type { PersonaKey } from '../data/demo-itineraries';

/* ══════════════════════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════════════════════ */

export type Budget = '经济' | '舒适' | '奢华';
export type Companion = '独自' | '情侣' | '家庭' | '朋友';
export type AIProviderType = 'demo' | 'anthropic' | 'openai' | 'gemini';

export interface TripPreferences {
  destinationId: string;
  days: number;
  styles: string[];
  budget: Budget;
  companions: Companion;
  specialRequests: string;
}

export interface TripResult {
  title: string;
  overview: string;
  itinerary: ItineraryDay[];
}

export interface GenerationStep {
  message: string;
}

/**
 * 统一的 AI Provider 接口。
 *
 * 所有 provider（demo / anthropic / openai / gemini）共享此签名。
 * 调用方只依赖此接口，不关心具体实现。
 */
export interface AIProvider {
  readonly name: AIProviderType;

  /**
   * 生成个性化行程。
   *
   * @param preferences  — 用户在偏好表单中填写的所有选项
   * @param destination  — 当前目的地的完整数据
   * @param onStep       — 可选回调，在生成阶段变化时触发
   * @param signal       — 可选 AbortSignal，用于取消正在进行的生成
   * @returns             — 结构化的行程结果，可直接传给 ItinerarySection
   */
  generateTrip(
    preferences: TripPreferences,
    destination: Destination,
    onStep?: (step: GenerationStep) => void,
    signal?: AbortSignal,
  ): Promise<TripResult>;
}

/* ══════════════════════════════════════════════════════════════
   Typed Errors — 调用方可以按类型处理不同的失败场景
   ══════════════════════════════════════════════════════════════ */

export class AITimeoutError extends Error {
  constructor(message = 'AI 请求超时，请检查网络后重试') {
    super(message);
    this.name = 'AITimeoutError';
  }
}

export class AIAbortError extends Error {
  constructor(message = '生成已取消') {
    super(message);
    this.name = 'AIAbortError';
  }
}

export class AIValidationError extends Error {
  rawResponse?: unknown;

  constructor(message: string, rawResponse?: unknown) {
    super(message);
    this.name = 'AIValidationError';
    this.rawResponse = rawResponse;
  }
}

export class AIProviderError extends Error {
  providerName: string;
  statusCode?: number;

  constructor(message: string, providerName: string, statusCode?: number) {
    super(message);
    this.name = 'AIProviderError';
    this.providerName = providerName;
    this.statusCode = statusCode;
  }
}

/* ══════════════════════════════════════════════════════════════
   Response Validation
   ══════════════════════════════════════════════════════════════ */

const VALID_ITEM_TYPES = new Set(['活动', '餐饮', '休息', '交通', '住宿']);

/**
 * 校验 AI 返回的行程数据。
 * 真实 API 返回的 JSON 可能格式错误、字段缺失、类型不匹配。
 * 此函数在校验失败时抛出 AIValidationError，由调用方决定降级策略。
 */
export function validateTripResult(data: unknown): TripResult {
  if (!data || typeof data !== 'object') {
    throw new AIValidationError('AI 返回数据不是有效的对象', data);
  }

  const obj = data as Record<string, unknown>;

  if (typeof obj.title !== 'string' || obj.title.trim().length === 0) {
    throw new AIValidationError('行程缺少 title 字段', data);
  }
  if (typeof obj.overview !== 'string') {
    throw new AIValidationError('行程缺少 overview 字段', data);
  }
  if (!Array.isArray(obj.itinerary)) {
    throw new AIValidationError('行程缺少 itinerary 数组', data);
  }

  for (let d = 0; d < obj.itinerary.length; d++) {
    const day = obj.itinerary[d] as Record<string, unknown>;
    if (typeof day.day !== 'number' || !Array.isArray(day.items)) {
      throw new AIValidationError(
        `行程第 ${d + 1} 天数据格式错误`,
        data,
      );
    }
    for (let i = 0; i < day.items.length; i++) {
      const item = day.items[i] as Record<string, unknown>;
      if (typeof item.time !== 'string') {
        throw new AIValidationError(
          `第 ${d + 1} 天第 ${i + 1} 项缺少 time`,
          data,
        );
      }
      if (typeof item.title !== 'string') {
        throw new AIValidationError(
          `第 ${d + 1} 天第 ${i + 1} 项缺少 title`,
          data,
        );
      }
      if (
        typeof item.type !== 'string' ||
        !VALID_ITEM_TYPES.has(item.type)
      ) {
        throw new AIValidationError(
          `第 ${d + 1} 天第 ${i + 1} 项的 type "${String(item.type)}" 不合法（允许：${[...VALID_ITEM_TYPES].join(', ')}）`,
          data,
        );
      }
    }
  }

  return data as TripResult;
}

/* ══════════════════════════════════════════════════════════════
   Helpers
   ══════════════════════════════════════════════════════════════ */

/** 支持 AbortSignal 的 sleep — 被 abort 时抛出 AIAbortError */
async function cancellableSleep(
  ms: number,
  signal?: AbortSignal,
): Promise<void> {
  if (signal?.aborted) throw new AIAbortError();

  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new AIAbortError());
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

function personaKey(prefs: TripPreferences): string {
  const map: Record<Companion, string> = {
    '情侣': 'couple',
    '家庭': 'family',
    '独自': 'solo',
    '朋友': 'friends',
  };
  return map[prefs.companions] || 'default';
}

/* ══════════════════════════════════════════════════════════════
   Demo Provider
   ══════════════════════════════════════════════════════════════ */

function createDemoProvider(): AIProvider {
  return {
    name: 'demo',

    async generateTrip(prefs, destination, onStep, signal) {
      const steps = [
        `正在分析${destination.title}的 ${destination.attractions.length} 个景点数据…`,
        `正在匹配「${prefs.styles.slice(0, 2).join('、')}」相关的活动与体验…`,
        `正在根据${prefs.days}天的时间窗口优化路线顺序…`,
        `正在调整行程节奏，确保每天有呼吸感…`,
      ];

      for (let i = 0; i < steps.length; i++) {
        // 每一步前检查是否已取消
        if (signal?.aborted) throw new AIAbortError();
        onStep?.({ message: steps[i] });
        await cancellableSleep(700 + Math.random() * 400, signal);
      }

      // 动态加载 demo 数据（触发 Vite 代码分割）
      const { DEMO_ITINERARIES } = await import(
        '../data/demo-itineraries'
      );

      const key = personaKey(prefs) as PersonaKey;
      const destData = DEMO_ITINERARIES[prefs.destinationId];
      const demo = destData?.[key] ?? destData?.default;

      if (!demo) {
        throw new AIProviderError(
          `没有找到目的地 "${prefs.destinationId}" 的 demo 行程数据`,
          'demo',
        );
      }

      // 浅度个性化
      const result: TripResult = {
        ...demo,
        title: demo.title.replace(
          /·.+$/,
          `·${prefs.styles[0] || '探索'}之旅`,
        ),
        overview: demo.overview,
      };

      // Demo 数据也需要通过校验（自检）
      return validateTripResult(result);
    },
  };
}

/* ══════════════════════════════════════════════════════════════
   Provider Factory
   ══════════════════════════════════════════════════════════════ */

export function createAIProvider(type: AIProviderType): AIProvider {
  switch (type) {
    case 'demo':
      return createDemoProvider();
    case 'anthropic':
      throw new AIProviderError(
        'Anthropic provider — 待 Phase 4 Step 5 实现',
        'anthropic',
      );
    case 'openai':
      throw new AIProviderError(
        'OpenAI provider — 待后续实现',
        'openai',
      );
    case 'gemini':
      throw new AIProviderError(
        'Gemini provider — 待后续实现',
        'gemini',
      );
    default:
      return createDemoProvider();
  }
}

/* ══════════════════════════════════════════════════════════════
   AIClient — 面向调用方的薄封装
   ══════════════════════════════════════════════════════════════ */

export interface AIClientOptions {
  /** 超时时间（毫秒），默认 30 秒 */
  timeoutMs: number;
  /** 失败后最大重试次数，默认 0（不重试） */
  maxRetries: number;
}

const DEFAULT_OPTIONS: AIClientOptions = {
  timeoutMs: 30_000,
  maxRetries: 0,
};

/**
 * AIClient 在 AIProvider 之上增加了超时和重试逻辑。
 * 组件通过此客户端调用 AI，不需要各自处理超时/重试。
 */
export class AIClient {
  private provider: AIProvider;
  private options: AIClientOptions;

  constructor(
    provider: AIProvider,
    options: Partial<AIClientOptions> = {},
  ) {
    this.provider = provider;
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /** 带超时和重试的行程生成 */
  async generateTrip(
    preferences: TripPreferences,
    destination: Destination,
    onStep?: (step: GenerationStep) => void,
    signal?: AbortSignal,
  ): Promise<TripResult> {
    let lastError: Error | null = null;
    const attempts = 1 + this.options.maxRetries;

    for (let attempt = 0; attempt < attempts; attempt++) {
      // 重试时跳过 AbortError（用户主动取消不需要重试）
      if (lastError instanceof AIAbortError) throw lastError;

      try {
        const result = await this.withTimeout(
          this.provider.generateTrip(
            preferences,
            destination,
            onStep,
            signal,
          ),
          this.options.timeoutMs,
          signal,
        );

        // 校验返回数据
        return validateTripResult(result);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        // 这些错误不重试
        if (
          lastError instanceof AIAbortError ||
          lastError instanceof AIValidationError ||
          attempt === attempts - 1
        ) {
          throw lastError;
        }

        // 重试前短暂等待
        await cancellableSleep(1000 * (attempt + 1), signal);
      }
    }

    // 理论上不会到这里（循环中最后一次会 throw）
    throw lastError ?? new AIProviderError('未知错误', this.provider.name);
  }

  /** 带超时的 Promise 包装 */
  private async withTimeout<T>(
    promise: Promise<T>,
    ms: number,
    signal?: AbortSignal,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new AITimeoutError()),
        ms,
      );

      const onAbort = () => {
        clearTimeout(timer);
        reject(new AIAbortError());
      };
      signal?.addEventListener('abort', onAbort, { once: true });

      promise
        .then((value) => {
          clearTimeout(timer);
          signal?.removeEventListener('abort', onAbort);
          resolve(value);
        })
        .catch((err) => {
          clearTimeout(timer);
          signal?.removeEventListener('abort', onAbort);
          reject(err);
        });
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   Singleton
   ══════════════════════════════════════════════════════════════ */

const configuredProvider = createAIProvider(
  (import.meta.env.VITE_AI_PROVIDER as AIProviderType | undefined) || 'demo',
);

/** 应用全局 AI 客户端实例 */
export const aiClient = new AIClient(configuredProvider, {
  timeoutMs: 30_000,
  maxRetries: 1, // demo 模式下可重试一次（模拟不稳定网络）
});
