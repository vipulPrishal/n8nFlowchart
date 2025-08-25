import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeToggler from "../ThemeToggler/ThemeToggler";

export default function DetailsPanel({ selected, onClear }) {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    actionType: "",
    triggerCondition: "",
    apiEndpoint: "",
    webhookUrl: "",
    apiKey: "",
    priority: "medium",
    retryAttempts: "3",
    timeout: "30",
    description: "",
  });

  // Load existing data when node is selected
  useEffect(() => {
    if (selected?.data?.workflowConfig) {
      setFormData(selected.data.workflowConfig);
    } else {
      setFormData({
        actionType: "",
        triggerCondition: "",
        apiEndpoint: "",
        webhookUrl: "",
        apiKey: "",
        priority: "medium",
        retryAttempts: "3",
        timeout: "30",
        description: "",
      });
    }
  }, [selected]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (selected) {
      // Update the node data with workflow configuration
      selected.data.workflowConfig = formData;
      console.log("Workflow configuration saved:", formData);
      // Here you would typically call a function to update the node in the flowchart
    }
  };

  const panelStyles = {
    width: "25%",
    minWidth: 300,
    padding: 16,
    background: isDarkMode ? "#0f0f0f" : "#ffffff",
    color: isDarkMode ? "#fff" : "#333",
    overflowY: "auto",
    borderLeft: `1px solid ${isDarkMode ? "#222" : "#e0e0e0"}`,
    position: "relative",
  };

  const titleStyles = {
    fontWeight: 700,
    marginBottom: 16,
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const sectionStyles = {
    marginBottom: 20,
    padding: 12,
    background: isDarkMode ? "#1a1a1a" : "#f8f9fa",
    borderRadius: 8,
    border: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
  };

  const sectionTitleStyles = {
    fontWeight: 600,
    marginBottom: 12,
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "16px",
  };

  const labelStyles = {
    color: isDarkMode ? "#9ca3af" : "#666",
    fontSize: "14px",
    marginBottom: 4,
    fontWeight: 500,
  };

  const inputStyles = {
    width: "100%",
    padding: "8px 12px",
    border: `1px solid ${isDarkMode ? "#444" : "#ccc"}`,
    borderRadius: 6,
    background: isDarkMode ? "#2a2a2a" : "#fff",
    color: isDarkMode ? "#fff" : "#333",
    fontSize: "14px",
    marginBottom: 12,
  };

  const selectStyles = {
    ...inputStyles,
    cursor: "pointer",
  };

  const buttonStyles = {
    padding: "10px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.2s ease",
    marginRight: 8,
  };

  const saveButtonStyles = {
    ...buttonStyles,
    background: "#10b981",
    color: "#fff",
  };

  const deleteButtonStyles = {
    ...buttonStyles,
    background: isDarkMode ? "#dc2626" : "#ef4444",
    color: "#fff",
  };

  const actionTypeOptions = [
    { value: "", label: "Select Action Type" },
    { value: "schedule_appointment", label: "Schedule Appointment" },
    { value: "make_outbound_call", label: "Make Outbound Call" },
    { value: "receive_inbound_call", label: "Receive Inbound Call" },
    { value: "send_sms", label: "Send SMS" },
    { value: "update_contact", label: "Update Contact" },
    { value: "log_call_activity", label: "Log Call Activity" },
    { value: "send_email", label: "Send Email" },
    { value: "create_task", label: "Create Task" },
  ];

  const triggerOptions = [
    { value: "", label: "Select Trigger" },
    { value: "new_lead", label: "On New Lead" },
    { value: "appointment_confirmed", label: "On Appointment Confirmed" },
    { value: "call_completed", label: "On Call Completed" },
    { value: "follow_up_due", label: "On Follow-up Due" },
    { value: "payment_received", label: "On Payment Received" },
    { value: "customer_inquiry", label: "On Customer Inquiry" },
    { value: "lead_converted", label: "On Lead Converted" },
  ];

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  return (
    <div style={panelStyles}>
      <div style={titleStyles}>
        <span>Workflow Configuration</span>
        <ThemeToggler />
      </div>

      {!selected ? (
        <div
          style={{ color: isDarkMode ? "#9ca3af" : "#666", fontSize: "16px" }}
        >
          Select a node to configure workflow settings.
        </div>
      ) : (
        <div>
          {/* Node Info Section */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Node Information</div>
            <div>
              <div style={labelStyles}>Node Label</div>
              <div
                style={{
                  ...inputStyles,
                  background: isDarkMode ? "#333" : "#f0f0f0",
                  cursor: "not-allowed",
                }}
              >
                {selected.data?.label || "(no label)"}
              </div>
            </div>
            <div>
              <div style={labelStyles}>Node ID</div>
              <div
                style={{
                  fontSize: "12px",
                  color: isDarkMode ? "#9ca3af" : "#666",
                }}
              >
                {selected.id}
              </div>
            </div>
          </div>

          {/* Action Configuration Section */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Action Configuration</div>

            <div>
              <div style={labelStyles}>Action Type *</div>
              <select
                style={selectStyles}
                value={formData.actionType}
                onChange={(e) =>
                  handleInputChange("actionType", e.target.value)
                }
              >
                {actionTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div style={labelStyles}>Trigger Condition *</div>
              <select
                style={selectStyles}
                value={formData.triggerCondition}
                onChange={(e) =>
                  handleInputChange("triggerCondition", e.target.value)
                }
              >
                {triggerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div style={labelStyles}>Priority Level</div>
              <select
                style={selectStyles}
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
              >
                {priorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* API Configuration Section */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>API Configuration</div>

            <div>
              <div style={labelStyles}>Callix.ai API Endpoint</div>
              <input
                type="text"
                style={inputStyles}
                placeholder="https://api.callix.ai/v1/..."
                value={formData.apiEndpoint}
                onChange={(e) =>
                  handleInputChange("apiEndpoint", e.target.value)
                }
              />
            </div>

            <div>
              <div style={labelStyles}>Webhook URL</div>
              <input
                type="text"
                style={inputStyles}
                placeholder="https://your-domain.com/webhook"
                value={formData.webhookUrl}
                onChange={(e) =>
                  handleInputChange("webhookUrl", e.target.value)
                }
              />
            </div>

            <div>
              <div style={labelStyles}>API Key</div>
              <input
                type="password"
                style={inputStyles}
                placeholder="Enter your Callix.ai API key"
                value={formData.apiKey}
                onChange={(e) => handleInputChange("apiKey", e.target.value)}
              />
            </div>
          </div>

          {/* Advanced Settings Section */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>Advanced Settings</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              <div>
                <div style={labelStyles}>Retry Attempts</div>
                <input
                  type="number"
                  style={inputStyles}
                  min="0"
                  max="10"
                  value={formData.retryAttempts}
                  onChange={(e) =>
                    handleInputChange("retryAttempts", e.target.value)
                  }
                />
              </div>
              <div>
                <div style={labelStyles}>Timeout (seconds)</div>
                <input
                  type="number"
                  style={inputStyles}
                  min="5"
                  max="300"
                  value={formData.timeout}
                  onChange={(e) => handleInputChange("timeout", e.target.value)}
                />
              </div>
            </div>

            <div>
              <div style={labelStyles}>Description</div>
              <textarea
                style={{
                  ...inputStyles,
                  minHeight: "80px",
                  resize: "vertical",
                }}
                placeholder="Describe what this workflow step does..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button
              onClick={handleSave}
              style={saveButtonStyles}
              onMouseEnter={(e) => {
                e.target.style.background = "#059669";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#10b981";
              }}
            >
              Save Configuration
            </button>
            <button
              onClick={onClear}
              style={deleteButtonStyles}
              onMouseEnter={(e) => {
                e.target.style.background = isDarkMode ? "#b91c1c" : "#dc2626";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = isDarkMode ? "#dc2626" : "#ef4444";
              }}
            >
              Delete Node
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
