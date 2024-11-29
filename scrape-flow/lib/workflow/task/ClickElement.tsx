import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { MousePointerClick } from 'lucide-react';

export const ClickElementTask = {
  type: TaskType.CLICK_ELEMENT,
  label: 'Click element',
  icon: (props) => (
    <MousePointerClick className="stroke-orange-400" {...props} />
  ),

  isEntryPoint: false,
  credits: 1,
  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: 'Web page',
      // The type of the input
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      // The name of the input
      name: 'Selector',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,

  // This task will output the html of the page
  outputs: [
    {
      // The name of the output
      name: 'Web page ',
      // The type of the output
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ] as const,
} satisfies WorkflowTask;
