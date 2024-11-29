import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { Edit3Icon } from 'lucide-react';

export const FillInputTask = {
  type: TaskType.FILL_INPUT,
  label: 'Fill input',
  icon: (props) => <Edit3Icon className="stroke-orange-400" {...props} />,

  isEntryPoint: false,
  credits: 1,
  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: 'Website page',
      // The type of the input
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },

    {
      // The name of the output is a web page
      name: 'Selector',
      // The type of the output is a browser instance
      type: TaskParamType.STRING,
      required: true,
    },
    {
      // The name of the output is a web page
      name: 'Value',
      // The type of the output is a browser instance
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,

  // This task will output the html of the page
  outputs: [
    {
      name: 'Web page',
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
