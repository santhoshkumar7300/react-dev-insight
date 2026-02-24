import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { HighlightBox } from "./HighlightBox";
import { subscribeToReRenders, RenderListener } from "../core/tracker";
import { RenderCause } from "../core/renderStore";
import { Dashboard } from "./Dashboard";
import { FloatingToggle } from "./FloatingToggle";

export const OverlayRoot: React.FC = () => {
  const [renders, setRenders] = useState<
    Map<
      object,
      {
        rect: DOMRect;
        count: number;
        changedProps: string[];
        name: string;
        timestamp: number;
        cause: RenderCause;
        isFrequent: boolean;
        sourceRef: object | null;
      }
    >
  >(new Map());

  // Dashboard Stats State
  const [totalRenders, setTotalRenders] = useState(0);
  const [componentStats, setComponentStats] = useState<Record<string, number>>(
    {},
  );

  // UI State
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);
  const [highlightBoxesEnabled, setHighlightBoxesEnabled] = useState(true);
  const [badgesEnabled, setBadgesEnabled] = useState(true);
  const [tracesEnabled, setTracesEnabled] = useState(true);

  useEffect(() => {
    // Inject global styles
    if (typeof document !== "undefined") {
      let style = document.getElementById("react-dev-insight-styles");
      if (!style) {
        style = document.createElement("style");
        style.id = "react-dev-insight-styles";
        style.innerHTML = `
          @keyframes react-dev-insight-pulse {
            0% { transform: scale(0.98); opacity: 0; }
            30% { transform: scale(1.01); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes react-dev-insight-slide-up {
            from { transform: translateY(10px) scale(0.98); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
    }

    const listener: RenderListener = (ref, data) => {
      // Update global stats
      setTotalRenders((prev) => prev + 1);
      setComponentStats((prev) => ({
        ...prev,
        [data.name]: Math.max(data.count, prev[data.name] || 0),
      }));

      if (!data.elementRef) return;

      const rect = data.elementRef.getBoundingClientRect();
      // Only show if it's visible on screen (basic check)
      if (rect.width === 0 && rect.height === 0) return;

      setRenders((prev) => {
        const next = new Map(prev);
        next.set(ref, {
          rect,
          count: data.count,
          changedProps: Object.keys(data.changedProps),
          name: data.name,
          timestamp: data.timestamp,
          cause: data.cause,
          isFrequent: data.isFrequent,
          sourceRef: data.sourceRef,
        });
        return next;
      });
    };

    const unsubscribe = subscribeToReRenders(listener);
    return () => unsubscribe();
  }, []);

  // Cleanup old highlights
  useEffect(() => {
    const interval = setInterval(() => {
      const now = performance.now();
      setRenders((prev) => {
        let changed = false;
        const next = new Map(prev);
        for (const [key, value] of next.entries()) {
          if (now - value.timestamp > 1200) {
            // match 1200ms fade
            next.delete(key);
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const statsList = useMemo(() => {
    return Object.entries(componentStats)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [componentStats]);

  if (typeof document === "undefined") return null;

  const boxes = Array.from(renders.values()).map((r, i) => (
    <HighlightBox
      key={`${r.name}-${i}`} // Use stable index/name keys or better unique IDs
      rect={r.rect}
      count={r.count}
      changedProps={r.changedProps}
      name={r.name}
      cause={r.cause}
      isFrequent={r.isFrequent}
      showHighlight={highlightBoxesEnabled}
      showBadge={badgesEnabled}
    />
  ));

  const svgTraces: React.ReactNode[] = [];
  if (tracesEnabled) {
    const rendersArr = Array.from(renders.entries());
    rendersArr.forEach(([key, r], i) => {
      if (r.sourceRef && renders.has(r.sourceRef)) {
        const sourceRect = renders.get(r.sourceRef)!.rect;
        const targetRect = r.rect;

        // Calculate center points
        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;

        // Draw a bezier curve connecting them
        // Control points are offset vertically to create a smooth arch
        const cx1 = startX;
        const cy1 = startY + (endY - startY) * 0.5;
        const cx2 = endX;
        const cy2 = startY + (endY - startY) * 0.5;

        // Determine if it's an old trace to begin fading it out
        const age = performance.now() - r.timestamp;
        const opacity = Math.max(0, 1 - age / 1200);

        const pathId = `trace-path-${i}`;

        svgTraces.push(
          <g key={pathId} style={{ opacity }}>
            <path
              d={`M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`}
              fill="none"
              stroke="rgba(45, 212, 191, 0.4)" // Teal glow color
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated dot moving along the path */}
            <circle r="3" fill="#2dd4bf">
              <animateMotion
                dur="0.8s"
                repeatCount="1"
                path={`M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`}
                fill="freeze"
              />
            </circle>
          </g>,
        );
      }
    });
  }

  return createPortal(
    <>
      {tracesEnabled && svgTraces.length > 0 && (
        <svg
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 999998,
          }}
        >
          {svgTraces}
        </svg>
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 999999,
        }}
      >
        {boxes}
      </div>

      <div style={{ zIndex: 1000003, position: "fixed", top: 0, left: 0 }}>
        <FloatingToggle
          isOpen={isDashboardVisible}
          onClick={() => setIsDashboardVisible((prev) => !prev)}
        />

        <Dashboard
          isVisible={isDashboardVisible}
          onClose={() => setIsDashboardVisible(false)}
          totalRenders={totalRenders}
          componentStats={statsList}
          highlightBoxesEnabled={highlightBoxesEnabled}
          setHighlightBoxesEnabled={setHighlightBoxesEnabled}
          badgesEnabled={badgesEnabled}
          setBadgesEnabled={setBadgesEnabled}
          tracesEnabled={tracesEnabled}
          setTracesEnabled={setTracesEnabled}
        />
      </div>
    </>,
    document.body,
  );
};
