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
    // AI Agent specific fields
    agentType: "",
    modelName: "",
    temperature: "0.7",
    maxTokens: "1000",
    voiceProvider: "",
    voiceId: "",
    language: "en-US",
    // LLM specific fields
    promptTemplate: "",
    systemPrompt: "",
    // TTS/STT specific fields
    audioFormat: "mp3",
    sampleRate: "22050",
    // Memory specific fields
    memoryType: "",
    memoryKey: "",
    // Webhook specific fields
    httpMethod: "POST",
    headers: "",
    // RAG specific fields
    vectorStore: "",
    similarityThreshold: "0.8",
    topK: "5",
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
        agentType: "",
        modelName: "",
        temperature: "0.7",
        maxTokens: "1000",
        voiceProvider: "",
        voiceId: "",
        language: "en-US",
        promptTemplate: "",
        systemPrompt: "",
        audioFormat: "mp3",
        sampleRate: "22050",
        memoryType: "",
        memoryKey: "",
        httpMethod: "POST",
        headers: "",
        vectorStore: "",
        similarityThreshold: "0.8",
        topK: "5",
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

  // Get node type for conditional rendering
  const getNodeType = () => {
    return selected?.data?.label || "";
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

  // AI Agent specific options
  const agentTypeOptions = [
    { value: "", label: "Select Agent Type" },
    { value: "elevenlabs", label: "ElevenLabs" },
    { value: "assemblyai", label: "AssemblyAI" },
    { value: "openai", label: "OpenAI" },
    { value: "anthropic", label: "Anthropic Claude" },
    { value: "google", label: "Google Gemini" },
    { value: "custom", label: "Custom AI Provider" },
  ];

  const voiceProviderOptions = [
    { value: "", label: "Select Voice Provider" },
    { value: "elevenlabs", label: "ElevenLabs" },
    { value: "assemblyai", label: "AssemblyAI" },
    { value: "azure", label: "Azure Speech" },
    { value: "aws", label: "AWS Polly" },
    { value: "google", label: "Google TTS" },
  ];

  const modelOptions = [
    { value: "", label: "Select Model" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "claude-3", label: "Claude-3" },
    { value: "claude-2", label: "Claude-2" },
    { value: "gemini-pro", label: "Gemini Pro" },
    { value: "custom", label: "Custom Model" },
  ];

  const languageOptions = [
    { value: "en-US", label: "English (US)" },
    { value: "en-GB", label: "English (UK)" },
    { value: "es-ES", label: "Spanish" },
    { value: "fr-FR", label: "French" },
    { value: "de-DE", label: "German" },
    { value: "hi-IN", label: "Hindi" },
    { value: "ja-JP", label: "Japanese" },
    { value: "ko-KR", label: "Korean" },
    { value: "zh-CN", label: "Chinese (Simplified)" },
  ];

  const audioFormatOptions = [
    { value: "mp3", label: "MP3" },
    { value: "wav", label: "WAV" },
    { value: "ogg", label: "OGG" },
    { value: "flac", label: "FLAC" },
    { value: "aac", label: "AAC" },
  ];

  const memoryTypeOptions = [
    { value: "", label: "Select Memory Type" },
    { value: "conversation", label: "Conversation History" },
    { value: "user_preferences", label: "User Preferences" },
    { value: "session_data", label: "Session Data" },
    { value: "long_term", label: "Long-term Memory" },
    { value: "vector", label: "Vector Database" },
  ];

  const httpMethodOptions = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "PATCH", label: "PATCH" },
    { value: "DELETE", label: "DELETE" },
  ];

  const vectorStoreOptions = [
    { value: "", label: "Select Vector Store" },
    { value: "pinecone", label: "Pinecone" },
    { value: "weaviate", label: "Weaviate" },
    { value: "qdrant", label: "Qdrant" },
    { value: "chroma", label: "Chroma" },
    { value: "milvus", label: "Milvus" },
    { value: "elasticsearch", label: "Elasticsearch" },
  ];

  // Render AI Agent specific configuration
  const renderAIAgentConfig = () => (
    <>
      {/* Agent Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>AI Agent Configuration</div>

        <div>
          <div style={labelStyles}>Agent Type *</div>
          <select
            style={selectStyles}
            value={formData.agentType}
            onChange={(e) => handleInputChange("agentType", e.target.value)}
          >
            {agentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div style={labelStyles}>Model Name</div>
          <select
            style={selectStyles}
            value={formData.modelName}
            onChange={(e) => handleInputChange("modelName", e.target.value)}
          >
            {modelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div>
            <div style={labelStyles}>Temperature</div>
            <input
              type="number"
              style={inputStyles}
              min="0"
              max="2"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => handleInputChange("temperature", e.target.value)}
            />
          </div>
          <div>
            <div style={labelStyles}>Max Tokens</div>
            <input
              type="number"
              style={inputStyles}
              min="1"
              max="4000"
              value={formData.maxTokens}
              onChange={(e) => handleInputChange("maxTokens", e.target.value)}
            />
          </div>
        </div>

        <div>
          <div style={labelStyles}>Voice Provider</div>
          <select
            style={selectStyles}
            value={formData.voiceProvider}
            onChange={(e) => handleInputChange("voiceProvider", e.target.value)}
          >
            {voiceProviderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div style={labelStyles}>Voice ID</div>
          <input
            type="text"
            style={inputStyles}
            placeholder="Enter voice ID (e.g., 21m00Tcm4TlvDq8ikWAM)"
            value={formData.voiceId}
            onChange={(e) => handleInputChange("voiceId", e.target.value)}
          />
        </div>

        <div>
          <div style={labelStyles}>Language</div>
          <select
            style={selectStyles}
            value={formData.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Prompt Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>Prompt Configuration</div>

        <div>
          <div style={labelStyles}>System Prompt</div>
          <textarea
            style={{
              ...inputStyles,
              minHeight: "80px",
              resize: "vertical",
            }}
            placeholder="Enter the system prompt for the AI agent..."
            value={formData.systemPrompt}
            onChange={(e) => handleInputChange("systemPrompt", e.target.value)}
          />
        </div>

        <div>
          <div style={labelStyles}>Prompt Template</div>
          <textarea
            style={{
              ...inputStyles,
              minHeight: "80px",
              resize: "vertical",
            }}
            placeholder="Enter the prompt template with variables like {{user_input}}..."
            value={formData.promptTemplate}
            onChange={(e) =>
              handleInputChange("promptTemplate", e.target.value)
            }
          />
        </div>
      </div>
    </>
  );

  // Render LLM specific configuration
  const renderLLMConfig = () => (
    <>
      {/* LLM Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>LLM Configuration</div>

        <div>
          <div style={labelStyles}>Model Name *</div>
          <select
            style={selectStyles}
            value={formData.modelName}
            onChange={(e) => handleInputChange("modelName", e.target.value)}
          >
            {modelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div>
            <div style={labelStyles}>Temperature</div>
            <input
              type="number"
              style={inputStyles}
              min="0"
              max="2"
              step="0.1"
              value={formData.temperature}
              onChange={(e) => handleInputChange("temperature", e.target.value)}
            />
          </div>
          <div>
            <div style={labelStyles}>Max Tokens</div>
            <input
              type="number"
              style={inputStyles}
              min="1"
              max="4000"
              value={formData.maxTokens}
              onChange={(e) => handleInputChange("maxTokens", e.target.value)}
            />
          </div>
        </div>

        <div>
          <div style={labelStyles}>System Prompt</div>
          <textarea
            style={{
              ...inputStyles,
              minHeight: "80px",
              resize: "vertical",
            }}
            placeholder="Enter the system prompt..."
            value={formData.systemPrompt}
            onChange={(e) => handleInputChange("systemPrompt", e.target.value)}
          />
        </div>
      </div>
    </>
  );

  // Render TTS/STT specific configuration
  const renderTTSSTTConfig = () => (
    <>
      {/* TTS/STT Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>
          {getNodeType().includes("Speak")
            ? "TTS Configuration"
            : "STT Configuration"}
        </div>

        <div>
          <div style={labelStyles}>Voice Provider</div>
          <select
            style={selectStyles}
            value={formData.voiceProvider}
            onChange={(e) => handleInputChange("voiceProvider", e.target.value)}
          >
            {voiceProviderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div style={labelStyles}>Voice ID</div>
          <input
            type="text"
            style={inputStyles}
            placeholder="Enter voice ID"
            value={formData.voiceId}
            onChange={(e) => handleInputChange("voiceId", e.target.value)}
          />
        </div>

        <div>
          <div style={labelStyles}>Language</div>
          <select
            style={selectStyles}
            value={formData.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div>
            <div style={labelStyles}>Audio Format</div>
            <select
              style={selectStyles}
              value={formData.audioFormat}
              onChange={(e) => handleInputChange("audioFormat", e.target.value)}
            >
              {audioFormatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div style={labelStyles}>Sample Rate (Hz)</div>
            <input
              type="number"
              style={inputStyles}
              min="8000"
              max="48000"
              step="1000"
              value={formData.sampleRate}
              onChange={(e) => handleInputChange("sampleRate", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );

  // Render Memory specific configuration
  const renderMemoryConfig = () => (
    <>
      {/* Memory Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>Memory Configuration</div>

        <div>
          <div style={labelStyles}>Memory Type *</div>
          <select
            style={selectStyles}
            value={formData.memoryType}
            onChange={(e) => handleInputChange("memoryType", e.target.value)}
          >
            {memoryTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div style={labelStyles}>Memory Key</div>
          <input
            type="text"
            style={inputStyles}
            placeholder="Enter memory key for data storage"
            value={formData.memoryKey}
            onChange={(e) => handleInputChange("memoryKey", e.target.value)}
          />
        </div>

        <div>
          <div style={labelStyles}>Description</div>
          <textarea
            style={{
              ...inputStyles,
              minHeight: "60px",
              resize: "vertical",
            }}
            placeholder="Describe what data this memory stores..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
      </div>
    </>
  );

  // Render Webhook specific configuration
  const renderWebhookConfig = () => (
    <>
      {/* Webhook Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>Webhook Configuration</div>

        <div>
          <div style={labelStyles}>HTTP Method</div>
          <select
            style={selectStyles}
            value={formData.httpMethod}
            onChange={(e) => handleInputChange("httpMethod", e.target.value)}
          >
            {httpMethodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div style={labelStyles}>Webhook URL *</div>
          <input
            type="text"
            style={inputStyles}
            placeholder="https://your-domain.com/webhook"
            value={formData.webhookUrl}
            onChange={(e) => handleInputChange("webhookUrl", e.target.value)}
          />
        </div>

        <div>
          <div style={labelStyles}>Headers (JSON)</div>
          <textarea
            style={{
              ...inputStyles,
              minHeight: "60px",
              resize: "vertical",
            }}
            placeholder='{"Content-Type": "application/json", "Authorization": "Bearer token"}'
            value={formData.headers}
            onChange={(e) => handleInputChange("headers", e.target.value)}
          />
        </div>
      </div>
    </>
  );

  // Render RAG specific configuration
  const renderRAGConfig = () => (
    <>
      {/* RAG Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>RAG Configuration</div>

        <div>
          <div style={labelStyles}>Vector Store</div>
          <select
            style={selectStyles}
            value={formData.vectorStore}
            onChange={(e) => handleInputChange("vectorStore", e.target.value)}
          >
            {vectorStoreOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <div>
            <div style={labelStyles}>Similarity Threshold</div>
            <input
              type="number"
              style={inputStyles}
              min="0"
              max="1"
              step="0.1"
              value={formData.similarityThreshold}
              onChange={(e) =>
                handleInputChange("similarityThreshold", e.target.value)
              }
            />
          </div>
          <div>
            <div style={labelStyles}>Top K Results</div>
            <input
              type="number"
              style={inputStyles}
              min="1"
              max="20"
              value={formData.topK}
              onChange={(e) => handleInputChange("topK", e.target.value)}
            />
          </div>
        </div>

        <div>
          <div style={labelStyles}>Query Template</div>
          <textarea
            style={{
              ...inputStyles,
              minHeight: "60px",
              resize: "vertical",
            }}
            placeholder="Enter the query template for RAG..."
            value={formData.promptTemplate}
            onChange={(e) =>
              handleInputChange("promptTemplate", e.target.value)
            }
          />
        </div>
      </div>
    </>
  );

  // Render default configuration for other nodes
  const renderDefaultConfig = () => (
    <>
      {/* Action Configuration Section */}
      <div style={sectionStyles}>
        <div style={sectionTitleStyles}>Action Configuration</div>

        <div>
          <div style={labelStyles}>Action Type *</div>
          <select
            style={selectStyles}
            value={formData.actionType}
            onChange={(e) => handleInputChange("actionType", e.target.value)}
          >
            <option value="">Select Action Type</option>
            <option value="custom_action">Custom Action</option>
            <option value="api_call">API Call</option>
            <option value="data_processing">Data Processing</option>
            <option value="notification">Send Notification</option>
          </select>
        </div>

        <div>
          <div style={labelStyles}>Priority Level</div>
          <select
            style={selectStyles}
            value={formData.priority}
            onChange={(e) => handleInputChange("priority", e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
    </>
  );

  // Determine which configuration to render based on node type
  const renderNodeSpecificConfig = () => {
    const nodeType = getNodeType();

    if (nodeType === "AI Agent") {
      return renderAIAgentConfig();
    } else if (nodeType === "LLM") {
      return renderLLMConfig();
    } else if (nodeType.includes("Speak") || nodeType.includes("Listen")) {
      return renderTTSSTTConfig();
    } else if (nodeType.includes("Memory")) {
      return renderMemoryConfig();
    } else if (nodeType === "Webhook") {
      return renderWebhookConfig();
    } else if (nodeType === "RAG Query") {
      return renderRAGConfig();
    } else {
      return renderDefaultConfig();
    }
  };

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

          {/* Node-specific configuration */}
          {renderNodeSpecificConfig()}

          {/* API Configuration Section - Common for all */}
          <div style={sectionStyles}>
            <div style={sectionTitleStyles}>API Configuration</div>

            <div>
              <div style={labelStyles}>API Endpoint</div>
              <input
                type="text"
                style={inputStyles}
                placeholder="https://api.example.com/v1/..."
                value={formData.apiEndpoint}
                onChange={(e) =>
                  handleInputChange("apiEndpoint", e.target.value)
                }
              />
            </div>

            <div>
              <div style={labelStyles}>API Key</div>
              <input
                type="password"
                style={inputStyles}
                placeholder="Enter your API key"
                value={formData.apiKey}
                onChange={(e) => handleInputChange("apiKey", e.target.value)}
              />
            </div>
          </div>

          {/* Advanced Settings Section - Common for all */}
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
