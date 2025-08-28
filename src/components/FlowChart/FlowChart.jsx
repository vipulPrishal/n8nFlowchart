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
import { useTheme } from "../../contexts/ThemeContext";
import Node from "../Node/Node";
import Shape from "../Shape/Shape";

const nodeTypes = { custom: Node };

function DecisionBox({ w = 120, h = 120, label, hideText = false }) {
  const { isDarkMode } = useTheme();
  const textColor = isDarkMode ? "#fff" : "#333";
  const borderColor = isDarkMode ? "#fff" : "#333";

  return (
    <div
      style={{
        width: w,
        height: h,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: textColor,
      }}
    >
      <div
        style={{
          width: w,
          height: h,
          transform: "rotate(45deg)",
          border: `2px solid ${borderColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: "rotate(-45deg)",
            textAlign: "center",
            fontSize: 22, // Increased from 18 to 22 for much better readability
            color: textColor,
            lineHeight: "1.2",
            fontWeight: "600",
          }}
        >
          {!hideText && label}
        </div>
      </div>
    </div>
  );
}

const makeContent = (spec, hideText = false) => {
  const label = spec.label;

  // Scale up the dimensions for bigger nodes on canvas
  const scaleFactor = 1.5; // Make nodes 50% bigger
  const scaledW = spec.w * scaleFactor;
  const scaledH = spec.h * scaleFactor;

  if (spec.shape === "circle")
    return (
      <Shape w={scaledW} h={scaledH} radius="50%" hideText={hideText}>
        {label}
      </Shape>
    );
  if (spec.shape === "diamond")
    return (
      <DecisionBox w={scaledW} h={scaledH} label={label} hideText={hideText} />
    );
  return (
    <Shape
      w={scaledW}
      h={scaledH}
      radius={spec.radius || "8px"}
      hideText={hideText}
    >
      {label}
    </Shape>
  );
};

// Create nodes matching the workflow image
const initialNodes = [
  // Trigger Node (Leftmost)
  {
    id: "trigger",
    type: "custom",
    position: { x: -50, y: 300 },
    data: {
      content: (
        <Shape w={340} h={120} radius="8px">
          On 'Create User'
          <br />
          form submission
        </Shape>
      ),
      label: "On 'Create User'\nform submission",
    },
  },

  // AI Agent Node (Central)
  {
    id: "ai-agent",
    type: "custom",
    position: { x: 430, y: 150 },
    data: {
      content: (
        <Shape w={540} h={180} radius="8px">
          AI Agent
        </Shape>
      ),
      label: "AI Agent",
    },
  },

  // Conditional Node (Middle-Right) - Rounded left side like a sign
  {
    id: "conditional",
    type: "custom",
    position: { x: 1050, y: 200 },
    data: {
      content: (
        <Shape w={300} h={180} radius="100px 16px 16px 100px">
          Is
          <br />
          manager?
        </Shape>
      ),
      label: "Is\nmanager?",
    },
  },

  // Slack Action Node (Top-Right)
  {
    id: "slack-add",
    type: "custom",
    position: { x: 1450, y: 60 },
    data: {
      content: (
        <Shape w={360} h={120} radius="8px">
          Add to channel
        </Shape>
      ),
      label: "Add to channel",
    },
  },

  // Slack Action Node (Bottom-Right)
  {
    id: "slack-update",
    type: "custom",
    position: { x: 1450, y: 340 },
    data: {
      content: (
        <Shape w={360} h={120} radius="8px">
          Update profile
        </Shape>
      ),
      label: "Update profile",
    },
  },

  // AI Agent Dependencies (Below AI Agent) - Circles
  {
    id: "anthropic",
    type: "custom",
    position: { x: 520, y: 470 },
    data: {
      content: (
        <Shape w={160} h={160} radius="50%">
          Anthropic
          <br />
          Chat
          <br />
          Model
        </Shape>
      ),
      label: "Anthropic\nChat\nModel",
    },
  },
  {
    id: "postgres",
    type: "custom",
    position: { x: 740, y: 470 },
    data: {
      content: (
        <Shape w={160} h={160} radius="50%">
          Postgres
          <br />
          Chat
          <br />
          Memory
        </Shape>
      ),
      label: "Postgres\nChat\nMemory",
    },
  },
  {
    id: "microsoft",
    type: "custom",
    position: { x: 960, y: 470 },
    data: {
      content: (
        <Shape w={160} h={160} radius="50%">
          Microsoft
          <br />
          Entra ID
        </Shape>
      ),
      label: "Microsoft\nEntra ID",
    },
  },
  {
    id: "jira",
    type: "custom",
    position: { x: 1180, y: 470 },
    data: {
      content: (
        <Shape w={160} h={160} radius="50%">
          Jira
          <br />
          Software
        </Shape>
      ),
      label: "Jira\nSoftware",
    },
  },
];

// Create edges matching the workflow connections - will be updated with theme colors
const initialEdges = [
  // Main workflow connections (solid with arrows)
  {
    id: "e-trigger-ai",
    source: "trigger",
    target: "ai-agent",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },
  {
    id: "e-ai-conditional",
    source: "ai-agent",
    target: "conditional",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },
  {
    id: "e-conditional-slack-add",
    source: "conditional",
    target: "slack-add",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },
  {
    id: "e-conditional-slack-update",
    source: "conditional",
    target: "slack-update",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },

  // AI Agent dependencies from bottom handles
  {
    id: "e-ai-anthropic",
    source: "ai-agent",
    sourceHandle: "ai-b1",
    target: "anthropic",
    targetHandle: "top",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },
  {
    id: "e-ai-postgres",
    source: "ai-agent",
    sourceHandle: "ai-b2",
    target: "postgres",
    targetHandle: "top",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },
  {
    id: "e-ai-microsoft",
    source: "ai-agent",
    sourceHandle: "ai-b3",
    target: "microsoft",
    targetHandle: "top",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },
  {
    id: "e-ai-jira",
    source: "ai-agent",
    sourceHandle: "ai-b4",
    target: "jira",
    targetHandle: "top",
    type: "default",
    style: { strokeWidth: 2 },
    markerEnd: {
      type: "arrowclosed",
      width: 16,
      height: 16,
    },
  },
];

// //  Direct clearAll function
// const clearAll = useCallback(() => {
//   setNodes([]);
//   setEdges([]);
// }, [setNodes, setEdges]);

export default function FlowChart({ onNodeSelect, onNodeDelete, clearAllRef }) {
  const { isDarkMode } = useTheme();
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

  // clear all nodes + edges
  const clearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  // Function to handle text changes in nodes
  const handleNodeTextChange = useCallback(
    (nodeId, newText) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            let updatedContent = node.data.content;

            // For nodes created from palette (have spec)
            if (node.data.spec) {
              // Create a new spec with updated label
              const updatedSpec = {
                ...node.data.spec,
                label: newText,
              };
              updatedContent = makeContent(updatedSpec);
            }
            // For nodes with Shape content (initial nodes), update the children
            else if (
              node.data.content &&
              node.data.content.type &&
              node.data.content.type.name === "Shape"
            ) {
              updatedContent = React.cloneElement(
                node.data.content,
                {},
                newText
              );
            }

            return {
              ...node,
              data: {
                ...node.data,
                label: newText,
                content: updatedContent,
                // Update the spec as well for palette nodes
                ...(node.data.spec && {
                  spec: { ...node.data.spec, label: newText },
                }),
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Add text change handler to existing nodes
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onTextChange: handleNodeTextChange,
        },
      }))
    );
  }, [handleNodeTextChange, setNodes]);

  // Update edge colors when theme changes
  React.useEffect(() => {
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: isDarkMode ? "#fff" : "#333",
        },
        markerEnd: {
          ...edge.markerEnd,
          color: isDarkMode ? "#fff" : "#333",
        },
      }))
    );
  }, [isDarkMode, setEdges]);

  // expose both functions
  React.useEffect(() => {
    if (onNodeDelete) onNodeDelete.current = deleteNode;
    if (clearAllRef) clearAllRef.current = clearAll;
  }, [deleteNode, clearAll, onNodeDelete, clearAllRef]);

  const onConnect = useCallback(
    (params) => {
      // Get the source and target nodes
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      // Prevent connections TO Start node (no incoming connections)
      if (targetNode && targetNode.data.label === "Start") {
        return;
      }

      // Prevent connections FROM End node (no outgoing connections)
      if (sourceNode && sourceNode.data.label === "End") {
        return;
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "default",
            style: { stroke: isDarkMode ? "#fff" : "#333", strokeWidth: 2 },
            markerEnd: {
              type: "arrowclosed",
              width: 16,
              height: 16,
              color: isDarkMode ? "#fff" : "#333",
            },
          },
          eds
        )
      );
    },
    [setEdges, isDarkMode, nodes]
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

      // Check if trying to add Start or End node when one already exists
      if (spec.key === "start" || spec.key === "end") {
        const existingNodes = nodes;
        const existingStartOrEnd = existingNodes.find(
          (node) =>
            (spec.key === "start" && node.data.label === "Start") ||
            (spec.key === "end" && node.data.label === "End")
        );

        if (existingStartOrEnd) {
          // Don't add the node if one already exists
          return;
        }
      }

      const pos = rf.screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const id = `n-${Date.now()}`;
      const newNode = {
        id,
        type: "custom",
        position: pos,
        data: {
          content: makeContent(spec),
          label: spec.label,
          spec,
          onTextChange: handleNodeTextChange,
        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [rf, setNodes, handleNodeTextChange, nodes]
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
        <Background gap={20} color={isDarkMode ? "#333" : "#e0e0e0"} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
