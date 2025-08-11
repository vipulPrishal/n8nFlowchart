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

// import React from "react";
// import ReactFlow from "reactflow";
// import "reactflow/dist/style.css";

// const FlowChart = () => {
//   const nodes = [
//     {
//       id: "1",
//       position: { x: 100, y: 100 },
//       data: { label: "Square" },
//       style: {
//         width: 100,
//         height: 100,
//         border: "2px solid white",
//         borderRadius: "5px",
//         background: "transparent",
//         color: "white",
//       },
//     },
//     {
//       id: "2",
//       position: { x: 300, y: 100 },
//       data: { label: "Circle" },
//       style: {
//         width: 100,
//         height: 100,
//         border: "2px solid white",
//         borderRadius: "50%",
//         background: "transparent",
//         color: "white",
//       },
//     },
//   ];

//   const edges = [
//     {
//       id: "e1-2",
//       source: "1",
//       target: "2",
//       animated: true,
//       style: { stroke: "white" },
//     },
//   ];

//   return (
//     // <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
//     <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
//       <ReactFlow nodes={nodes} edges={edges} fitView />
//     </div>
//   );
// };

// export default FlowChart;

// ---version 3 :---- Now importing my nodes in the Flowchart.jsx and using them as the node3s of react flow---
// src/components/FlowChart/FlowChart.jsx
import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

import Node from "../Node/Node";
import Shape from "../Shape/Shape";

// ⭐⭐⭐We’ll use nodeTypes so that when a node’s type is "custom", it uses your Node + Shape setup.

/**
 * Use your existing Node component as the React Flow node renderer.
 * We put the Shape JSX inside data.content so Node can render it.
 */

// const nodeTypes = {
//   custom: ({ data }) => (
//     <Node>
//       <Shape w={data.w} h={data.h} radius={data.radius} padding={data.padding}>
//         {data.label}
//       </Shape>
//     </Node>
//   ),
// };

const nodeTypes = { custom: Node };

// ⭐⭐ Step 3 — Create your nodes array (here i can use my own nodes instead of relying on the dataof reactflow)

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: { content: <Shape w={100} h={100} radius="5px" /> },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 320, y: 100 },
    data: { content: <Shape w={100} h={100} radius="50%" /> },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 540, y: 100 },
    data: { content: <Shape w={250} h={100} radius="5px" /> },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 760, y: 100 },
    data: {
      content: (
        <Shape w={25} h={25} radius="5px" padding>
          <span className="text-white text-[22px] font-bold flex items-center justify-center h-full">
            +
          </span>
        </Shape>
      ),
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    style: { stroke: "#fff", strokeDasharray: "5,5" }, // dotted white
  },
];

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // called when user drags from a handle to another and releases
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params }, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background gap={16} color="#222" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
