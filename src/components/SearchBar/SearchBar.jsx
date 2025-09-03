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

  return (
    <div className="relative mb-4">
      <span
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-lg ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        🔍
      </span>
      <input
        type="text"
        className={`w-full pl-12 pr-12 py-3 border-2 rounded-full text-base transition-all duration-300 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/10 focus:outline-none ${
          isDarkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-200 text-gray-800 placeholder-gray-500"
        }`}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <button
          onClick={handleClearSearch}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-base cursor-pointer p-1 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-800"
          }`}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
