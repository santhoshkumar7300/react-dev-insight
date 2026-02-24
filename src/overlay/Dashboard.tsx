import React from "react";
import { useDraggable } from "./useDraggable";

interface DashboardProps {
  isVisible: boolean;
  onClose: () => void;
  totalRenders: number;
  highlightBoxesEnabled: boolean;
  setHighlightBoxesEnabled: (val: boolean) => void;
  badgesEnabled: boolean;
  setBadgesEnabled: (val: boolean) => void;
  tracesEnabled: boolean;
  setTracesEnabled: (val: boolean) => void;
  componentStats: Array<{ name: string; count: number }>;
}

export const Dashboard: React.FC<DashboardProps> = ({
  isVisible,
  onClose,
  totalRenders,
  highlightBoxesEnabled,
  setHighlightBoxesEnabled,
  badgesEnabled,
  setBadgesEnabled,
  tracesEnabled,
  setTracesEnabled,
  componentStats,
}) => {
  const { position, dragRef, onMouseDown } = useDraggable({
    x: typeof window !== "undefined" ? window.innerWidth - 300 : 20,
    y: typeof window !== "undefined" ? window.innerHeight - 380 : 20,
  });

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "260px",
        maxHeight: "380px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        background: "rgba(10, 10, 10, 0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow:
          "0 10px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        zIndex: 1000004,
        color: "#e2e8f0",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        animation:
          "react-dev-insight-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Header (Draggable Area) */}
      <div
        ref={dragRef}
        onMouseDown={onMouseDown}
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "grab",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#f8fafc",
              boxShadow: "0 0 8px rgba(255,255,255,0.8)",
            }}
          />
          <span
            style={{
              fontWeight: 500,
              fontSize: "12px",
              letterSpacing: "0.04em",
              color: "#f8fafc",
            }}
          >
            Dev Overlay
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#64748b",
            cursor: "pointer",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#e2e8f0")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: "16px", overflowY: "auto" }}>
        {/* Performance Overview */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "10px",
              color: "#64748b",
              textTransform: "uppercase",
              marginBottom: "8px",
              letterSpacing: "0.06em",
            }}
          >
            Performance
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13px", color: "#cbd5e1" }}>
              Total Renders
            </span>
            <span
              style={{ fontSize: "15px", fontWeight: 600, color: "#f8fafc" }}
            >
              {totalRenders}
            </span>
          </div>
        </div>

        {/* Toggles */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "10px",
              color: "#64748b",
              textTransform: "uppercase",
              marginBottom: "8px",
              letterSpacing: "0.06em",
            }}
          >
            Settings
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
                cursor: "pointer",
                color: "#cbd5e1",
              }}
            >
              <span>Highlight Boxes</span>
              <input
                type="checkbox"
                checked={highlightBoxesEnabled}
                onChange={(e) => setHighlightBoxesEnabled(e.target.checked)}
                style={{
                  accentColor: "#475569",
                  width: "14px",
                  height: "14px",
                  cursor: "pointer",
                }}
              />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
                cursor: "pointer",
                color: "#cbd5e1",
              }}
            >
              <span>Render Badges</span>
              <input
                type="checkbox"
                checked={badgesEnabled}
                onChange={(e) => setBadgesEnabled(e.target.checked)}
                style={{
                  accentColor: "#475569",
                  width: "14px",
                  height: "14px",
                  cursor: "pointer",
                }}
              />
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
                cursor: "pointer",
                color: "#cbd5e1",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span>Render Traces</span>
                <span
                  style={{
                    fontSize: "9px",
                    padding: "2px 4px",
                    background: "rgba(45, 212, 191, 0.2)",
                    color: "#2dd4bf",
                    borderRadius: "4px",
                  }}
                >
                  NEW
                </span>
              </div>
              <input
                type="checkbox"
                checked={tracesEnabled}
                onChange={(e) => setTracesEnabled(e.target.checked)}
                style={{
                  accentColor: "#475569",
                  width: "14px",
                  height: "14px",
                  cursor: "pointer",
                }}
              />
            </label>
          </div>
        </div>

        {/* Top Components list */}
        <div>
          <div
            style={{
              fontSize: "10px",
              color: "#64748b",
              textTransform: "uppercase",
              marginBottom: "8px",
              letterSpacing: "0.06em",
            }}
          >
            Most Re-rendered
          </div>
          {componentStats.length === 0 ? (
            <div
              style={{
                fontSize: "12px",
                color: "#475569",
                fontStyle: "italic",
              }}
            >
              No tracking data.
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {componentStats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      color: "#94a3b8",
                    }}
                  >
                    {stat.name}
                  </span>
                  <span
                    style={{
                      color: "#e2e8f0",
                      fontWeight: 500,
                      background: "rgba(255,255,255,0.05)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
