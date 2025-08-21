import React from "react";
import { BaseEdge, getBezierPath } from "reactflow";
import { useTheme } from "../../contexts/ThemeContext";

/**
 * data options (passed via edge.data):
 * - dotted: boolean
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
  data = {},
}) {
  const { isDarkMode } = useTheme();
  const { dotted = false, arrow = true } = data || {};

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const strokeDasharray = dotted ? "6 6" : "0";
  // Use theme-aware color with fallback
  const strokeColor = style.stroke || (isDarkMode ? "#fff" : "#333");

  // unique marker per edge to avoid collisions
  const markerId = `rf-arrow-${id}`;

  return (
    <>
      {arrow && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9.2" // positions the tip at the end of the path
              refY="5"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
            </marker>
          </defs>
        </svg>
      )}

      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: strokeColor, strokeWidth: 2, strokeDasharray }}
        markerEnd={arrow ? `url(#${markerId})` : undefined}
      />
    </>
  );
}
