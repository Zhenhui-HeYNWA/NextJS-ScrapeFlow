import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { DatabaseIcon, MousePointerClick } from 'lucide-react';

export const AddPropertyToJsonTask = {
  type: TaskType.ADD_PROPERTY_TO_JSON,
  label: 'Add property to JSON',
  icon: (props) => <DatabaseIcon className="stroke-orange-400" {...props} />,

  isEntryPoint: false,
  credits: 1,
  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: 'JSON',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
    {
      // The name of the input
      name: 'Property name',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
    {
      // The name of the input
      name: 'Property value',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,

  // This task will output the html of the page
  outputs: [
    {
      // The name of the output
      name: 'Update JSON',
      // The type of the output
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
