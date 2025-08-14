// // ---version 1 :---- Now importing my nodes in the Flowchart.jsx and using them as the node3s of react flow---
// // src/components/FlowChart/FlowChart.jsx
// import React, { useCallback } from "react";
// import ReactFlow, {
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
// } from "reactflow";
// import "reactflow/dist/style.css";

// import Node from "../Node/Node";
// import Shape from "../Shape/Shape";

// // ⭐⭐⭐We’ll use nodeTypes so that when a node’s type is "custom", it uses your Node + Shape setup.

// /**
//  * Use your existing Node component as the React Flow node renderer.
//  * We put the Shape JSX inside data.content so Node can render it.
//  */

// // const nodeTypes = {
// //   custom: ({ data }) => (
// //     <Node>
// //       <Shape w={data.w} h={data.h} radius={data.radius} padding={data.padding}>
// //         {data.label}
// //       </Shape>
// //     </Node>
// //   ),
// // };

// const nodeTypes = { custom: Node };

// // ⭐⭐ Step 3 — Create your nodes array (here i can use my own nodes instead of relying on the dataof reactflow)

// const initialNodes = [
//   {
//     id: "1",
//     type: "custom",
//     position: { x: 100, y: 100 },
//     data: { content: <Shape w={100} h={100} radius="5px" /> },
//   },
//   {
//     id: "2",
//     type: "custom",
//     position: { x: 320, y: 100 },
//     data: { content: <Shape w={100} h={100} radius="50%" /> },
//   },
//   {
//     id: "3",
//     type: "custom",
//     position: { x: 540, y: 100 },
//     data: { content: <Shape w={250} h={100} radius="5px" /> },
//   },
//   {
//     id: "4",
//     type: "custom",
//     position: { x: 760, y: 100 },
//     data: {
//       content: (
//         <Shape w={25} h={25} radius="5px" padding>
//           <span className="text-white text-[22px] font-bold flex items-center justify-center h-full">
//             +
//           </span>
//         </Shape>
//       ),
//     },
//   },
// ];

// const initialEdges = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     type: "smoothstep",
//     style: { stroke: "#fff", strokeDasharray: "5,5" }, // dotted white
//   },
// ];

// export default function FlowChart() {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

//   // called when user drags from a handle to another and releases
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge({ ...params }, eds)),
//     [setEdges]
//   );

//   return (
//     <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         nodeTypes={nodeTypes}
//         fitView
//       >
//         <Background gap={16} color="#222" />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// }

// ----Version 2:--- Adding custom edges also -------------

import React, { useCallback } from "react";

import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import Node from "../Node/Node";
import Shape from "../Shape/Shape";
import CustomEdge from "../CustomEdge/CustomEdge"; // add this import

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
const edgeTypes = { custom: CustomEdge }; // Added custom edge types
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

// const initialEdges = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     type: "smoothstep",
//     style: { stroke: "#fff", strokeDasharray: "5,5" }, // dotted white
//   },
// ];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "custom", // IMPORTANT: use your custom edge type
    style: { stroke: "#fff" },
    dotted: true, // static dotted
    animated: false,
    arrow: true, // draw arrowhead at end
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "custom",
    style: { stroke: "#0ff" },
    dotted: true,
    animated: true, // animated dashed
    arrow: true,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "custom",
    style: { stroke: "#ff0" },
    dotted: false, // plain solid
    animated: false,
    arrow: true,
  },
];

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // called when user drags from a handle to another and releases
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge({ ...params }, eds)),
  //   [setEdges]
  // );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom", // use our custom edge
            style: { stroke: "#fff" }, // default color
            dotted: false,
            animated: false,
            arrow: true,
          },
          eds
        )
      ),
    [setEdges]
  );

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
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
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background gap={16} color="#222" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
