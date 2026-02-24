import {
  getRenderData,
  renderStore,
  updateRenderData,
  RenderCause,
} from "./renderStore";
import { shallowDiff } from "./diff";

export interface TrackerOptions {
  componentName: string;
}

/**
 * Listener function that receives render metadata broadcasts.
 */
export type RenderListener = (
  componentRef: object,
  data: {
    name: string;
    count: number;
    changedProps: Record<string, { oldVal: any; newVal: any }>;
    timestamp: number;
    elementRef: HTMLElement | null;
    cause: RenderCause;
    isFrequent: boolean;
    sourceRef: object | null;
  },
) => void;

const listeners = new Set<RenderListener>();

/**
 * Subscribes to global render events emitted by the tracker.
 * @returns An unsubscribe function.
 */
export function subscribeToReRenders(listener: RenderListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Map to handle debouncing of notifications
const notifyTimeouts = new WeakMap<object, ReturnType<typeof setTimeout>>();

/**
 * Debounces and notifies all subscribed listeners of a component's render event.
 */
export function notifyListeners(
  ref: object,
  options: TrackerOptions,
  elementRef: HTMLElement | null,
) {
  const data = getRenderData(ref);
  const eventData = {
    name: options.componentName,
    count: data.count,
    changedProps: data.changedProps,
    timestamp: data.lastRenderTime,
    elementRef,
    cause: data.cause,
    isFrequent: data.isFrequent,
    sourceRef: data.sourceRef,
  };

  // Debouncing the broadcast slightly to avoid overwhelming the overlay
  // especially in React 18 concurrent features.
  if (notifyTimeouts.has(ref)) {
    clearTimeout(notifyTimeouts.get(ref)!);
  }

  const timeout = setTimeout(() => {
    listeners.forEach((listener) => listener(ref, eventData));
  }, 16); // ~1 frame

  notifyTimeouts.set(ref, timeout);
}

// Track the immediately preceding render in the current Javascript execution macrotask
// This allows us to map out the render "cascade" tree (e.g. Parent -> Child)
let lastTrackedRender: { ref: object; timestamp: number } | null = null;

/**
 * Synchronously tracks a component render, calculates prop diffs, and computes the cause.
 * Includes protection against React 18 Strict Mode double-invocations.
 */
export function trackRender(
  ref: object,
  props: Record<string, any>,
  options: TrackerOptions,
) {
  if (process.env.NODE_ENV !== "development") return;

  const data = getRenderData(ref);
  const now = performance.now();

  const changedProps = shallowDiff(data.prevProps, props);
  const hasPropChanges = Object.keys(changedProps).length > 0;

  // Mitigation for React 18 Strict Mode double-renders:
  // If no props changed and the render happened within 10ms of the last one,
  // it is almost certainly a strict-mode double invocation. Ignore it.
  if (data.count > 0 && !hasPropChanges && now - data.lastRenderTime < 10) {
    return;
  }

  let cause: RenderCause = "mount";
  if (data.count > 0) {
    cause = hasPropChanges ? "props" : "state/context";
  }

  // Check for rendering cascade (rendered within 5ms of another component)
  let sourceRef: object | null = null;
  if (
    cause === "props" &&
    lastTrackedRender &&
    now - lastTrackedRender.timestamp < 10 &&
    lastTrackedRender.ref !== ref
  ) {
    sourceRef = lastTrackedRender.ref;
  }

  lastTrackedRender = { ref, timestamp: now };

  const newTimings = [...data.renderTimings, now].slice(-10); // Keep last 10

  // Frequent render check: 3 renders within 500ms
  let isFrequent = false;
  if (newTimings.length >= 3) {
    const timeSinceThirdLast = now - newTimings[newTimings.length - 3];
    isFrequent = timeSinceThirdLast < 500;
  }

  // Update state for this component instance
  updateRenderData(ref, {
    count: data.count + 1,
    lastRenderTime: now,
    renderTimings: newTimings,
    prevProps: { ...props },
    changedProps,
    cause,
    isFrequent,
    sourceRef,
  });
}
