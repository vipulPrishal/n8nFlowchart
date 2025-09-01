// Mock API service to simulate backend interactions
export const MockAPIService = {
  // Simulate API call delay
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Mock data for different node types
  mockData: {
    ai_agent: {
      agentType: "elevenlabs",
      modelName: "gpt-4",
      temperature: "0.7",
      maxTokens: "1000",
      voiceProvider: "elevenlabs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      language: "en-US",
      systemPrompt: "You are a helpful AI assistant for customer service.",
      promptTemplate: "User: {{user_input}}\nAssistant:",
      apiEndpoint: "https://api.elevenlabs.io/v1",
      apiKey: "sk-************************",
      retryAttempts: "3",
      timeout: "30",
      description:
        "AI Agent for handling customer inquiries with voice capabilities",
      status: "active",
      lastUsed: "2024-01-15T10:30:00Z",
      usageCount: 1250,
      successRate: "94.5%",
    },
    llm: {
      modelName: "gpt-4",
      temperature: "0.8",
      maxTokens: "2000",
      systemPrompt: "You are a helpful assistant.",
      promptTemplate: "{{user_input}}",
      apiEndpoint: "https://api.openai.com/v1",
      apiKey: "sk-************************",
      retryAttempts: "2",
      timeout: "60",
      description: "LLM for text generation and processing",
      status: "active",
      lastUsed: "2024-01-15T09:15:00Z",
      usageCount: 3420,
      successRate: "98.2%",
    },
    speak: {
      voiceProvider: "elevenlabs",
      voiceId: "21m00Tcm4TlvDq8ikWAM",
      language: "en-US",
      audioFormat: "mp3",
      sampleRate: "22050",
      apiEndpoint: "https://api.elevenlabs.io/v1",
      apiKey: "sk-************************",
      retryAttempts: "3",
      timeout: "45",
      description: "Text-to-Speech conversion",
      status: "active",
      lastUsed: "2024-01-15T11:20:00Z",
      usageCount: 890,
      successRate: "96.8%",
    },
    listen: {
      voiceProvider: "assemblyai",
      language: "en-US",
      audioFormat: "wav",
      sampleRate: "16000",
      apiEndpoint: "https://api.assemblyai.com/v2",
      apiKey: "sk-************************",
      retryAttempts: "2",
      timeout: "30",
      description: "Speech-to-Text conversion",
      status: "active",
      lastUsed: "2024-01-15T10:45:00Z",
      usageCount: 1560,
      successRate: "92.3%",
    },
    memory_read: {
      memoryType: "conversation",
      memoryKey: "user_session_123",
      apiEndpoint: "https://api.memory-service.com/v1",
      apiKey: "sk-************************",
      retryAttempts: "1",
      timeout: "15",
      description: "Read conversation history",
      status: "active",
      lastUsed: "2024-01-15T12:00:00Z",
      usageCount: 2340,
      successRate: "99.1%",
    },
    webhook: {
      httpMethod: "POST",
      webhookUrl: "https://webhook.site/abc123",
      headers:
        '{"Content-Type": "application/json", "Authorization": "Bearer token123"}',
      apiEndpoint: "https://api.webhook-service.com/v1",
      apiKey: "sk-************************",
      retryAttempts: "3",
      timeout: "20",
      description: "Send data to external webhook",
      status: "active",
      lastUsed: "2024-01-15T08:30:00Z",
      usageCount: 670,
      successRate: "89.7%",
    },
    rag: {
      vectorStore: "pinecone",
      similarityThreshold: "0.8",
      topK: "5",
      promptTemplate:
        "Based on the context: {{context}}\nQuestion: {{question}}\nAnswer:",
      apiEndpoint: "https://api.pinecone.io/v1",
      apiKey: "sk-************************",
      retryAttempts: "2",
      timeout: "25",
      description: "Retrieval Augmented Generation query",
      status: "active",
      lastUsed: "2024-01-15T13:15:00Z",
      usageCount: 445,
      successRate: "91.4%",
    },
  },

  // Simulate fetching node configuration from backend
  async fetchNodeConfig(nodeId, nodeType) {
    console.log(`🔍 Fetching config for node: ${nodeId} (${nodeType})`);
    await this.delay(800); // Simulate network delay

    const mockData = this.mockData[nodeType] || {};
    console.log(`✅ Config loaded:`, mockData);

    return {
      success: true,
      data: mockData,
      timestamp: new Date().toISOString(),
    };
  },

  // Simulate saving node configuration to backend
  async saveNodeConfig(nodeId, nodeType, config) {
    console.log(`💾 Saving config for node: ${nodeId} (${nodeType})`);
    await this.delay(600); // Simulate network delay

    console.log(`✅ Config saved:`, config);

    return {
      success: true,
      message: "Configuration saved successfully",
      timestamp: new Date().toISOString(),
    };
  },

  // Simulate getting node usage statistics
  async getNodeStats(nodeId) {
    console.log(`📊 Fetching stats for node: ${nodeId}`);
    await this.delay(400);

    return {
      success: true,
      data: {
        totalCalls: Math.floor(Math.random() * 5000) + 1000,
        successRate: (Math.random() * 10 + 85).toFixed(1) + "%",
        avgResponseTime: (Math.random() * 2000 + 500).toFixed(0) + "ms",
        lastUsed: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        errors: Math.floor(Math.random() * 50),
        cost: "$" + (Math.random() * 100 + 10).toFixed(2),
      },
    };
  },
};

