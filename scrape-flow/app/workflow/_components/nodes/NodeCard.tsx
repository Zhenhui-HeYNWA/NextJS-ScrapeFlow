"use client";

import useFlowValidation from "@/components/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";
import { ReactNode } from "react";

function NodeCard({
  nodeId,
  children,
  isSelected,
}: {
  nodeId: string;
  isSelected: boolean;
  children: ReactNode;
}) {
  const { getNode, setCenter } = useReactFlow();
  const { invalidInputs } = useFlowValidation();
  const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);
  return (
    <div className="relative flex h-full w-[422px] items-center justify-center rounded-md shadow-lg">
      <div
        className={cn(
          "absolute inset-0 -translate-x-1 translate-y-1 rounded-lg",
          isSelected &&
            "animate-tilt bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 blur",
          hasInvalidInputs &&
            "animate-tilt bg-gradient-to-br from-red-300 via-red-800 to-red-950 blur",
        )}
      ></div>
      <div
        onDoubleClick={() => {
          const node = getNode(nodeId);
          if (!node) return;
          const { position, measured } = node;
          if (!position || !measured) return;
          const { width, height } = measured;
          const x = position.x + width! / 2;
          const y = position.y + height! / 2;

          if (x === undefined || y === undefined) return;

          setCenter(x, y, {
            zoom: 1,
            duration: 500,
          });
        }}
        className="order-separate relative flex h-[100%] w-[98%] cursor-pointer flex-col justify-center gap-1 rounded-lg bg-background pb-1 text-xs"
      >
        {children}
      </div>
    </div>
  );
}

export default NodeCard;
