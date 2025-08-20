import React from "react";
import { ReactFlowProvider } from "reactflow";
import FlowChart from "./components/FlowChart/FlowChart";
import Palette from "./components/Palette/Palette";
import DetailsPanel from "./components/DetailsPanel/DetailsPanel";

const App = () => {
  const [selectedNode, setSelectedNode] = React.useState(null);
  const deleteNodeRef = React.useRef(null);
  const clearAllRef = React.useRef(null);

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
        className="bg-black app-container w-screen h-screen"
        style={{ display: "flex" }}
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

export default App;
