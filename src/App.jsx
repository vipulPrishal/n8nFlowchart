import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import FlowChart from "./components/FlowChart/FlowChart";
import Palette from "./components/Palette/Palette";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel";
import NavBar from "./components/NavBar/NavBar";
import WorkflowCounter from "./components/WorkflowCounter/WorkflowCounter";
import SearchBar from "./components/SearchBar/SearchBar";
import "./App.css";

const AppContent = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const workflowCount = 5;
  const activeWorkflowCount = 3;
  const deleteNodeRef = React.useRef(null);
  const clearAllRef = React.useRef(null);
  const { isDarkMode } = useTheme();

  const handleClearSelection = () => {
    if (selectedNode && deleteNodeRef.current) {
      deleteNodeRef.current(selectedNode.id);
      setSelectedNode(null);
    } else {
      setSelectedNode(null);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <div
        className={`app-container ${isDarkMode ? "dark" : "light"}`}
        style={{
          background: isDarkMode ? "#000000" : "#f5f5f5",
          color: isDarkMode ? "#ffffff" : "#333333",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* NavBar */}
        <NavBar />

        {/* Main content area */}
        <div
          className="main-content"
          style={{
            flex: 1,
            display: "flex",
            height: "calc(100vh - 80px)", // Subtract navbar height
            overflow: "hidden",
          }}
        >
          {/* Left Sidebar */}
          <div
            className="left-sidebar"
            style={{
              width: "20%",
              minWidth: 240,
              height: "100%",
              overflowY: "auto",
              padding: "16px",
              borderRight: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
              background: isDarkMode ? "#0f0f0f" : "#f8f9fa",
            }}
          >
            {/* Workflow Counter */}
            <WorkflowCounter
              count={workflowCount}
              activeCount={activeWorkflowCount}
            />

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Palette */}
            <Palette
              onClearAll={() => clearAllRef.current?.()}
              searchTerm={searchTerm}
            />
          </div>

          {/* Center - FlowChart */}
          <div style={{ flex: 1, height: "100%" }}>
            <ReactFlowProvider>
              <FlowChart
                onNodeSelect={setSelectedNode}
                onNodeDelete={deleteNodeRef}
                clearAllRef={clearAllRef}
              />
            </ReactFlowProvider>
          </div>

          {/* Right Side - Details Panel */}
          <DetailsPanel
            selected={selectedNode}
            onClear={handleClearSelection}
          />
        </div>
      </div>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
