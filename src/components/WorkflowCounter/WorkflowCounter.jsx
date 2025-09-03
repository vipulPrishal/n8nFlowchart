import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function WorkflowCounter({ count = 0, activeCount = 0 }) {
  const { isDarkMode } = useTheme();

  const containerStyles = {
    display: "flex",
    gap: "16px",
    padding: "16px",
    background: isDarkMode ? "#1a1a1a" : "#ffffff",
    border: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
    borderRadius: "8px",
    marginBottom: "16px",
  };

  const statStyles = {
    textAlign: "center",
    flex: 1,
  };

  const numberStyles = {
    fontSize: "24px",
    fontWeight: "700",
    color: isDarkMode ? "#fff" : "#333",
    marginBottom: "4px",
  };

  const labelStyles = {
    fontSize: "12px",
    color: isDarkMode ? "#9ca3af" : "#666",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <div style={containerStyles}>
      <div style={statStyles}>
        <div style={numberStyles}>{count}</div>
        <div style={labelStyles}>Total Workflows</div>
      </div>

      <div style={statStyles}>
        <div style={{ ...numberStyles, color: "#10b981" }}>{activeCount}</div>
        <div style={labelStyles}>Active</div>
      </div>

      <div style={statStyles}>
        <div style={{ ...numberStyles, color: "#f59e0b" }}>
          {count - activeCount}
        </div>
        <div style={labelStyles}>Draft</div>
      </div>

      <div style={statStyles}>
        <div style={{ ...numberStyles, color: "#3b82f6" }}>
          {((activeCount / Math.max(count, 1)) * 100).toFixed(0)}%
        </div>
        <div style={labelStyles}>Completion</div>
      </div>
    </div>
  );
}
