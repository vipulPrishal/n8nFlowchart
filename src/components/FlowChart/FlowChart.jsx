import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import Node from "../Node/Node";
import Shape from "../Shape/Shape";
import CustomEdge from "../CustomEdge/CustomEdge";

const nodeTypes = { custom: Node };
const edgeTypes = { custom: CustomEdge };

// Create nodes matching the workflow image
const initialNodes = [
  // Trigger Node (Leftmost)
  {
    id: "trigger",
    type: "custom",
    position: { x: -50, y: 300 },
    data: {
      content: <Shape w={340} h={120} radius="8px" />,
      label: "On 'Create User'\nform submission",
    },
  },

  // AI Agent Node (Central)
  {
    id: "ai-agent",
    type: "custom",
    position: { x: 430, y: 150 },
    data: {
      content: <Shape w={540} h={180} radius="8px" />,
      label: "AI Agent",
    },
  },

  // Conditional Node (Middle-Right) - Rounded left side like a sign
  {
    id: "conditional",
    type: "custom",
    position: { x: 1050, y: 200 },
    data: {
      content: <Shape w={300} h={180} radius="100px 16px 16px 100px" />,
      label: "Is\nmanager?",
    },
  },

  // Slack Action Node (Top-Right)
  {
    id: "slack-add",
    type: "custom",
    position: { x: 1450, y: 60 },
    data: {
      content: <Shape w={360} h={120} radius="8px" />,
      label: "Add to channel",
    },
  },

  // Slack Action Node (Bottom-Right)
  {
    id: "slack-update",
    type: "custom",
    position: { x: 1450, y: 340 },
    data: {
      content: <Shape w={360} h={120} radius="8px" />,
      label: "Update profile",
    },
  },

  // AI Agent Dependencies (Below AI Agent) - Circles
  {
    id: "anthropic",
    type: "custom",
    position: { x: 520, y: 470 },
    data: {
      content: <Shape w={160} h={160} radius="50%" />,
      label: "Anthropic\nChat\nModel",
    },
  },
  {
    id: "postgres",
    type: "custom",
    position: { x: 740, y: 470 },
    data: {
      content: <Shape w={160} h={160} radius="50%" />,
      label: "Postgres\nChat\nMemory",
    },
  },
  {
    id: "microsoft",
    type: "custom",
    position: { x: 960, y: 470 },
    data: {
      content: <Shape w={160} h={160} radius="50%" />,
      label: "Microsoft\nEntra ID",
    },
  },
  {
    id: "jira",
    type: "custom",
    position: { x: 1180, y: 470 },
    data: {
      content: <Shape w={160} h={160} radius="50%" />,
      label: "Jira\nSoftware",
    },
  },
];

// Create edges matching the workflow connections
const initialEdges = [
  // Main workflow connections (solid with arrows)
  {
    id: "e-trigger-ai",
    source: "trigger",
    target: "ai-agent",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },
  {
    id: "e-ai-conditional",
    source: "ai-agent",
    target: "conditional",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },
  {
    id: "e-conditional-slack-add",
    source: "conditional",
    target: "slack-add",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },
  {
    id: "e-conditional-slack-update",
    source: "conditional",
    target: "slack-update",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },

  // AI Agent dependencies from bottom handles
  {
    id: "e-ai-anthropic",
    source: "ai-agent",
    sourceHandle: "ai-b1",
    target: "anthropic",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },
  {
    id: "e-ai-postgres",
    source: "ai-agent",
    sourceHandle: "ai-b2",
    target: "postgres",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },
  {
    id: "e-ai-microsoft",
    source: "ai-agent",
    sourceHandle: "ai-b3",
    target: "microsoft",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },
  {
    id: "e-ai-jira",
    source: "ai-agent",
    sourceHandle: "ai-b4",
    target: "jira",
    type: "custom",
    style: { stroke: "#fff" },
    data: { arrow: true },
  },
];

function DecisionBox({ w = 120, h = 120, label }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          transform: "rotate(45deg)",
          border: "2px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: "rotate(-45deg)",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

const makeContent = (spec) => {
  const label = spec.label;
  if (spec.shape === "circle")
    return (
      <Shape w={spec.w} h={spec.h} radius="50%">
        {label}
      </Shape>
    );
  if (spec.shape === "diamond")
    return <DecisionBox w={spec.w} h={spec.h} label={label} />;
  return (
    <Shape w={spec.w} h={spec.h} radius={spec.radius || "8px"}>
      {label}
    </Shape>
  );
};

export default function FlowChart({ onNodeSelect, onNodeDelete }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const rf = useReactFlow();

  // Function to delete a node and its connected edges
  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  // Expose deleteNode function to parent component
  React.useEffect(() => {
    if (onNodeDelete) {
      onNodeDelete.current = deleteNode;
    }
  }, [deleteNode, onNodeDelete]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
            style: { stroke: "#fff" },
            data: { arrow: true },
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

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const raw = e.dataTransfer.getData("application/reactflow");
      if (!raw) return;
      const spec = JSON.parse(raw);
      const pos = rf.screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const id = `n-${Date.now()}`;
      const newNode = {
        id,
        type: "custom",
        position: pos,
        data: { content: makeContent(spec), label: spec.label, spec },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [rf, setNodes]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={(e, node) => onNodeSelect?.(node)}
        onPaneClick={() => onNodeSelect?.(null)}
        onSelectionChange={({ nodes: selected }) =>
          onNodeSelect?.(selected?.[0] || null)
        }
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background gap={20} color="#333" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
