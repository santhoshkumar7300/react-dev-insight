export type RenderCause = "mount" | "props" | "state/context" | "unknown";

export interface RenderData {
  count: number;
  lastRenderTime: number;
  renderTimings: number[];
  prevProps: Record<string, any>;
  changedProps: Record<string, { oldVal: any; newVal: any }>;
  isClient: boolean;
  elementRef: HTMLElement | null;
  cause: RenderCause;
  isFrequent: boolean;
  sourceRef: object | null;
}

// Global WeakMap to store render data per component instance without memory leaks.
// Keys are the component's internal unique object reference or an instance id.
export const renderStore = new WeakMap<object, RenderData>();

export function getRenderData(key: object): RenderData {
  if (!renderStore.has(key)) {
    renderStore.set(key, {
      count: 0,
      lastRenderTime: 0,
      renderTimings: [],
      prevProps: {},
      changedProps: {},
      isClient: typeof window !== "undefined",
      elementRef: null,
      cause: "mount",
      isFrequent: false,
      sourceRef: null,
    });
  }
  return renderStore.get(key)!;
}

export function updateRenderData(key: object, data: Partial<RenderData>) {
  const existing = getRenderData(key);
  renderStore.set(key, { ...existing, ...data });
}
