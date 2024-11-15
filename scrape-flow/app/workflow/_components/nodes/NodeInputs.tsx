import { cn } from '@/lib/utils';
import { TaskParam } from '@/types/task';
import { Handle, Position, useEdges } from '@xyflow/react';
import { ReactNode } from 'react';
import NodeParamFiled from '@/app/workflow/_components/nodes/NodeParamFiled';
import { ColorForHandle } from '@/app/workflow/_components/nodes/common';
import useFlowValidation from '@/components/hooks/useFlowValidation';
export function NodeInputs({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

//
export function NodeInput({
  input,
  nodeId,
}: {
  input: TaskParam;
  nodeId: string;
}) {
  const { invalidInputs } = useFlowValidation();
  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name,
  );

  const hasErrors = invalidInputs
    .find((node) => node.nodeId === nodeId)
    ?.inputs.find((invalidInput) => invalidInput === input.name);

  return (
    <div
      className={cn(
        'relative flex w-full justify-start rounded-sm bg-secondary p-2',
        hasErrors && 'border-2 border-destructive/50 bg-destructive/10',
      )}
    >
      <NodeParamFiled param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            '!-left-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground',
            ColorForHandle[input.type],
          )}
        />
      )}
    </div>
  );
}
