import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

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
  { key: "decision", label: "Decision", shape: "diamond", w: 150, h: 150 },
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

export default function Palette({ onClearAll }) {
  const { isDarkMode } = useTheme();

  const onDragStart = (e, spec) => {
    e.dataTransfer.setData("application/reactflow", JSON.stringify(spec));
    e.dataTransfer.effectAllowed = "move";
  };

  const containerStyles = {
    width: "20%",
    minWidth: 240,
    padding: 12,
    background: isDarkMode ? "#0f0f0f" : "#ffffff",
    color: isDarkMode ? "#fff" : "#333",
    overflowY: "auto",
    borderRight: `1px solid ${isDarkMode ? "#222" : "#e0e0e0"}`,
  };

  const titleStyles = {
    fontWeight: 700,
    marginBottom: 12,
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "20px", // Increased from 16px to 20px for much better readability
  };

  const itemStyles = {
    padding: "10px 12px",
    border: `1px solid ${isDarkMode ? "#444" : "#ccc"}`,
    borderRadius: 8,
    textAlign: "center",
    cursor: "grab",
    background: isDarkMode ? "#151515" : "#f8f9fa",
    color: isDarkMode ? "#fff" : "#333",
    transition: "all 0.2s ease",
    fontSize: "13px", // Reverted to original size
    fontWeight: "500",
  };

  const clearButtonStyles = {
    width: "100%",
    padding: "10px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    transition: "all 0.2s ease",
    fontSize: "16px", // Increased from 14px to 16px for much better readability
  };

  return (
    <div style={containerStyles}>
      <div style={titleStyles}>Blocks (drag onto canvas)</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((it) => (
          <div
            key={it.key}
            draggable
            onDragStart={(e) => onDragStart(e, it)}
            style={itemStyles}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? "#2a2a2a" : "#e9ecef";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkMode ? "#151515" : "#f8f9fa";
            }}
          >
            {it.label}
          </div>
        ))}
      </div>

      {/* Clear button row */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => onClearAll?.()}
          style={clearButtonStyles}
          onMouseEnter={(e) => {
            e.target.style.background = "#ff3333";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#ff4d4d";
          }}
        >
          Clear Canvas
        </button>
      </div>
    </div>
  );
}
