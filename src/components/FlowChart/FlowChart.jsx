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
import CustomEdge from "../CustomEdge/CustomEdge";

const nodeTypes = { custom: Node };
const edgeTypes = { custom: CustomEdge };

// Create nodes matching the workflow image
const initialNodes = [
  // Trigger Node (Leftmost)
  {
    id: "trigger",
    type: "custom",
    position: { x: 40, y: 270 },
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
    dotted: false,
    animated: false,
    arrow: true,
  },
  {
    id: "e-ai-conditional",
    source: "ai-agent",
    target: "conditional",
    type: "custom",
    style: { stroke: "#fff" },
    dotted: false,
    animated: false,
    arrow: true,
  },
  {
    id: "e-conditional-slack-add",
    source: "conditional",
    target: "slack-add",
    type: "custom",
    style: { stroke: "#fff" },
    dotted: false,
    animated: false,
    arrow: true,
  },
  {
    id: "e-conditional-slack-update",
    source: "conditional",
    target: "slack-update",
    type: "custom",
    style: { stroke: "#fff" },
    dotted: false,
    animated: false,
    arrow: true,
  },

  // AI Agent dependencies (solid, no arrows)
  {
    id: "e-ai-anthropic",
    source: "ai-agent",
    target: "anthropic",
    type: "custom",
    style: { stroke: "#fff" },
    dotted: false,
    animated: false,
    arrow: false,
  },
  {
    id: "e-ai-postgres",
    source: "ai-agent",
    target: "postgres",
    type: "custom",
    style: { stroke: "#fff" },
    dotted: false,
    animated: false,
    arrow: false,
  },
  {
    id: "e-ai-microsoft",
    source: "ai-agent",
    target: "microsoft",
    type: "custom",
    style: { stroke: "#fff" },
    dotted: false,
    animated: false,
    arrow: false,
  },
  {
    id: "e-ai-jira",
    source: "ai-agent",
    target: "jira",
    type: "custom",
    style: { stroke: "#fff" },
    dotted: false,
    animated: false,
    arrow: false,
  },
];

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
            style: { stroke: "#fff" },
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
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
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
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <Background gap={20} color="#333" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
