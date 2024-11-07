import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";
import NodeParamFiled from "@/app/workflow/_components/nodes/NodeParamFiled";
export function NodeInputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2 divide-y">{children}</div>;
}

//
export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  return (
    <div className="relative flex w-full justify-start rounded-b-lg bg-secondary p-3">
      <NodeParamFiled param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!-left-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground",
          )}
        />
      )}
    </div>
  );
}
