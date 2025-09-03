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
    <div className="relative mr-4">
      <button
        className={`bg-transparent border-none text-xl cursor-pointer p-2 rounded-full transition-all duration-200 relative hover:bg-gray-200 dark:hover:bg-gray-700 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
        onClick={() => setShowNotifications(!showNotifications)}
        title="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          className={`absolute top-full right-0 min-w-[300px] z-50 mt-2 rounded-lg shadow-xl ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <div
            className={`px-4 py-4 border-b font-semibold ${
              isDarkMode
                ? "border-gray-700 text-white"
                : "border-gray-200 text-gray-800"
            }`}
          >
            Notifications ({unreadCount})
          </div>

          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 border-b flex items-start gap-3 ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <span className="text-base">{typeIcon(notification.type)}</span>
              <div className="flex-1">
                <div
                  className={`text-sm mb-1 ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {notification.message}
                </div>
                <div
                  className="text-xs"
                  style={{ color: typeColor(notification.type) }}
                >
                  {notification.time}
                </div>
              </div>
            </div>
          ))}

          <div
            className={`px-4 py-3 text-center border-t cursor-pointer text-green-500 text-sm font-medium ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            View All Notifications
          </div>
        </div>
      )}
    </div>
  );
}
