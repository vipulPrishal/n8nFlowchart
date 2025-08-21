import React from "react";
import { ReactFlowProvider } from "reactflow";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import FlowChart from "./components/FlowChart/FlowChart";
import Palette from "./components/Palette/Palette";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel";

const AppContent = () => {
  const [selectedNode, setSelectedNode] = React.useState(null);
  const deleteNodeRef = React.useRef(null);
  const clearAllRef = React.useRef(null);
  const { isDarkMode } = useTheme();

  const handleClearSelection = () => {
    if (selectedNode && deleteNodeRef.current) {
      // Delete the selected node
      deleteNodeRef.current(selectedNode.id);
      // Clear the selection
      setSelectedNode(null);
    } else {
      // Just clear selection if no node is selected or delete function not available
      setSelectedNode(null);
    }
  };

  return (
    <>
      <div
        className={`app-container w-screen h-screen`}
        style={{
          display: "flex",
          background: isDarkMode ? "#000000" : "#f5f5f5",
          color: isDarkMode ? "#ffffff" : "#333333",
        }}
      >
        {/* <Palette /> */}
        {/* Palette with Clear Canvas button */}
        <Palette onClearAll={() => clearAllRef.current?.()} />

        <div style={{ flex: 1 }}>
          <ReactFlowProvider>
            <FlowChart
              onNodeSelect={setSelectedNode}
              onNodeDelete={deleteNodeRef}
              clearAllRef={clearAllRef}
            />
          </ReactFlowProvider>
        </div>
        <DetailsPanel selected={selectedNode} onClear={handleClearSelection} />
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
