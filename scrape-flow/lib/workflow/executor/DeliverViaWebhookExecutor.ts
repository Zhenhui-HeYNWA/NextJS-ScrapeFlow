import { ExecutionEnvironment } from '@/types/executor';

import { DeliverViaWebhookTask } from '@/lib/workflow/task/DeliverViaWebhook';

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>,
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput('Target URL');
    if (!targetUrl) {
      environment.log.error('input -> targetUrl not defined ');
    }

    const body = environment.getInput('Body');
    if (!body) {
      environment.log.error('input -> body not defined ');
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const statueCode = response.status;

    if (statueCode !== 200) {
      environment.log.error(`Status code: ${statueCode}`);
      return false;
    }

    const responseBody = await response.json();
    environment.log.info(JSON.stringify(responseBody, null, 4));
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
