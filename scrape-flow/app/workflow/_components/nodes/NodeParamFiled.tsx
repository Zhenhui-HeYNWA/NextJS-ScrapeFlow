'use client';

import { TaskParam, TaskParamType } from '@/types/task';
import StringParam from '@/app/workflow/_components/nodes/param/StringParam';
import { useReactFlow } from '@xyflow/react';
import { AppNode } from '@/types/appNode';
import { useCallback } from 'react';
import BrowserInstanceParam from '@/app/workflow/_components/nodes/param/BrowserInstanceParam';
import SelectParam from '@/app/workflow/_components/nodes/param/SelectParam';
import CredentialsParam from '@/app/workflow/_components/nodes/param/CredentialsParam';

function NodeParamFiled({
  param,
  nodeId,
  disabled,
}: {
  param: TaskParam;
  nodeId: string;
  disabled: boolean;
}) {
  const { updateNodeData, getNode } = useReactFlow();

  //compare this snippet from scrape-flow/app/workflow/_components/nodes/NodeParamFiled.tsx:
  const node = getNode(nodeId) as AppNode;

  const value = node?.data.inputs?.[param.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [param.name]: newValue,
        },
      });
    },
    [updateNodeData, param.name, nodeId, node?.data.inputs],
  );
  switch (param.type) {
    case TaskParamType.STRING:
      return (
        <StringParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          param={param}
          value={''}
          updateNodeParamValue={updateNodeParamValue}
        />
      );

    case TaskParamType.SELECT:
      return (
        <SelectParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    case TaskParamType.CREDENTIAL:
      return (
        <CredentialsParam
          param={param}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
          disabled={disabled}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-ts text-muted-foreground">Not implemented</p>
        </div>
      );
  }
}

export default NodeParamFiled;
