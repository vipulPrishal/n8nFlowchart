import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

export default function DetailsPanel({ selected, onClear }) {
  const { isDarkMode } = useTheme();

  const panelStyles = {
    width: "20%",
    minWidth: 240,
    padding: 12,
    background: isDarkMode ? "#0f0f0f" : "#ffffff",
    color: isDarkMode ? "#fff" : "#333",
    overflowY: "auto",
    borderLeft: `1px solid ${isDarkMode ? "#222" : "#e0e0e0"}`,
    position: "relative",
  };

  const titleStyles = {
    fontWeight: 700,
    marginBottom: 12,
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "20px", // Increased from 16px to 20px for much better readability
  };

  const labelStyles = {
    color: isDarkMode ? "#9ca3af" : "#666",
    fontSize: "16px", // Increased from 13px to 16px for much better readability
  };

  const valueStyles = {
    fontWeight: 600,
    whiteSpace: "pre-wrap",
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "18px", // Increased from 14px to 18px for much better readability
  };

  const idStyles = {
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "16px", // Increased from 13px to 16px for much better readability
  };

  const buttonStyles = {
    marginTop: 12,
    border: `1px solid ${isDarkMode ? "#444" : "#ccc"}`,
    background: isDarkMode ? "#151515" : "#f8f9fa",
    color: isDarkMode ? "#fff" : "#333",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s ease",
    fontSize: "16px", // Increased from 13px to 16px for much better readability
  };

  return (
    <div style={panelStyles}>
      <div style={titleStyles}>Details</div>
      <ThemeToggler />

      {!selected ? (
        <div style={labelStyles}>Select a node to see details.</div>
      ) : (
        <div style={{ display: "grid", gap: 8 }}>
          <div>
            <div style={labelStyles}>Label</div>
            <div style={valueStyles}>
              {selected.data?.label || "(no label)"}
            </div>
          </div>

          <div>
            <div style={labelStyles}>ID</div>
            <div style={idStyles}>{selected.id}</div>
          </div>

          <div>
            <div style={labelStyles}>Type</div>
            <div style={idStyles}>{selected.type}</div>
          </div>

          <div>
            <div style={labelStyles}>Position</div>
            <div style={idStyles}>
              x: {Math.round(selected.position?.x ?? 0)}, y:{" "}
              {Math.round(selected.position?.y ?? 0)}
            </div>
          </div>

          {selected.data?.spec && (
            <>
              <div>
                <div style={labelStyles}>Shape</div>
                <div style={idStyles}>{selected.data.spec.shape}</div>
              </div>
              <div>
                <div style={labelStyles}>Size</div>
                <div style={idStyles}>
                  w: {selected.data.spec.w}px, h: {selected.data.spec.h}px
                </div>
              </div>
              {selected.data.spec.radius && (
                <div>
                  <div style={labelStyles}>Radius</div>
                  <div style={idStyles}>{selected.data.spec.radius}</div>
                </div>
              )}
            </>
          )}

          <button
            onClick={onClear}
            style={buttonStyles}
            onMouseEnter={(e) => {
              e.target.style.background = isDarkMode ? "#2a2a2a" : "#e9ecef";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isDarkMode ? "#151515" : "#f8f9fa";
            }}
          >
            Delete Node
          </button>
        </div>
      )}
    </div>
  );
}
