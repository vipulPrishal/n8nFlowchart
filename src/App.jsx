import React from "react";
import { ReactFlowProvider } from "reactflow";
import FlowChart from "./components/FlowChart/FlowChart";
import Palette from "./components/Palette/Palette";

const App = () => {
  return (
    <>
      <div
        className="bg-black app-container w-screen h-screen"
        style={{ display: "flex" }}
      >
        <Palette />
        <div style={{ flex: 1 }}>
          <ReactFlowProvider>
            <FlowChart />
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

export default App;
