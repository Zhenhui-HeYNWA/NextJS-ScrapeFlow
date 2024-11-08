import { TaskParamType, TaskType } from "@/types/task";
import { CodeIcon, GlobeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => (
    <CodeIcon className="stroke-rose-400" {...props} />
  ),

  isEntryPoint: false,

  // This task will take a browser instance as input
  inputs: [
    {
      // The name of the input
      name: "Website page",
      // The type of the input
      type: TaskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],

  // This task will output the html of the page
  outputs: [
    {
      // The name of the output
      name: "Html",
      // The type of the output
      type: TaskParamType.STRING,
    },
    {
      // The name of the output is a web page
      name: "Web page",
      // The type of the output is a browser instance
      type: TaskParamType.BROWSER_INSTANCE,
    },
  ],
};
