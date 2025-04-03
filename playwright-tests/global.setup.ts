import { Page, test as setup } from "@playwright/test";
import path from 'path';
import { authenticate, getStrapiUrl, gotoCMS } from './e2e/helpers/global-helpers';
import fs from 'fs';

const authFile = path.join(__dirname, '/.auth/user.json');

setup('authenticate and upload test files', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await gotoCMS({ page });
  await authenticate({ page });

  await page.waitForURL(getStrapiUrl({ path: '/admin' }));

  const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));

  const authDir = path.dirname(authFile);
  fs.mkdirSync(authDir, { recursive: true });

  fs.writeFileSync(authFile, sessionStorage, 'utf-8');

  await page.locator('a[aria-label="Media Library"]')
    .click();

  await uploadFile({
    page,
    filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`
  });

  await uploadFile({
    page,
    filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-new-document.pdf`
  });

  await uploadFile({
    page,
    filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-text-and-media-video.mp4`
  });
});

async function uploadFile({
  page,
  filePath,
}: {
  page: Page
  filePath: string,
}) {
  await page.getByRole(`button`, {
    name: `Add new assets`,
  })
    .click()

  await page.locator('input[name="files"]')
    .setInputFiles(filePath);

  await page.getByText(`Upload 1 asset to the library`)
    .click();

  await page.waitForTimeout(1500);
}