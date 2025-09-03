import React from "react";
import { Handle, Position } from "reactflow";

/**
 * CustomHandle lets you reuse any shape for connection points.
 * Props:
 * - shape: "circle" | "square" | "diamond" | "custom"
 * - size: number
 * - color: string
 */

const CustomHandle = ({
  shape = "circle",
  size = 10,
  color = "#fff",
  ...rest
}) => {
  // Helper function to get Tailwind classes based on shape
  const getShapeClasses = (shape) => {
    switch (shape) {
      case "circle":
        return "rounded-full border-2 bg-transparent";
      case "square":
        return "rounded-sm border-2 bg-transparent";
      case "diamond":
        return "rotate-45 rounded-sm border-2 bg-transparent";
      default:
        return "rounded-full border-2 bg-transparent";
    }
  };

  return (
    <>
      <Handle
        {...rest}
        className={getShapeClasses(shape)}
        style={{
          width: size,
          height: size,
          borderColor: color,
        }}
      />
    </>
  );
};

export default CustomHandle;
