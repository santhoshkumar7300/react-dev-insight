import React from "react";

interface RenderBadgeProps {
  count: number;
}

export const RenderBadge: React.FC<RenderBadgeProps> = ({ count }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: -10,
        right: -10,
        backgroundColor: "rgba(10, 10, 10, 0.75)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "10px",
        padding: "2px 8px",
        color: "#f1f5f9",
        fontSize: "11px",
        fontWeight: 600,
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        zIndex: 1000001,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "16px",
      }}
    >
      <span style={{ textShadow: "0 0 8px rgba(255,255,255,0.3)" }}>
        {count}
      </span>
    </div>
  );
};
