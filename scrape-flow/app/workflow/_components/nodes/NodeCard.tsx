"use client";

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
  return (
    <div className="relative flex h-full w-[422px] items-center justify-center rounded-md">
      <div
        className={cn(
          "absolute inset-0 -translate-x-1 translate-y-1 rounded-lg",
          isSelected &&
            "animate-tilt bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 blur",
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
        className="order-separate relative flex h-[98%] w-[98%] cursor-pointer flex-col justify-center gap-1 rounded-lg bg-background text-xs"
      >
        {children}
      </div>
    </div>
  );
}

export default NodeCard;
