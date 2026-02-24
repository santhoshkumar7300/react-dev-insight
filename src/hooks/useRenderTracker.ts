import { useEffect, useRef } from "react";
import { trackRender, notifyListeners } from "../core/tracker";

/**
 * A hook to explicitly track a component's renders.
 * Use this inside a component by attaching the returned ref to its outermost DOM element.
 *
 * @param componentName The name of the component for logging.
 * @param props The props of the component to diff against.
 * @returns A React ref object to attach to the root DOM node of the component.
 */
export function useRenderTracker<T extends HTMLElement>(
  componentName: string,
  props: Record<string, any>,
) {
  const ref = useRef<T>(null);
  const internalKey = useRef({}); // Unique object reference per instance

  if (process.env.NODE_ENV !== "development") {
    // In production, return an empty ref to allow full tree-shaking dead code elimination
    return ref;
  }

  useEffect(() => {
    // We notify right after render completes
    notifyListeners(internalKey.current, { componentName }, ref.current);
  });

  // Track render (synchronously during render phase)
  trackRender(internalKey.current, props, { componentName });

  return ref;
}
