import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { SendIcon } from 'lucide-react';

export const DeliverViaWebhookTask = {
  type: TaskType.DELIVER_VIA_WEBHOOK,
  label: 'Deliver via webhook',
  icon: (props) => <SendIcon className="stroke-blue-400" {...props} />,

  isEntryPoint: false,
  credits: 1,
  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: 'Target URL',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
    {
      // The name of the input
      name: 'Body',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
  ] as const,

  // This task will output the html of the page
  outputs: [
    // {
    //   // The name of the output
    //   name: 'Web page ',
    //   // The type of the output
    //   type: TaskParamType.BROWSER_INSTANCE,
    // },
  ] as const,
} satisfies WorkflowTask;
