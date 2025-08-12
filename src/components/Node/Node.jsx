// // ---version 1:--- Updated to use inside React Flow---

// import React from "react";
// import { Handle, Position } from "reactflow";

// /**
//  * Node works both outside ReactFlow (children) and inside ReactFlow (data.content).
//  * When inside ReactFlow, `data` will be present — only then we render Handles.
//  */
// const Node = ({ data, children, isConnectable }) => {
//   const content = data?.content ?? children;
//   const isInFlow = !!data; // true when React Flow passes `data`

//   return (
//     <div className="relative flex items-center justify-center">
//       {/* left / incoming handle (visible only inside reactflow) */}
//       {isInFlow && (
//         <Handle
//           type="target"
//           position={Position.Left}
//           isConnectable={isConnectable}
//           style={{ background: "#fff", width: 12, height: 12 }}
//         />
//       )}

//       {/* your visual (Shape or any JSX) */}
//       <div>{content}</div>

//       {/* right / outgoing handle */}
//       {isInFlow && (
//         <Handle
//           type="source"
//           position={Position.Right}
//           isConnectable={isConnectable}
//           style={{ background: "#fff", width: 12, height: 12 }}
//         />
//       )}
//     </div>
//   );
// };

// export default Node;

/*** ⭐⭐⭐✅Version 2 :-- Adding inbuild custom handle shapes that we created ....instead of default handle  */
import React from "react";
import { Position } from "reactflow";
import CustomHandle from "../CustomHandle/CustomHandle"; // <-- import your custom handle

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
          shape="diamond"
          size={10}
          color="red"
        />
      )}

      {/* your visual (Shape or any JSX) */}
      <div>{content}</div>

      {/* right / outgoing handle */}
      {isInFlow && (
        <CustomHandle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          shape="circle" // you can change shape here
          size={10}
          color="blue"
        />
      )}
    </div>
  );
};

export default Node;
