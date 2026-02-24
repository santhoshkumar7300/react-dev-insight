import React from "react";
import { useDraggable } from "./useDraggable";

interface FloatingToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export const FloatingToggle: React.FC<FloatingToggleProps> = ({
  onClick,
  isOpen,
}) => {
  const { position, dragRef, onMouseDown, isDragging } = useDraggable({
    x: typeof window !== "undefined" ? window.innerWidth - 80 : 20,
    y: typeof window !== "undefined" ? window.innerHeight - 80 : 20,
  });

  return (
    <div
      ref={dragRef}
      onMouseDown={onMouseDown}
      onClick={() => {
        if (!isDragging) onClick();
      }}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "rgba(10, 10, 10, 0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: isOpen
          ? "0 0 16px rgba(255, 255, 255, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.05)"
          : "0 4px 12px rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: 1000005,
        transition: isDragging
          ? "none"
          : "box-shadow 0.3s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        color: "#e2e8f0",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
        }}
      >
        <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    </div>
  );
};
