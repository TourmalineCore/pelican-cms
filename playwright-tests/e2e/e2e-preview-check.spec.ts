import test, { Page } from "@playwright/test";
import { authenticate, deleteFiles, gotoCMS, gotoUI } from "./helpers/global-helpers";
import { createSaveAndPublishHeaderSingleType, deleteHeaderSingleType } from "./helpers/header-helpers/header-helpers";
import { MOCK_TICKETS_POPUP } from "./helpers/mocks";

test.describe(`Checking the preview mode in CMS and UI`, () => {
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


  test.describe(`Ticket popup preview in draft mode E2E test`, () => {
    test.beforeEach(async () => {
      await deleteHeaderSingleType();

      await deleteFiles();
    });

    test.afterEach(async () => {
      await deleteHeaderSingleType();

      await deleteFiles();
    });

    test(`
      GIVEN empty ticket popup
      WHEN filling in the data for the ticket popup
      AND saving draft version 
      AND opening draft preview
      SHOULD see ticket popup on UI in draft mode
      `,
      async () => await e2eTicketPopupPreviewTest({ page })
    );
  })
})


async function e2eTicketPopupPreviewTest({
  page
}: {
  page: Page
}) {
  await createSaveAndPublishHeaderSingleType({
    page,
    ticketsPopup: MOCK_TICKETS_POPUP,
    onlySave: true
  });

  await gotoUI({
    page,
    path: '/api/preview?secret=secret'
  })

  await page.getByText('Билеты').click();

  await page.getByText(MOCK_TICKETS_POPUP.generalTickets[0].category).waitFor();

  await page.getByTestId('tickets-popup-close-button').click();

  await page.getByText('Выйти из режима черновика').click();
}