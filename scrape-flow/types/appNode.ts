import { Node } from "@xyflow/react";
import { Key } from "lucide-react";

import { TaskType, TaskParam } from "@/types/task";

export interface AppNodeData {
  type: TaskType;
  input: Record<string, string>;
  [Key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}

export interface ParamProps {
  param: TaskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
  disabled?: boolean;
}
