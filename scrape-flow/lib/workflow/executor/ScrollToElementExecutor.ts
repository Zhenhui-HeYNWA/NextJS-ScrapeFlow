import { waitFor } from '@/lib/helper/waitFor';
import { ScrollToElementTask } from '@/lib/workflow/task/ScrollToElement';
import { ExecutionEnvironment } from '@/types/executor';

export async function ScrollToElementExecutor(
  environment: ExecutionEnvironment<typeof ScrollToElementTask>,
): Promise<boolean> {
  try {
    const selector = environment.getInput('Selector');
    if (!selector) {
      environment.log.error('input -> selector not defined ');
    }

    await environment.getPage()!.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) {
        throw new Error(`Element with selector {${selector}} not found`);
      }
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }, selector);

    // await waitFor(2000);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
