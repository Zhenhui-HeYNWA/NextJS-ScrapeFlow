import { ExecutionEnvironment } from '@/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '@/lib/workflow/task/LaunchBrowser';

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>,
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput('Website URL');

    const browser = await puppeteer.launch({
      headless: true, //'false'for testing
    });

    environment.log.info('Browser started successfully');
    environment.setBrowser(browser);
    const page = await browser.newPage();

    page.setViewport({ width: 1920, height: 1080 });

    await page.authenticate({
      username: 'brd-customer-hl_4ffbe993-zone-scrape_flow',
      password: 'bo701epqbfwx',
    });
    await page.goto(websiteUrl);
    environment.setPage(page);
    environment.log.info(`Opened  page at ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
