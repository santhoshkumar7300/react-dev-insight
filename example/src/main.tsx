import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { DevInsightProvider } from "react-dev-insight";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DevInsightProvider>
      <App />
    </DevInsightProvider>
  </StrictMode>,
);
