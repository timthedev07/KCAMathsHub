import { FC } from "react";

export const Coin: FC<{ height: number; width: number; className?: string }> = (
  props
) => {
  return (
    <svg
      {...props}
      cache-id="0e816a05d34142ac9c4c73c7b8e35a02"
      id="e69MPVENRun1"
      viewBox="0 0 300 300"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <ellipse
        rx="126.031637"
        ry="126.031637"
        transform="matrix(1.190177 0 0 1.190177 150 150)"
        fill="#1b3f88"
        strokeWidth="0"
      />
      <text
        dx="0"
        dy="0"
        fontFamily="Lora"
        fontSize="15"
        fontWeight="600"
        transform="matrix(14.197335 0 0 14.197088 75.242144 227.862155)"
        fill="#fff"
        strokeWidth="0"
      >
        <tspan y="0" fontWeight="600" strokeWidth="0">
          K
        </tspan>
      </text>
    </svg>
  );
};
