// import React from "react";

// const Node = ({ children }) => {
//   return (
//     <>
//       {/* .. */}
//       {children}
//     </>
//   );
// };

// export default Node;

// /***
//  * What is the plan ??
//  *
//  * -- The plan is to make this reusable component that can show the children props of it and we can make it reusable
//  * By changing the inside content of it ....
//  *
//  */

// ---version 2:--- Updated to use inside React Flow---

// src/components/Node/Node.jsx
import React from "react";
import { Handle, Position } from "reactflow";

/**
 * Node works both outside ReactFlow (children) and inside ReactFlow (data.content).
 * When inside ReactFlow, `data` will be present — only then we render Handles.
 */
const Node = ({ data, children, isConnectable }) => {
  const content = data?.content ?? children;
  const isInFlow = !!data; // true when React Flow passes `data`

  return (
    <div className="relative flex items-center justify-center">
      {/* left / incoming handle (visible only inside reactflow) */}
      {isInFlow && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          style={{ background: "#fff", width: 12, height: 12 }}
        />
      )}

      {/* your visual (Shape or any JSX) */}
      <div>{content}</div>

      {/* right / outgoing handle */}
      {isInFlow && (
        <Handle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          style={{ background: "#fff", width: 12, height: 12 }}
        />
      )}
    </div>
  );
};

export default Node;
