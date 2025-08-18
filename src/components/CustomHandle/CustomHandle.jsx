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
  // Giving custom styles for different shapes to achieve a diamond shape when the user
  //  pases shape as
  const shapeStyles = {
    circle: {
      borderRadius: "50%",
      border: `2px solid ${color}`,
      background: "transparent",
    },
    square: {
      borderRadius: "2px",
      border: `2px solid ${color}`,
      background: "transparent",
    },
    diamond: {
      transform: "rotate(45deg)",
      borderRadius: "2px",
      border: `2px solid ${color}`,
      background: "transparent",
    },
  };

  return (
    <>
      <Handle
        {...rest}
        style={{
          width: size,
          height: size,
          ...shapeStyles[shape],
        }}
      />
    </>
  );
};

export default CustomHandle;
