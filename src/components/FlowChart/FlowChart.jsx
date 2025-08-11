// import React from "react";
// import ReactFlow from "reactflow";
// import "reactflow/dist/style.css";

// const FlowChart = () => {
//   const nodes = []; // shapes yahan aayenge
//   const edges = []; // connectors yahan aayenge

//   return (
//     <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
//       <ReactFlow nodes={nodes} edges={edges} fitView />
//     </div>
//   );
// };

// export default FlowChart;

import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

const FlowChart = () => {
  const nodes = [
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Square" },
      style: {
        width: 100,
        height: 100,
        border: "2px solid white",
        borderRadius: "5px",
        background: "transparent",
        color: "white",
      },
    },
    {
      id: "2",
      position: { x: 300, y: 100 },
      data: { label: "Circle" },
      style: {
        width: 100,
        height: 100,
        border: "2px solid white",
        borderRadius: "50%",
        background: "transparent",
        color: "white",
      },
    },
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "white" },
    },
  ];

  return (
    // <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default FlowChart;
