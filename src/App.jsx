import React, { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import FlowChart from "./components/FlowChart/FlowChart";
import Palette from "./components/Palette/Palette";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel";
import NavBar from "./components/NavBar/NavBar";
import WorkflowCounter from "./components/WorkflowCounter/WorkflowCounter";
import SearchBar from "./components/SearchBar/SearchBar";
// import "./App.css";

const AppContent = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const workflowCount = 5;
  const activeWorkflowCount = 3;
  const deleteNodeRef = React.useRef(null);
  const clearAllRef = React.useRef(null);
  const { isDarkMode } = useTheme();

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

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

  const handleClearAll = () => {
    if (clearAllRef.current) {
      clearAllRef.current();
    }
  };

  const handleDeleteNode = () => {
    if (deleteNodeRef.current) {
      deleteNodeRef.current();
    }
  };

  return (
    <>
      <div
        className={`h-screen flex flex-col overflow-hidden ${
          isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-800"
        }`}
      >
        {/* NavBar */}
        <NavBar />

        {/* Main content area */}
        <div className="flex-1 flex h-[calc(100vh-80px)] overflow-hidden">
          {/* Left Sidebar */}
          <div
            className={`left-sidebar w-1/5 min-w-60 h-full overflow-y-auto p-4 border-r ${
              isDarkMode
                ? "border-gray-700 bg-gray-900"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            {/* Workflow Counter */}
            <WorkflowCounter
              count={workflowCount}
              activeCount={activeWorkflowCount}
            />

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Palette */}
            <Palette onClearAll={handleClearAll} searchTerm={searchTerm} />
          </div>

          {/* Center - FlowChart */}
          <div className="flex-1 h-full">
            <ReactFlowProvider>
              <FlowChart
                onNodeSelect={handleNodeSelect}
                onNodeDelete={handleDeleteNode}
                clearAllRef={clearAllRef}
              />
            </ReactFlowProvider>
          </div>

          {/* Right Sidebar - Details Panel */}
          <DetailsPanel
            selected={selectedNode}
            onClear={handleClearSelection}
            deleteNodeRef={deleteNodeRef}
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
