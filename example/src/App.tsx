import { useState } from "react";
import { withDevInsight } from "react-dev-insight";

const ChildComponent = withDevInsight(
  ({ count, text }: { count: number; text: string }) => {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #e5e7eb",
          margin: "10px 0",
          borderRadius: "8px",
          background: "#f9fafb",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0" }}>Child Component</h3>
        <p style={{ margin: "5px 0" }}>Count prop: {count}</p>
        <p style={{ margin: "5px 0" }}>Text prop: {text}</p>
      </div>
    );
  },
  "ChildComponent",
);

const SiblingComponent = withDevInsight(() => {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #e5e7eb",
        margin: "10px 0",
        borderRadius: "8px",
        background: "#f9fafb",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>Sibling Component</h3>
      <p style={{ margin: "5px 0" }}>
        I should re-render when App renders because I am not wrapped in
        React.memo.
      </p>
    </div>
  );
}, "SiblingComponent");

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Hello");

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1>React Dev Overlay Test</h1>
      <p style={{ color: "#4b5563", marginBottom: "30px" }}>
        Click the buttons below to trigger state changes. Watch the glow overlay
        and render count badges appear.
      </p>

      <div style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setCount((c) => c + 1)}
          style={{
            padding: "10px 20px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Increment Count State
        </button>
        <button
          onClick={() => setText(text === "Hello" ? "World" : "Hello")}
          style={{
            padding: "10px 20px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Toggle Text State
        </button>
      </div>

      <ChildComponent count={count} text={text} />
      <SiblingComponent />
    </div>
  );
}

export default withDevInsight(App, "AppRoot");
