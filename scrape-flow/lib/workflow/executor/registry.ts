import { NavigateUrlTask } from './../task/NavigateUrl';
import { LaunchBrowserExecutor } from '@/lib/workflow/executor/LaunchBrowserExecutor';
import { PageToHtmlExecutor } from '@/lib/workflow/executor/PageToHtmlExecutor';
import { ExecutionEnvironment } from '@/types/executor';
import { TaskType } from '@/types/task';
import { WorkflowTask } from '@/types/workflow';
import { ExtractTextFromElementExecutor } from '@/lib/workflow/executor/ExtractTextFromElementExecutor';
import { FillInputExecutor } from '@/lib/workflow/executor/FillInputExecutor';

import { ClickElementExecutor } from '@/lib/workflow/executor/ClickElementExecutor';
import { WaitForElementExecutor } from '@/lib/workflow/executor/WaitForElementExecutor';
import { DeliverViaWebhookExecutor } from '@/lib/workflow/executor/DeliverViaWebhookExecutor';
import { ExtractDataWithAIExecutor } from '@/lib/workflow/executor/ExtractDataWithAIExecutor';
import { ReadPropertyFromJsonExecutor } from '@/lib/workflow/executor/ReadPropertyFromJsonExecutor';
import { AddPropertyToJsonExecutor } from '@/lib/workflow/executor/AddPropertyToJsonExecutor';
import { NavigateUrlExecutor } from '@/lib/workflow/executor/NavigateUrlExecutor';
import { ScrollToElementExecutor } from '@/lib/workflow/executor/ScrollToElementExecutor';

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>,
) => Promise<boolean>;

type RegistryType = {
  [k in TaskType]: ExecutorFn<WorkflowTask & { type: k }>;
};

export const ExecutorRegistry: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR_ELEMENT: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAIExecutor,
  READ_PROPERTY_FROM_JSON: ReadPropertyFromJsonExecutor,
  ADD_PROPERTY_TO_JSON: AddPropertyToJsonExecutor,
  NAVIGATE_URL: NavigateUrlExecutor,
  SCROLL_TO_ELEMENT: ScrollToElementExecutor,
};
