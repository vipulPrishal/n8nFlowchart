import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Shape = ({ w = 100, h = 100, radius = "5px", padding, children }) => {
  const { isDarkMode } = useTheme();

  const borderColor = isDarkMode ? "#fff" : "#333";
  const textColor = isDarkMode ? "#fff" : "#333";

  return (
    <div
      className="border-2 flex items-center justify-center font-medium text-center"
      style={{
        width: `${w}px`, // number → px
        height: `${h}px`, // number → px
        borderRadius: radius,
        paddingBottom: `${padding ? "5px" : "0px"}`, // if padding is true then 10px else 0px
        borderColor: borderColor,
        color: textColor,
        fontSize: "22px", // Increased from 18px to 22px for much better readability
        lineHeight: "1.2",
        fontWeight: "600",
      }}
    >
      {children}
    </div>
  );
};

export default Shape;

/**
 *
 * So what happens when some body passes width we take that width and use the default style
 *   or if some body passes we use that style inside the style object
 *
 *
 */
