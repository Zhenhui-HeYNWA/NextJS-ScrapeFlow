import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { BrainIcon, MousePointerClick } from 'lucide-react';

export const ExtraDataWithAITask = {
  type: TaskType.EXTRACT_DATA_WITH_AI,
  label: 'Extract data with AI',
  icon: (props) => <BrainIcon className="stroke-rose-400" {...props} />,

  isEntryPoint: false,
  credits: 4,
  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: 'Content',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
    {
      // The name of the input
      name: 'Credentials',
      // The type of the input
      type: TaskParamType.CREDENTIAL,
      required: true,
    },
    {
      // The name of the input
      name: 'Prompt',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea',
    },
  ] as const,

  // This task will output the html of the page
  outputs: [
    {
      // The name of the output
      name: 'Extracted data',
      // The type of the output
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
