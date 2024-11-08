import { TaskParamType, TaskType } from "@/types/task";
import { LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <TextIcon className="stroke-rose-400" {...props} />
  ),

  isEntryPoint: false,

  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: "Html",
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
    {
      // The name of the input
      name: "Selector",
      // The type of the input
      type: TaskParamType.STRING,
      required: true,
    },
  ],

  // This task will output the html of the page
  outputs: [
    {
      // The name of the output
      name: "Extracted texts",
      // The type of the output
      type: TaskParamType.STRING,
    },
  ],
};
