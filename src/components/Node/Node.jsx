/*** ⭐⭐⭐✅Version 2 :-- Adding inbuild custom handle shapes that we created ....instead of default handle  */
import React, { useState } from "react";
import { Position } from "reactflow";
import { useTheme } from "../../contexts/ThemeContext";
import CustomHandle from "../CustomHandle/CustomHandle";

const Node = ({ data, children, isConnectable, id }) => {
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data?.label || "");

  // Keep editText in sync with data.label when it changes
  React.useEffect(() => {
    if (!isEditing) {
      setEditText(data?.label || "");
    }
  }, [data?.label, isEditing]);

  const content = data?.content ?? children;
  const isInFlow = !!data;

  const handleColor = isDarkMode ? "#fff" : "#333";
  const labelColor = isDarkMode ? "#fff" : "#333";

  // Check if this is a diamond shape (decision node)
  const isDiamondShape = data?.spec?.shape === "diamond";

  // Calculate handler positions for diamond shape
  const getDiamondHandlerPosition = (position) => {
    // For diamond shape created with SVG polygon, handlers should be at the vertices
    // The diamond vertices are at the center of each side of the container
    switch (position) {
      case Position.Left:
        return {
          left: "0px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case Position.Right:
        return {
          right: "0px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case Position.Top:
        return {
          top: "0px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case Position.Bottom:
        return {
          bottom: "0px",
          left: "50%",
          transform: "translateX(-50%)",
        };
      default:
        return {};
    }
  };

  // Get handler position based on shape type
  const getHandlerPosition = (position) => {
    if (isDiamondShape) {
      return getDiamondHandlerPosition(position);
    }

    // Default positions for other shapes
    switch (position) {
      case Position.Left:
        return { left: "8px" };
      case Position.Right:
        return { right: "8px" };
      case Position.Top:
        return { top: "8px" };
      case Position.Bottom:
        return { bottom: "8px" };
      default:
        return {};
    }
  };

  const handleSingleClick = () => {
    // Enable text editing on single click
    setIsEditing(true);
    setEditText(data?.label || "");
  };

  const handleTextChange = (e) => {
    setEditText(e.target.value);
  };

  const handleTextBlur = () => {
    setIsEditing(false);
    // Update the node data with new text
    if (data && data.onTextChange) {
      data.onTextChange(id, editText);
    }
    // Reset editText to current label to ensure consistency
    setEditText(data?.label || "");
  };

  const handleKeyPress = (e) => {
    // Prevent default ReactFlow shortcuts when editing
    e.stopPropagation();

    if (e.key === "Enter") {
      handleTextBlur();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(data?.label || "");
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* left / incoming handle */}
      {isInFlow && (
        <CustomHandle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          shape="circle"
          size={isDiamondShape ? 6 : 10}
          color={handleColor}
          style={getHandlerPosition(Position.Left)}
        />
      )}

      {/* your visual (Shape or any JSX) */}
      <div className="relative">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyPress}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
              background: "transparent",
              border: "none",
              outline: "none",
              color: labelColor,
              fontSize: "22px",
              fontWeight: "600",
              textAlign: "center",
              width: "100%",
              height: "100%",
              padding: "8px",
              borderRadius: "inherit",
            }}
            autoFocus
          />
        ) : null}
        <div
          onClick={handleSingleClick}
          style={{
            cursor: "pointer",
            position: "relative",
          }}
          title="Click to edit text"
        >
          {isEditing
            ? // Show only the shape without text when editing
              React.cloneElement(content, { hideText: true })
            : content}
        </div>
      </div>

      {/* right / outgoing handle */}
      {isInFlow && (
        <CustomHandle
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          shape="circle"
          size={isDiamondShape ? 6 : 10}
          color={handleColor}
          style={getHandlerPosition(Position.Right)}
        />
      )}

      {/* top handle for all nodes */}
      {isInFlow && (
        <CustomHandle
          id="top"
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          shape="circle"
          size={isDiamondShape ? 6 : 8}
          color={handleColor}
          style={getHandlerPosition(Position.Top)}
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
            style={{ left: "20%", bottom: "8px" }}
          />
          <CustomHandle
            id="ai-b2"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color={handleColor}
            style={{ left: "40%", bottom: "8px" }}
          />
          <CustomHandle
            id="ai-b3"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color={handleColor}
            style={{ left: "60%", bottom: "8px" }}
          />
          <CustomHandle
            id="ai-b4"
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectable}
            shape="circle"
            size={8}
            color={handleColor}
            style={{ left: "80%", bottom: "8px" }}
          />
        </>
      )}

      {/* bottom handle for all other nodes */}
      {isInFlow && data?.label !== "AI Agent" && (
        <CustomHandle
          id="bottom"
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          shape="circle"
          size={isDiamondShape ? 6 : 8}
          color={handleColor}
          style={getHandlerPosition(Position.Bottom)}
        />
      )}
    </div>
  );
};

export default Node;
