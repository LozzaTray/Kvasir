import React, { MouseEventHandler } from "react";
import { black, drinks, white } from "utils/colors";
import { ClusterDiv } from "./styles";

interface ClusterProps {
    count: number;
    lat: number;
    lng: number;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const Cluster: React.FC<ClusterProps> = ({ count, onClick }) => {
    return (
        <ClusterDiv onClick={onClick}>
            <svg
                viewBox="-200 -400 400 600"
                width="70px"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="6px"
                stroke="black"
            >
                <circle cx="0" cy="0" r="194" fill="blue" opacity="0.3" />
                <g fill={drinks.lager} stroke={black} strokeWidth="6px">
                    <path d="M 0 -80 C 20 -90, 60 -70, 80 -90 C 90 -100, 40 -140, 90 -220  L -90 -220 C -40 -140, -90 -100, -80 -90 C -60 -70, -20 -90, 0 -80 Z" />
                    <path d="M 0 0 C 20 -200, 150 -200, 100 -350 L -100 -350 C -150 -200, -20 -200, 0 0" />
                </g>
                <path
                    fill={white}
                    stroke={black}
                    strokeWidth="6px"
                    d="M 100 -350 c -20 -60 -180 -60 -200 0 Z"
                />
                <text
                    fill={black}
                    fontFamily="Arial, sans-serif"
                    fontSize="90px"
                    x="0"
                    y="-250"
                    textAnchor="middle"
                    strokeWidth="0px"
                >
                    {`#${count.toFixed(0)}`}
                </text>
            </svg>
        </ClusterDiv>
    );
};

export { Cluster };
