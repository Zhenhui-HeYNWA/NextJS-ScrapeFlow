"use client";

import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";
import { ColorForHandle } from "@/app/workflow/_components/nodes/common";

export function NodeOutputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="relative flex justify-end rounded-sm bg-secondary p-3">
      <p className="text-xs text-muted-foreground">{output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!-right-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground",
          ColorForHandle[output.type],
        )}
      />
    </div>
  );
}
