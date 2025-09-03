import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Shape = ({
  w = 100,
  h = 100,
  radius = "5px",
  padding,
  children,
  hideText = false,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`border-2 flex items-center justify-center font-semibold text-center text-2xl leading-tight ${
        isDarkMode ? "border-white text-white" : "border-gray-800 text-gray-800"
      }`}
      style={{
        width: `${w}px`, // number → px
        height: `${h}px`, // number → px
        borderRadius: radius,
        paddingBottom: `${padding ? "5px" : "0px"}`, // if padding is true then 10px else 0px
      }}
    >
      {!hideText && children}
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
