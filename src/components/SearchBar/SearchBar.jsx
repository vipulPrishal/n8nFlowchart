import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function SearchBar({
  onSearch,
  placeholder = "Search workflows...",
}) {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value); // Emit search term in real-time
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch?.(""); // Clear search
  };

  const containerStyles = {
    position: "relative",
    marginBottom: "16px",
  };

  const inputStyles = {
    width: "100%",
    padding: "12px 16px 12px 48px",
    border: `2px solid ${isDarkMode ? "#444" : "#e0e0e0"}`,
    borderRadius: "25px",
    background: isDarkMode ? "#2a2a2a" : "#ffffff",
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "16px",
    transition: "all 0.3s ease",
  };

  const searchIconStyles = {
    position: "absolute",
    left: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: isDarkMode ? "#9ca3af" : "#666",
    fontSize: "18px",
  };

  const clearButtonStyles = {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: isDarkMode ? "#9ca3af" : "#666",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "50%",
    display: searchTerm ? "block" : "none",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyles}>
      <span style={searchIconStyles}>🔍</span>
      <input
        type="text"
        style={inputStyles}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={(e) => {
          e.target.style.borderColor = isDarkMode ? "#10b981" : "#10b981";
          e.target.style.boxShadow = "0 0 0 3px rgba(16, 185, 129, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = isDarkMode ? "#444" : "#e0e0e0";
          e.target.style.boxShadow = "none";
        }}
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          style={clearButtonStyles}
          onMouseEnter={(e) => {
            e.target.style.color = isDarkMode ? "#fff" : "#333";
            e.target.style.background = isDarkMode ? "#444" : "#e0e0e0";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = isDarkMode ? "#9ca3af" : "#666";
            e.target.style.background = "none";
          }}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
