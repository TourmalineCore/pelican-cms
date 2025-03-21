import test, { expect, Page } from "@playwright/test";
import { authenticate, createHeroBlock, deleteFiles, gotoCMS, gotoUI, saveAndPublish } from "./helpers/global-helpers";
import { createSaveAndPublishHeaderSingleType, deleteHeaderSingleType } from "./helpers/header-helpers/header-helpers";
import { MOCK_HERO, MOCK_TICKETS_POPUP } from "./helpers/mocks";
import { deleteHomepage } from "./helpers/homepage-helpers/homepage-helpers";
import { createSaveAndPublishNewsPage, deleteNewsPage } from "./helpers/news-page-helpers/news-page-helpers";
import { createSaveAndPublishDocumentsPage, deleteDocumentsPage } from "./helpers/documents-page-helpers/documents-page-helpers";
import { deleteContactZooPage } from "./helpers/contact-zoo-page-helpers/contact-zoo-page-helpers";

test.describe(`Checking that there is no 404 error on all pages`, () => {
  let page: Page;

  test.beforeAll(async ({
    browser,
  }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await page.setViewportSize({
      width: 1366,
      height: 768,
    });

    await gotoCMS({ page });

    await authenticate({
      page,
    });
  });

  test.beforeEach(async () => {
    await clearAllPagesAndFiles()
  });

  test.afterEach(async () => {
    await clearAllPagesAndFiles()
  });

  test(`
    GIVEN empty home page
    AND header single types
    AND contact zoo page
    AND news page
    AND documents page
    WHEN filling and publish it
    SHOULD see all pages without 404 error
    `,
    async () => await e2eAllPageCheckFor404ErrorTest({ page })
  );
})


async function e2eAllPageCheckFor404ErrorTest({
  page
}: {
  page: Page
}) {
  await createSaveAndPublishHeaderSingleType({
    page,
    ticketsPopup: MOCK_TICKETS_POPUP,
  });

  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Главная страница' })
    .click();

  await createHeroBlock({
    page,
    id: 0,
    title: MOCK_HERO.title,
    infoCard: MOCK_HERO.infoCard,
    scheduleCard: MOCK_HERO.scheduleCard,
    filePath: MOCK_HERO.filePath
  });

  await saveAndPublish({ page });

  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Страница контактного зоопарка' })
    .click();

  await createHeroBlock({
    page,
    id: 0,
    title: MOCK_HERO.title,
    infoCard: MOCK_HERO.infoCard,
    scheduleCard: MOCK_HERO.scheduleCard,
    filePath: MOCK_HERO.filePath
  });

  await saveAndPublish({ page });

  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Страница новостей' })
    .click();

  await createSaveAndPublishNewsPage({
    page,
    newsTitle: 'Новости'
  });

  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Страница документов' })
    .click();

  await createSaveAndPublishDocumentsPage({
    page,
    documentsTitle: 'Документы'
  });

  await gotoUI({
    page,
    path: '/contact-zoo'
  });

  await check404Error({ page });

  await page.getByText('Новости')
    .first()
    .click();

  await page.waitForURL('**/news');

  await check404Error({ page });

  await page.getByText('Документы')
    .first()
    .click();

  await page.waitForURL('**/documents');

  await check404Error({ page });

  await page.getByTestId('header-logo').click()

  await page.waitForURL(process.env.FRONTEND_URL || 'http://localhost:3000');

  await check404Error({ page });
}

async function check404Error({
  page
}: {
  page: Page
}) {
  await expect(page.getByText('404')).not.toBeVisible();
}

async function clearAllPagesAndFiles() {
  await deleteHomepage();

  await deleteContactZooPage();

  await deleteNewsPage();

  await deleteDocumentsPage();

  await deleteHeaderSingleType();

  await deleteFiles();
}