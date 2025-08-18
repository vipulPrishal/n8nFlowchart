import React from "react";
import { getBezierPath } from "reactflow";

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
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const strokeDasharray = dotted ? "6 6" : "0";
  const strokeColor = style.stroke || "#fff";
  const markerId = `arrowhead-${id}`;

  return (
    <>
      {/* Arrowhead marker definition (unique per edge id to avoid collisions) */}
      {arrow && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <marker
              id={markerId}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={strokeColor} />
            </marker>
          </defs>
        </svg>
      )}

      <path
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        strokeDasharray={strokeDasharray}
        markerEnd={arrow ? `url(#${markerId})` : undefined}
        style={
          animated ? { animation: "dash 1.5s linear infinite" } : undefined
        }
      />
    </>
  );
}
