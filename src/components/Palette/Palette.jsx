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
  {
    key: "ai_agent",
    label: "AI Agent",
    shape: "rect",
    w: 180,
    h: 60,
    radius: "8px",
  },
];

export default function Palette({ onClearAll, searchTerm = "" }) {
  const { isDarkMode } = useTheme();

  // Filter items based on search term (trim extra spaces)
  const filteredItems = items.filter((item) => {
    const cleanSearchTerm = searchTerm.trim().toLowerCase();
    const cleanItemLabel = item.label.trim().toLowerCase();
    return cleanItemLabel.includes(cleanSearchTerm);
  });

  const onDragStart = (e, spec) => {
    e.dataTransfer.setData("application/reactflow", JSON.stringify(spec));
    e.dataTransfer.effectAllowed = "move";
  };

  const containerStyles = {
    width: "100%",
    padding: 12,
    background: isDarkMode ? "#0f0f0f" : "#ffffff",
    color: isDarkMode ? "#fff" : "#333",
    border: `1px solid ${isDarkMode ? "#222" : "#e0e0e0"}`,
    borderRadius: "8px",
    marginBottom: "16px",
  };

  const titleStyles = {
    fontWeight: 700,
    marginBottom: 16,
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "18px",
    textAlign: "center",
    padding: "8px 0",
    borderBottom: `2px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
  };

  const itemStyles = {
    padding: "12px 16px",
    border: `2px solid ${isDarkMode ? "#444" : "#e0e0e0"}`,
    borderRadius: "8px",
    textAlign: "center",
    cursor: "grab",
    background: isDarkMode ? "#151515" : "#f8f9fa",
    color: isDarkMode ? "#fff" : "#333",
    transition: "all 0.3s ease",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const clearButtonStyles = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #ff4d4d 0%, #ff3333 100%)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    fontSize: "16px",
    boxShadow: "0 4px 8px rgba(255, 77, 77, 0.3)",
  };

  const noResultsStyles = {
    textAlign: "center",
    padding: "20px",
    color: isDarkMode ? "#9ca3af" : "#666",
    fontSize: "14px",
    fontStyle: "italic",
  };

  return (
    <div style={containerStyles}>
      <div style={titleStyles}>
        Workflow Blocks
        {searchTerm && (
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              marginTop: "4px",
              color: isDarkMode ? "#9ca3af" : "#666",
            }}
          >
            Showing {filteredItems.length} of {items.length} blocks
          </div>
        )}
      </div>

      {filteredItems.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
          {filteredItems.map((it) => (
            <div
              key={it.key}
              draggable
              onDragStart={(e) => onDragStart(e, it)}
              style={itemStyles}
              onMouseEnter={(e) => {
                e.target.style.background = isDarkMode ? "#2a2a2a" : "#e9ecef";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                e.target.style.borderColor = isDarkMode ? "#10b981" : "#10b981";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = isDarkMode ? "#151515" : "#f8f9fa";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                e.target.style.borderColor = isDarkMode ? "#444" : "#e0e0e0";
              }}
            >
              {it.label}
            </div>
          ))}
        </div>
      ) : (
        <div style={noResultsStyles}>
          No workflow blocks found matching "{searchTerm.trim()}"
        </div>
      )}

      {/* Clear button row */}
      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => onClearAll?.()}
          style={clearButtonStyles}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 12px rgba(255, 77, 77, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 8px rgba(255, 77, 77, 0.3)";
          }}
        >
          🗑️ Clear Canvas
        </button>
      </div>
    </div>
  );
}
