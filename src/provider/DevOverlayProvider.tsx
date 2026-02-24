import React from "react";
import { OverlayRoot } from "../overlay";

/**
 * The top-level provider for the React Dev Overlay.
 * Wrap your root application component in this to initialize the global overlay dashboard.
 * In production builds, this component strips away overhead and simply renders `children`.
 */
export const DevInsightProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (process.env.NODE_ENV !== "development") {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <OverlayRoot />
    </>
  );
};
