/*** ⭐⭐⭐✅Version 2 :-- Adding inbuild custom handle shapes that we created ....instead of default handle  */
import React from "react";
import { Position } from "reactflow";
import CustomHandle from "../CustomHandle/CustomHandle";

const Node = ({ data, children, isConnectable }) => {
  const content = data?.content ?? children;
  const isInFlow = !!data;

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
          color="#fff"
        />
      )}

      {/* your visual (Shape or any JSX) */}
      <div className="relative">
        {content}
        {/* Add label below the node */}
        {data?.label && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium text-center max-w-[150px]">
            {data.label}
          </div>
        )}
      </div>

      {/* right / outgoing handle */}
      {isInFlow && (
        <CustomHandle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          shape="circle"
          size={10}
          color="#fff"
        />
      )}

      {/* bottom handles for AI Agent dependencies */}
      {isInFlow && data?.label === "AI Agent" && (
        <>
          <CustomHandle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color="#fff"
            style={{ left: "25%" }}
          />
          <CustomHandle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color="#fff"
            style={{ left: "50%" }}
          />
          <CustomHandle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color="#fff"
            style={{ left: "75%" }}
          />
        </>
      )}
    </div>
  );
};

export default Node;
