import { TaskParamType, TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { LucideProps, TextIcon } from 'lucide-react';

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: 'Extract text from element',
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-rose-400" {...props} />
  ),

  isEntryPoint: false,
  credits: 2,
  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: 'Html',
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea',
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
      name: 'Extracted texts',
      // The type of the output
      type: TaskParamType.STRING,
    },
  ] as const,
} satisfies WorkflowTask;
