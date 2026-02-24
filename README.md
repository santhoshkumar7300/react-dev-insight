<div align="center">
  <img src="https://raw.githubusercontent.com/santhoshkumar7300/react-dev-insight/main/assets/main-demo.gif" alt="React Dev Insight Demo" width="100%" />
  
  <br/>
  
  <h1>✨ React Dev Insight</h1>
  
  <p>
    <strong>A lightning-fast, zero-overhead developer experience plugin for React.</strong>
  </p>

  <p>
    <a href="https://www.npmjs.com/package/react-dev-insight"><img src="https://img.shields.io/npm/v/react-dev-insight?style=flat-square&color=2dd4bf" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/package/react-dev-insight"><img src="https://img.shields.io/npm/dm/react-dev-insight?style=flat-square&color=6366f1" alt="NPM Downloads" /></a>
    <a href="https://github.com/santhoshkumar7300/react-dev-insight/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-dev-insight?style=flat-square&color=ec4899" alt="License" /></a>
    <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript Support" />
  </p>
</div>

<br/>

> **Stop guessing why your React app feels slow.**
>
> `react-dev-insight` is a lightweight, strictly development-only plugin that actively visualizes component rendering behavior right in your browser. Framed within a stunning modern glassmorphism UI, it transforms performance debugging from a terminal-diving chore into an intuitive, visual joy.

---

<br/>

## 🌟 Why React Dev Insight?

React performance debugging usually means reading through console logs or clicking through complex flame graphs. We built **React Dev Insight** to bring the insights directly to your UI.

It runs passively while you build, instantly flagging anomalies, tracking render counts, and drawing the exact physical prop-drilling paths right on your screen.

<br/>

### Core Features

- **💥 Visual Render Highlights:** See exactly _what_ renders and _when_ it renders with sleek, animated glowing boundaries.
- **� The Cascade Trace (NEW):** Visually map out parent-to-child render cascading via glowing SVG bezier curves in real-time. Literally watch the chain reaction.
- **🔍 Prop Diff Tooltips:** Hover over a highlight to instantly see the exact prop mutations that triggered the cycle.
- **🚨 Thrash Detection:** Automatically flags components caught in frequent render loops (e.g., 3+ renders in <500ms) with a warning glow.
- **🎛️ Glassmorphism Dashboard:** A beautiful, draggable floating control panel summarizing global render metrics and top offenders.
- **🚀 Zero Production Bloat:** Aggressively tree-shakeable. In `NODE_ENV === 'production'`, it compiles down to absolutely nothing. Zero DOM bloat, zero overhead.

<br/>

---

<br/>

## 📸 See It In Action

<div align="center">
  <table>
    <tr>
      <td align="center">
        <strong>Re-render Highlights</strong><br/><br/>
        <img src="https://raw.githubusercontent.com/santhoshkumar7300/react-dev-insight/main/assets/rerender.gif" alt="Re-render Highlight" width="400"/>
      </td>
      <td align="center">
        <strong>Render Badges</strong><br/><br/>
        <img src="https://raw.githubusercontent.com/santhoshkumar7300/react-dev-insight/main/assets/badge.gif" alt="Render Badge" width="400"/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <br/><strong>Prop Diff Tooltip</strong><br/><br/>
        <img src="https://raw.githubusercontent.com/santhoshkumar7300/react-dev-insight/main/assets/tooltip.gif" alt="Prop Diff Tooltip" width="400"/>
      </td>
      <td align="center">
        <br/><strong>Mini Dashboard</strong><br/><br/>
        <img src="https://raw.githubusercontent.com/santhoshkumar7300/react-dev-insight/main/assets/dashboard.gif" alt="Mini Dashboard" width="400"/>
      </td>
    </tr>
  </table>
</div>

<br/>

---

<br/>

## 📦 Installation

```bash
npm install react-dev-insight --save-dev
```

_(Also supports `yarn add -D` and `pnpm add -D`)_

<br/>

---

<br/>

## 🛠️ Usage

### 1. The Global Provider

Wrap your application root inside the `DevInsightProvider`.

_Note: In production builds, this provider returns your `children` directly, causing zero performance or DOM overhead._

```tsx
import { DevInsightProvider } from "react-dev-insight";

function App() {
  return (
    <DevInsightProvider>
      <YourApp />
    </DevInsightProvider>
  );
}
```

### 2. Tracking Components

**Method A: `withDevInsight` HOC (Easiest)**

