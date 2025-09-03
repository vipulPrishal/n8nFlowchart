import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const NavBar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      {/* Logo and Brand */}
      <div className="navbar-logo">
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
        <span className="navbar-brand-text"> CRM Workflow </span>
      </div>

      {/* Navigation Items */}
      <div className="navbar-items">
        <button className="navbar-item active">Dashboard</button>
        <button className="navbar-item">Workflows</button>
        <button className="navbar-item">Templates</button>
        <button className="navbar-item">Analytics</button>
        <button className="navbar-item">Settings</button>
      </div>

      {/* Right Side - Theme Toggle */}
      <div className="navbar-right">
        {/* Status Indicator */}
        <div className="status-indicator">
          <div className="status-dot"></div>
          Active
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            // Sun icon for dark mode (click to switch to light)
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
            // Moon icon for light mode (click to switch to dark)
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
