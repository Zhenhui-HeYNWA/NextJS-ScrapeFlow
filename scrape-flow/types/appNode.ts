import { Node } from "@xyflow/react";
import { Key } from "lucide-react";
import { TaskType } from "./task";

export interface AppNodeData {
  type: TaskType;
  input: Record<string, string>;
  [Key: string]: any;
}

export interface AppNode extends Node {
  data: AppNodeData;
}
