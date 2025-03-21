import test, { expect, Page } from "@playwright/test";
import { authenticate, createHeroBlock, deleteFiles, gotoCMS, gotoUI, saveAndPublish } from "./helpers/global-helpers";
import { createSaveAndPublishHeaderSingleType, deleteHeaderSingleType } from "./helpers/header-helpers/header-helpers";
import { MOCK_HERO, MOCK_TICKETS_POPUP } from "./helpers/mocks";
import { deleteHomepage } from "./helpers/homepage-helpers/homepage-helpers";
import { deleteContactZooPage } from "./helpers/contact-zoo-page-helpers/contact-zoo-page-helpers";
import { createSaveAndPublishNewsPage, deleteNewsPage } from "./helpers/news-page-helpers/news-page-helpers";
import { createSaveAndPublishDocumentsPage, deleteDocumentsPage } from "./helpers/documents-page-helpers/documents-page-helpers";

test.describe(`Checking that there is no 404 error`, () => {
  let page: Page;

  test.beforeAll(async ({
    browser,
  }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await gotoCMS({ page });

    await authenticate({
      page,
    });
  });

  test.beforeEach(async () => {
    await gotoCMS({ page });

    await deleteHeaderSingleType();

    await deleteFiles();

    await createSaveAndPublishHeaderSingleType({
      page,
      ticketsPopup: MOCK_TICKETS_POPUP,
    });
  });

  test.afterEach(async () => {
    await deleteHeaderSingleType();

    await deleteFiles();
  });

  test.describe(`Check 404 error on home page E2E test`, () => {
    test.beforeEach(async () => {
      await deleteHomepage();
    });

    test.afterEach(async () => {
      await deleteHomepage();
    });

    test(`
      GIVEN empty home page and header single types
      WHEN filling and publish it
      SHOULD see home page without 404 error
      `,
      async () => await e2eHomePageCheckFor404ErrorTest({ page })
    );
  });

  test.describe(`Check 404 error on contact zoo page E2E test`, () => {
    test.beforeEach(async () => {
      await deleteContactZooPage();
    });

    test.afterEach(async () => {
      await deleteContactZooPage();
    });

    test(`
      GIVEN empty contact zoo page and header single types
      WHEN filling and publish it
      SHOULD see contact zoo page without 404 error
      `,
      async () => await e2eContactZooPageCheckFor404ErrorTest({ page })
    );
  });

  test.describe(`Check 404 error on news page E2E test`, () => {
    test.beforeEach(async () => {
      await deleteNewsPage();
    });

    test.afterEach(async () => {
      await deleteNewsPage();
    });

    test(`
      GIVEN empty news page and header single types
      WHEN filling and publish it
      SHOULD see news page without 404 error
      `,
      async () => await e2eNewsPageCheckFor404ErrorTest({ page })
    );
  });

  test.describe(`Check 404 error on documents page E2E test`, () => {
    test.beforeEach(async () => {
      await deleteDocumentsPage();
    });

    test.afterEach(async () => {
      await deleteDocumentsPage();
    });

    test(`
      GIVEN empty documents page and header single types
      WHEN filling and publish it
      SHOULD see documents page without 404 error
      `,
      async () => await e2eDocumentsPageCheckFor404ErrorTest({ page })
    );
  })
})


async function e2eHomePageCheckFor404ErrorTest({
  page
}: {
  page: Page
}) {
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

  await gotoUI({
    page,
  });

  await expect(page.getByText('404')).not.toBeVisible()
}

async function e2eContactZooPageCheckFor404ErrorTest({
  page
}: {
  page: Page
}) {
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

  await saveAndPublish({ page })

  await gotoUI({
    page,
    path: '/contact-zoo'
  });

  await expect(page.getByText('404')).not.toBeVisible()
}

async function e2eNewsPageCheckFor404ErrorTest({
  page
}: {
  page: Page
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Страница новостей' })
    .click();

  await createSaveAndPublishNewsPage({
    page,
    newsTitle: 'Новости'
  })

  await gotoUI({
    page,
    path: '/news'
  });

  await expect(page.getByText('404')).not.toBeVisible()
}

async function e2eDocumentsPageCheckFor404ErrorTest({
  page
}: {
  page: Page
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Страница документов' })
    .click();

  await createSaveAndPublishDocumentsPage({
    page,
    documentsTitle: 'Документы'
  })

  await gotoUI({
    page,
    path: '/documents'
  });

  await expect(page.getByText('404')).not.toBeVisible()
}