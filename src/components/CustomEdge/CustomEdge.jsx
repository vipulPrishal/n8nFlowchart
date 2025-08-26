import React, { useMemo } from "react";
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

  // Calculate arrow position and angle
  const arrowData = useMemo(() => {
    if (!arrow) return null;

    // Calculate points near the end of the curve to determine direction
    const points = [];
    for (let t = 0.8; t <= 1.0; t += 0.05) {
      // For cubic Bezier: B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃
      const pathMatch = edgePath.match(
        /M\s*([\d.-]+)\s*([\d.-]+)\s*C\s*([\d.-]+)\s*([\d.-]+)\s*([\d.-]+)\s*([\d.-]+)\s*([\d.-]+)\s*([\d.-]+)/
      );

      if (pathMatch) {
        const [, x0, y0, x1, y1, x2, y2, x3, y3] = pathMatch.map(Number);

        const t1 = 1 - t;
        const x =
          t1 * t1 * t1 * x0 +
          3 * t1 * t1 * t * x1 +
          3 * t1 * t * t * x2 +
          t * t * t * x3;
        const y =
          t1 * t1 * t1 * y0 +
          3 * t1 * t1 * t * y1 +
          3 * t1 * t * t * y2 +
          t * t * t * y3;
        points.push({ x, y });
      }
    }

    if (points.length >= 2) {
      // Calculate direction from last two points
      const lastPoint = points[points.length - 1];
      const secondLastPoint = points[points.length - 2];

      const angle =
        Math.atan2(
          lastPoint.y - secondLastPoint.y,
          lastPoint.x - secondLastPoint.x
        ) *
        (180 / Math.PI);

      return {
        x: lastPoint.x,
        y: lastPoint.y,
        angle: angle,
      };
    }

    // Fallback: simple angle calculation
    const angle =
      Math.atan2(targetY - sourceY, targetX - sourceX) * (180 / Math.PI);
    return {
      x: targetX,
      y: targetY,
      angle: angle,
    };
  }, [arrow, edgePath, sourceX, sourceY, targetX, targetY]);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: strokeColor, strokeWidth: 2, strokeDasharray }}
      />

      {arrow && arrowData && (
        <g
          transform={`translate(${arrowData.x}, ${arrowData.y}) rotate(${arrowData.angle})`}
          style={{ pointerEvents: "none" }}
        >
          <path d="M -6 -4 L 0 0 L -6 4 z" fill={strokeColor} stroke="none" />
        </g>
      )}
    </>
  );
}
