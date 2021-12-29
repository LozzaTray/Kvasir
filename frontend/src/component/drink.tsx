import React from "react";
import { IDrink } from "../model/drink";

const Drink: React.FC<IDrink> = (props) => {
  const markerAdjustment = {
    transform: "translate(-50%, -100%)",
    position: "absolute" as const,
  };
  return (
    <div style={markerAdjustment}>
      <svg
        viewBox="-120 -400 240 400"
        width="40px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="rgb(246, 193, 1)" stroke="rgb(0, 0, 0)" strokeWidth="6px">
          <path d="M 0 -80 C 20 -90, 60 -70, 80 -90 C 90 -100, 40 -140, 90 -220  L -90 -220 C -40 -140, -90 -100, -80 -90 C -60 -70, -20 -90, 0 -80 Z" />
          <path d="M 0 0 C 20 -200, 150 -200, 100 -350 L -100 -350 C -150 -200, -20 -200, 0 0" />
        </g>
        <path
          fill="rgb(255, 255, 255)"
          stroke="rgb(0, 0, 0)"
          strokeWidth="6px"
          d="M 100 -350 c -20 -60 -180 -60 -200 0 Z"
        />
        <text
          fill="rgb(0, 0, 0)"
          fontFamily="Arial, sans-serif"
          fontSize="90px"
          x="0"
          y="-250"
          textAnchor="middle"
        >
          {(props.pence / 100).toFixed(2)}
        </text>
      </svg>
    </div>
  );
};

export { Drink };
