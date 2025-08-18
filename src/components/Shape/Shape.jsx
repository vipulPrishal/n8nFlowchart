import React from "react";

const Shape = ({ w = 100, h = 100, radius = "5px", padding, children }) => {
  return (
    <div
      className="border-2 border-white flex items-center justify-center text-white text-xs font-medium text-center"
      style={{
        width: `${w}px`, // number → px
        height: `${h}px`, // number → px
        borderRadius: radius,
        paddingBottom: `${padding ? "5px" : "0px"}`, // if padding is true then 10px else 0px
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
