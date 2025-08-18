import React from "react";

const items = [
  {
    key: "start",
    label: "Start",
    shape: "circle",
    w: 100,
    h: 100,
    radius: "50%",
  },
  { key: "end", label: "End", shape: "circle", w: 100, h: 100, radius: "50%" },
  { key: "decision", label: "Decision", shape: "diamond", w: 120, h: 120 },
  { key: "llm", label: "LLM", shape: "rect", w: 180, h: 60, radius: "8px" },
  {
    key: "speak",
    label: "Speak (TTS)",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "listen",
    label: "Listen (STT)",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "memory_read",
    label: "Memory: Read",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "memory_write",
    label: "Memory: Write",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "webhook",
    label: "Webhook",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "rag",
    label: "RAG Query",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "calendar",
    label: "Calendar",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  { key: "sms", label: "SMS", shape: "rect", w: 180, h: 60, radius: "8px" },
  {
    key: "transfer_cold",
    label: "Transfer: Cold",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "transfer_warm",
    label: "Transfer: Warm",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
  {
    key: "summarize",
    label: "Summarize",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
];

export default function Palette() {
  const onDragStart = (e, spec) => {
    e.dataTransfer.setData("application/reactflow", JSON.stringify(spec));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      style={{
        width: "20%",
        minWidth: 240,
        padding: 12,
        background: "#0f0f0f",
        color: "#fff",
        overflowY: "auto",
        borderRight: "1px solid #222",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 12 }}>
        Blocks (drag onto canvas)
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((it) => (
          <div
            key={it.key}
            draggable
            onDragStart={(e) => onDragStart(e, it)}
            style={{
              padding: "10px 12px",
              border: "1px solid #444",
              borderRadius: 8,
              textAlign: "center",
              cursor: "grab",
              background: "#151515",
            }}
          >
            {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}
