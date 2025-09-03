import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export default function NotificationBell() {
  const { isDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    {
      id: 1,
      message: "Workflow 'Lead Qualification' completed successfully",
      time: "2 min ago",
      type: "success",
    },
    {
      id: 2,
      message: "New workflow template available",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 3,
      message: "Workflow 'Customer Onboarding' failed",
      time: "3 hours ago",
      type: "error",
    },
  ]);

  const unreadCount = notifications.length;

  const containerStyles = {
    position: "relative",
    marginRight: "16px",
  };

  const bellStyles = {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: isDarkMode ? "#9ca3af" : "#666",
    padding: "8px",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    position: "relative",
  };

  const badgeStyles = {
    position: "absolute",
    top: "0",
    right: "0",
    background: "#ef4444",
    color: "white",
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "10px",
    minWidth: "18px",
    textAlign: "center",
  };

  const dropdownStyles = {
    position: "absolute",
    top: "100%",
    right: 0,
    background: isDarkMode ? "#1a1a1a" : "#ffffff",
    border: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    minWidth: "300px",
    zIndex: 1000,
    marginTop: "8px",
  };

  const notificationItemStyles = (type) => ({
    padding: "12px 16px",
    borderBottom: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  });

  const typeIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  const typeColor = (type) => {
    switch (type) {
      case "success":
        return "#10b981";
      case "error":
        return "#ef4444";
      case "info":
        return "#3b82f6";
      default:
        return "#9ca3af";
    }
  };

  return (
    <div style={containerStyles}>
      <button
        style={bellStyles}
        onClick={() => setShowNotifications(!showNotifications)}
        title="Notifications"
        onMouseEnter={(e) => {
          e.target.style.background = isDarkMode ? "#333" : "#f0f0f0";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "transparent";
        }}
      >
        🔔
        {unreadCount > 0 && <span style={badgeStyles}>{unreadCount}</span>}
      </button>

      {showNotifications && (
        <div style={dropdownStyles}>
          <div
            style={{
              padding: "16px",
              borderBottom: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
              fontWeight: "600",
              color: isDarkMode ? "#fff" : "#333",
            }}
          >
            Notifications ({unreadCount})
          </div>

          {notifications.map((notification) => (
            <div
              key={notification.id}
              style={notificationItemStyles(notification.type)}
            >
              <span style={{ fontSize: "16px" }}>
                {typeIcon(notification.type)}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: isDarkMode ? "#fff" : "#333",
                    marginBottom: "4px",
                  }}
                >
                  {notification.message}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: typeColor(notification.type),
                  }}
                >
                  {notification.time}
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              padding: "12px 16px",
              textAlign: "center",
              borderTop: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
              cursor: "pointer",
              color: isDarkMode ? "#10b981" : "#10b981",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            View All Notifications
          </div>
        </div>
      )}
    </div>
  );
}
