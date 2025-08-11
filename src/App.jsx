// import React from "react";
// import Node from "./components/Node/Node.jsx";

// const App = () => {
//   return (
//     <>
//       {/* <div>App</div> */}

//       <div className="app-container w-screen h-screen bg-black ">
//         <Node>
//           <div className="w-[100px] h-[100px] rounded-[5px] border-2 border-[white]"></div>
//         </Node>

//         <Node>
//           <div className="w-[100px] h-[100px] rounded-[50%] border-2 border-[white]"></div>
//         </Node>

//         <Node>
//           <div className="w-[100px] h-[100px] rounded-tl-[35%] rounded-bl-[35%] rounded-tr-[5px] rounded-br-[5px] border-2 border-[white]"></div>
//         </Node>

//         <Node>
//           <div className="w-[250px] h-[100px] rounded-[5px] border-2 border-[white]"></div>
//         </Node>

//         <div className="w-[25px] h-[25px] rounded-[5px] border-2 border-[white] flex items-center justify-center pb-[4px]">
//           {/* <span className="text-red-500  text-[22px] font-bold">+</span> */}
//           <span className="text-[white] text-[22px] font-bold">+</span>
//         </div>

//         <div className="relative border-t border-white w-3/4 mt-4 mx-auto">
//           <div className="absolute w-2 h-2 top-[-5px] left-0 bg-white rounded-full" />
//           <div className="absolute w-2 h-2 top-[-5px] right-0 bg-white rounded-full" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;

// /* <svg>
// <path
//   d="M 100 200 Q 150 150 200 200"
//   stroke="gray"
//   strokeWidth="2"
//   strokeDasharray="5,5"
//   fill="none"
// />
// </svg> */

// // ------------Version 2 :---- using reactflow library instead of doing it manually-------------

// import React from "react";
// import Node from "./components/Node/Node.jsx";
// import FlowChart from "./components/FlowChart/FlowChart";
// import Shape from "./components/Shape/Shape";

// const App = () => {
//   return (
//     <>
//       <div className="app-container  bg-black flex flex-col gap-4 p-4 ">
//         <Node>
//           <Shape radius="5px" />{" "}
//         </Node>
//         <Node>
//           <Shape radius="50%" />
//         </Node>

//         <Node>
//           <Shape radius="35% 5px 5px 35%" /> {/* TL, TR, BR, BL */}
//         </Node>

//         <Node>
//           <Shape w={250} h={100} radius="5px" />
//         </Node>

//         <Node>
//           <Shape w={25} h={25} radius="5px" padding={true}>
//             <span className="text-white text-[22px] font-bold flex items-center justify-center h-full">
//               +
//             </span>
//           </Shape>
//         </Node>
//       </div>

//       {/* ---- */}
//       <div className="bg-black">
//         <FlowChart />
//       </div>
//     </>
//   );
// };

// export default App;

// ------------version 3:--- using default nodes ⭐⭐:---

// ------------Version 2 :---- using reactflow library instead of doing it manually-------------

import React from "react";
import FlowChart from "./components/FlowChart/FlowChart";

const App = () => {
  return (
    <>
      {/* ---- */}
      <div className="bg-black app-container w-screen h-screen ">
        <FlowChart />
      </div>
    </>
  );
};

export default App;
