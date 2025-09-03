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

  return (
    <div
      className={`w-full p-3 rounded-lg border mb-4 ${
        isDarkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      <div
        className={`font-bold mb-4 text-lg text-center py-2 border-b-2 ${
          isDarkMode ? "border-gray-600" : "border-gray-200"
        }`}
      >
        Workflow Blocks
        {searchTerm && (
          <div
            className={`text-sm font-normal mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Showing {filteredItems.length} of {items.length} blocks
          </div>
        )}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-2">
          {filteredItems.map((it) => (
            <div
              key={it.key}
              draggable
              onDragStart={(e) => onDragStart(e, it)}
              className={`px-4 py-3 border-2 rounded-lg text-center cursor-grab transition-all duration-300 text-sm font-medium mb-2 shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:border-green-500 ${
                isDarkMode
                  ? "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                  : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {it.label}
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`text-center py-5 text-sm italic ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          No workflow blocks found matching "{searchTerm.trim()}"
        </div>
      )}

      {/* Clear button row */}
      <div className="mt-4">
        <button
          onClick={() => onClearAll?.()}
          className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 border-none rounded-lg cursor-pointer text-white font-bold transition-all duration-300 text-base shadow-lg shadow-red-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/40"
        >
          🗑️ Clear Canvas
        </button>
      </div>
    </div>
  );
}
