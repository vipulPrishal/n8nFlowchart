import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function WorkflowCounter({ count = 0, activeCount = 0 }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border mb-4 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="text-center flex-1">
        <div
          className={`text-2xl font-bold mb-1 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {count}
        </div>
        <div
          className={`text-xs uppercase tracking-wider ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Total Workflows
        </div>
      </div>

      <div className="text-center flex-1">
        <div className="text-2xl font-bold mb-1 text-green-500">
          {activeCount}
        </div>
        <div
          className={`text-xs uppercase tracking-wider ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Active
        </div>
      </div>

      <div className="text-center flex-1">
        <div className="text-2xl font-bold mb-1 text-amber-500">
          {count - activeCount}
        </div>
        <div
          className={`text-xs uppercase tracking-wider ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Draft
        </div>
      </div>

      <div className="text-center flex-1">
        <div className="text-2xl font-bold mb-1 text-blue-500">
          {((activeCount / Math.max(count, 1)) * 100).toFixed(0)}%
        </div>
        <div
          className={`text-xs uppercase tracking-wider ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Completion
        </div>
      </div>
    </div>
  );
}
