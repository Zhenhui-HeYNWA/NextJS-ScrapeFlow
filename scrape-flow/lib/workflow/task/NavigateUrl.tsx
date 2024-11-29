import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { Link2Icon, MousePointerClick } from 'lucide-react';

export const NavigateUrlTask = {
  type: TaskType.NAVIGATE_URL,
  label: 'Navigate Url',
  icon: (props) => <Link2Icon className="stroke-orange-400" {...props} />,

  isEntryPoint: false,
  credits: 2,
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
      name: 'URL',
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
