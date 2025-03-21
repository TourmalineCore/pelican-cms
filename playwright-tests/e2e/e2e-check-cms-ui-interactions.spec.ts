import test, { Page } from "@playwright/test";
import { authenticate, deleteFiles, E2E_SMOKE_NAME_PREFIX, gotoCMS, gotoUI } from "./helpers/global-helpers";
import { createSaveAndPublishNews, deleteNews } from "./helpers/news-helpers/news-helpers";
import { createSaveAndPublishNewsPage, deleteNewsPage } from "./helpers/news-page-helpers/news-page-helpers";
import { createSaveAndPublishHeaderSingleType, deleteHeaderSingleType } from "./helpers/header-helpers/header-helpers";
import { MOCK_TICKETS_POPUP } from "./helpers/mocks";

test.describe(`Checking the interaction between CMS and UI`, () => {
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


  test.describe(`News E2E test`, () => {
    test.beforeEach(async () => {
      await deleteNews();

      await deleteNewsPage();

      await deleteHeaderSingleType();

      await deleteFiles();
    });

    test.afterEach(async () => {
      await deleteNews();

      await deleteNewsPage();

      await deleteHeaderSingleType();

      await deleteFiles();
    });

    test(`
      GIVEN collection of news without record
      WHEN create one news
      SHOULD see news displayed on the UI
      `,
      async () => await e2eNewsCreateAndViewTest({ page })
    );
  })
})


async function e2eNewsCreateAndViewTest({
  page
}: {
  page: Page
}) {
  const title = `${E2E_SMOKE_NAME_PREFIX} В зоопарке появился амурский тигр`;
  const description = `На фотографии изображен амурский тигр!`;
  const innerContent = `В зоопарке появился амурский тигр, приходите посмотреть!`;

  await createSaveAndPublishNewsPage({
    page,
    newsTitle: 'Новости',
  });

  await createSaveAndPublishNews({
    page,
    title,
    description,
    innerContent,
    filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`,
  });

  await createSaveAndPublishHeaderSingleType({
    page,
    ticketsPopup: MOCK_TICKETS_POPUP,
  })

  await gotoUI({
    page,
    path: '/news'
  })

  await page.getByText(title).waitFor();

  await page.getByText(description).waitFor();

  await page.getByTestId(`cards-card`)
    .first()
    .click();

  await page.getByText(innerContent).waitFor();
}