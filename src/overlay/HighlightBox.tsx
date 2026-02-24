import React, { useEffect, useState } from "react";
import { RenderBadge } from "./RenderBadge";
import { RenderCause } from "../core/renderStore";

export interface HighlightBoxProps {
  rect: DOMRect;
  count: number;
  changedProps: string[];
  name: string;
  cause: RenderCause;
  isFrequent: boolean;
  showHighlight?: boolean;
  showBadge?: boolean;
}

export const HighlightBox: React.FC<HighlightBoxProps> = ({
  rect,
  count,
  changedProps,
  name,
  cause,
  isFrequent,
  showHighlight = true,
  showBadge = true,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1200); // 1.2s fade out
    return () => clearTimeout(timer);
  }, [count]);

  if (!visible) return null;
  if (!showHighlight && !showBadge) return null;

  // Minimal aesthetic colors (Subtle cyan vs muted red)
  const borderColor = isFrequent
    ? "rgba(248, 113, 113, 0.4)" // Red-400
    : "rgba(45, 212, 191, 0.4)"; // Teal-400

  const glowColor = isFrequent
    ? "rgba(248, 113, 113, 0.15)"
    : "rgba(45, 212, 191, 0.15)";

  return (
    <div
      style={{
        position: "absolute",
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        pointerEvents: "none",
        zIndex: 1000000,
        border: showHighlight ? `1px solid ${borderColor}` : "none",
        borderRadius: "4px",
        boxShadow: showHighlight
          ? `0 0 12px ${glowColor}, inset 0 0 8px ${glowColor}`
          : "none",
        background: showHighlight ? "rgba(255, 255, 255, 0.02)" : "transparent",
        transition: "opacity 0.2s ease-out",
        animation: showHighlight
          ? "react-dev-insight-pulse 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          : "none",
      }}
    >
      {showBadge && <RenderBadge count={count} />}

      {showHighlight && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            marginTop: "6px",
            left: 0,
            background: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#e2e8f0",
            fontSize: "11px",
            padding: "8px 10px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            fontFamily: "system-ui, -apple-system, sans-serif",
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
            zIndex: 1000002,
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: "#f8fafc",
              marginBottom: "3px",
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span style={{ color: "#64748b" }}>Cause:</span>
            <span style={{ color: "#e2e8f0" }}>{cause}</span>
          </div>

          {changedProps.length > 0 && (
            <div style={{ marginTop: "3px", display: "flex", gap: "6px" }}>
              <span style={{ color: "#64748b" }}>Props:</span>
              <span style={{ color: "#cbd5e1" }}>
                {changedProps.join(", ")}
              </span>
            </div>
          )}

          {isFrequent && (
            <div
              style={{
                marginTop: "6px",
                color: "#f87171",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#f87171",
                  boxShadow: "0 0 4px #f87171",
                }}
              />
              Frequent
            </div>
          )}
        </div>
      )}
    </div>
  );
};
