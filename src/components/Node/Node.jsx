/*** ⭐⭐⭐✅Version 2 :-- Adding inbuild custom handle shapes that we created ....instead of default handle  */
import React from "react";
import { Position } from "reactflow";
import { useTheme } from "../../contexts/ThemeContext";
import CustomHandle from "../CustomHandle/CustomHandle";

const Node = ({ data, children, isConnectable }) => {
  const { isDarkMode } = useTheme();
  const content = data?.content ?? children;
  const isInFlow = !!data;

  const handleColor = isDarkMode ? "#fff" : "#333";
  const labelColor = isDarkMode ? "#fff" : "#333";

  return (
    <div className="relative flex items-center justify-center">
      {/* left / incoming handle */}
      {isInFlow && (
        <CustomHandle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          shape="circle"
          size={10}
          color={handleColor}
        />
      )}

      {/* your visual (Shape or any JSX) */}
      <div className="relative">
        {content}
        {/* Removed the duplicate label below the node */}
      </div>

      {/* right / outgoing handle */}
      {isInFlow && (
        <CustomHandle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          shape="circle"
          size={10}
          color={handleColor}
        />
      )}

      {/* bottom handles for AI Agent dependencies */}
      {isInFlow && data?.label === "AI Agent" && (
        <>
          <CustomHandle
            id="ai-b1"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color={handleColor}
            style={{ left: "20%" }}
          />
          <CustomHandle
            id="ai-b2"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color={handleColor}
            style={{ left: "40%" }}
          />
          <CustomHandle
            id="ai-b3"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color={handleColor}
            style={{ left: "60%" }}
          />
          <CustomHandle
            id="ai-b4"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color={handleColor}
            style={{ left: "80%" }}
          />
        </>
      )}
    </div>
  );
};

export default Node;
