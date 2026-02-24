import React, { forwardRef } from "react";
import { useRenderTracker } from "../hooks/useRenderTracker";

/**
 * A Higher-Order Component (HOC) that wraps standard React components to track their renders.
 * In production builds, this HOC is stripped away entirely, returning the original unmodified component.
 *
 * @param WrappedComponent The React component to track.
 * @param componentName Optional explicit name for the component in the overlay dashboard.
 * @returns The wrapped component configured for dev overlay insights.
 */
export function withDevInsight<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string,
) {
  if (process.env.NODE_ENV !== "development") {
    return WrappedComponent;
  }

  const name =
    componentName ||
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "Component";

  const WithDevInsight = forwardRef<HTMLElement, P>((props, ref) => {
    // We wrap the component in a purely logic-bound display: contents div
    // This allows us to track bounding boxes without polluting the DOM hierarchy styling
    const trackerRef = useRenderTracker<HTMLDivElement>(name, props);

    return (
      <div
        ref={trackerRef}
        style={{ display: "contents" }}
        data-dev-overlay-tracker={name}
      >
        <WrappedComponent {...(props as any)} />
      </div>
    );
  });

  WithDevInsight.displayName = `withDevInsight(${name})`;

  return WithDevInsight;
}