Wrap any component to instantly track its render behavior.

```tsx
import React from "react";
import { withDevInsight } from "react-dev-insight";

const DashboardWidget = ({ data }) => {
  return (
    <div className="card">
      <h3>{data.title}</h3>
    </div>
  );
};

// Optionally pass a custom display name for the dashboard leaderboard
export default withDevInsight(DashboardWidget, "DashboardWidget");
```

**Method B: `useRenderTracker` Hook (Advanced)**

For precise control, attach the returned `ref` to the outermost DOM element of your component.

```tsx
import React from "react";
import { useRenderTracker } from "react-dev-insight";

export const SettingsPanel = (props) => {
  // Pass the component name, and the props to diff against
  const ref = useRenderTracker<HTMLDivElement>("SettingsPanel", props);

  return (
    <div ref={ref} className="settings-container">
      <h1>Settings</h1>
    </div>
  );
};
```

<br/>

---

<br/>

## 🧠 Performance Philosophy

**"Do no harm."**

Debugging tools shouldn't distort the very performance benchmarks they are trying to measure. `react-dev-insight` uses a completely decoupled architecture to ensure your app stays fast:

1.  **O(1) Interception:** It intercepts props and state using ultra-fast shallow diffing and stores them in a memory-safe `WeakMap` to prevent memory leaks.
2.  **Asynchronous Rendering:** The visual overlays are rendered in a topmost React `<Portal>` bound directly to `document.body`. We **never** pollute your application's DOM hierarchy with wrapper `div`s that break Grid or Flexbox layouts.
3.  **Pure CSS Animations:** The glowing highlights and bounding boxes use hardware-accelerated CSS `transform` and `opacity` properties, offloading the work to the GPU and preventing main-thread blocking.

<br/>

---

<br/>

## 🆚 Comparisons

### vs. `why-did-you-render`

`why-did-you-render` is fantastic, but it forces you to dig through terminal logs to understand what happened. **React Dev Insight is a visual-first tool.** It brings the insights directly to your UI, making it instantly obvious which parts of your screen are thrashing.

### vs. React DevTools Profiler

The official Profiler is unmatched for deep-dive microscopic analysis. However, it requires you to actively record, click through flame graphs, and parse milliseconds. **React Dev Insight is passive and ambient.** Leave it running while you build, and it intuitively flags anomalies in real-time.

<br/>

---

<br/>

## 📚 API Reference

### `<DevInsightProvider />`

The outermost wrapper required to mount the visual overlay portal.

- **Props:** `{ children: ReactNode }`

### `withDevInsight(Component, [name])`

A Higher-Order Component to track a specific React component.

- **`Component`**: The React component to wrap.
- **`name`** _(Optional)_: A string to identify the component in the dashboard. Defaults to the component's display name.

### `useRenderTracker(name, props)`

A hook for fine-grained tracking control.

- **`name`**: String identifier for the component.
- **`props`**: The component's props object (used for diffing).
- **Returns**: A `React.RefObject` that _must_ be attached to the component's root DOM node.

<br/>

---

<br/>

## 🗺️ Roadmap

- [ ] Support for tracking pure Context Consumer updates (bypassing props).
- [ ] Integration with Next.js App Router RSCs (Client Boundaries).
- [ ] Customizable theme injection (Dark/Light mode overriding).
- [ ] Export render data to JSON format.

<br/>

---

<br/>

## 🤝 Contributing

We welcome community contributions! Please read our [Contributing Guidelines](https://github.com/santhoshkumar7300/react-dev-insight/blob/main/CONTRIBUTING.md) to get started.

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: added something amazing'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

<br/>

---

<br/>

## ❓ FAQ

**Q: Will this slow down my production app?**
A: **No.** The entire library is wrapped in strict `process.env.NODE_ENV !== 'production'` checks. When you run your production build, modern bundlers (Webpack, Vite, Rollup) will completely dead-code-eliminate the package.

**Q: Why does the highlight box look misaligned?**
A: Ensure you are attaching the `useRenderTracker` ref to the _outermost_ DOM element of your component. Text nodes or React Fragments without a physical bounding box cannot be traced visually.

**Q: Does it support React 18 Concurrent Mode?**
A: Yes! It includes specific debouncing logic to ignore Strict Mode double-invocations so your render counts remain perfectly accurate.

<br/>

---

<br/>

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <br/>
  Built with ❤️ for the React ecosystem.
</div>
