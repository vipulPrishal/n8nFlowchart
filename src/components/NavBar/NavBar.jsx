import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import NotificationBell from "../NotificationBell/NotificationBell";

const NavBar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showQuickActions, setShowQuickActions] = useState(false);

  const quickActions = [
    {
      label: "New Workflow",
      icon: "➕",
      action: () => console.log("New Workflow"),
    },
    { label: "Import JSON", icon: "📥", action: () => console.log("Import") },
    { label: "Export All", icon: "📤", action: () => console.log("Export") },
    { label: "Run Test", icon: "▶️", action: () => console.log("Test") },
  ];

  return (
    <nav
      className={`h-20 flex items-center justify-between px-8 flex-shrink-0 shadow-lg ${
        isDarkMode
          ? "bg-gray-900 border-b border-gray-700"
          : "bg-white border-b border-gray-200"
      }`}
    >
      {/* Logo and Brand */}
      <div className="flex items-center gap-4 text-xl font-semibold">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span
          className={`font-bold text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent shadow-sm transition-all duration-300 ${
            isDarkMode
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-purple-600"
          }`}
        >
          {" "}
          CRM Workflow{" "}
        </span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-6">
        <button
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          Dashboard
        </button>
        <button
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDarkMode
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          }`}
        >
          Workflows
        </button>
        <button
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDarkMode
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          }`}
        >
          Templates
        </button>
        <button
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDarkMode
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          }`}
        >
          Analytics
        </button>
        <button
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isDarkMode
              ? "text-gray-300 hover:bg-gray-700 hover:text-white"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
          }`}
        >
          Settings
        </button>
      </div>

      {/* Right Side - Quick Actions, Notifications & Theme Toggle */}
      <div className="flex items-center gap-5">
        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none px-5 py-2.5 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40 whitespace-nowrap"
            onClick={() => setShowQuickActions(!showQuickActions)}
            title="Quick Actions"
          >
            ⚡ Quick Actions
          </button>

          {showQuickActions && (
            <div
              className={`absolute top-full right-0 min-w-48 z-50 mt-2 overflow-hidden rounded-lg shadow-xl ${
                isDarkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 w-full px-4 py-3 border-none bg-transparent cursor-pointer transition-colors duration-200 text-left ${
                    isDarkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    action.action();
                    setShowQuickActions(false);
                  }}
                >
                  <span className="text-base w-5 text-center">
                    {action.icon}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <NotificationBell />

        {/* Status Indicator */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ${
            isDarkMode
              ? "bg-blue-900 text-blue-300"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Active
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full border-none cursor-pointer flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:scale-105 ${
            isDarkMode
              ? "bg-gray-700 text-yellow-400 shadow-gray-900/30"
              : "bg-gray-100 text-amber-500 shadow-gray-900/10"
          }`}
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
