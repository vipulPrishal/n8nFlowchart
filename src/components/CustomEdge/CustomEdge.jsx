import React from "react";
import { BaseEdge, getBezierPath } from "reactflow";

/**
 * Props:
 * - dotted: boolean
 * - animated: boolean
 * - color: string
 * - arrow: boolean
 */
export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  dotted = false,
  animated = false,
  arrow = false,
}) {
  // generate the path
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // stroke style
  const strokeDasharray = dotted ? "5,5" : "0";
  const strokeColor = style.stroke || "#fff";

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: strokeColor,
          strokeWidth: 2,
          strokeDasharray,
        }}
      />
      {arrow && (
        <path
          d={edgePath}
          fill="none"
          stroke="none"
          markerEnd="url(#arrowhead)"
        />
      )}

      {/* Marker definition (triangle arrow) */}
      <svg>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={strokeColor} />
          </marker>
        </defs>
      </svg>
    </>
  );
}
