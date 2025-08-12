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
    circle: { borderRadius: "50%" },
    square: { borderRadius: "5px" },
    diamond: {
      transform: "rotate(45deg)",
      borderRadius: "0px",
    },
  };

  return (
    <>
      <Handle
        {...rest}
        style={{
          //   background: color,
          backgroundImage: "url('vite.svg')",
          width: size,
          height: size,
          ...shapeStyles[shape],
          // using square bracket notation apply the correct styles for the
          //    chosen shape ...
        }}
      />
    </>
  );
};

export default CustomHandle;
