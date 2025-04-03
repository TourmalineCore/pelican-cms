import test, { Page, expect } from "@playwright/test";
import axios from "axios";
import { authenticateWithJwtToken, getStrapiUrl } from "../helpers/global-helpers";
import { deleteHeaderSingleType, createAndPublishHeaderSingleType } from "../helpers/header-helpers/header-helpers";
import { MOCK_TICKETS_POPUP } from "../helpers/mocks";
import qs from "qs";

test.describe(`Header Single Type response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });

    await deleteHeaderSingleType();
  });

  test.afterEach(async () => {
    await deleteHeaderSingleType();
  });

  test(`
      GIVEN empty header single type
      WHEN fill out the header single type
      SHOULD get a response header single type
      `,
    checkHeaderSingleTypeResponseTest
  );
});


async function checkHeaderSingleTypeResponseTest({
  page
}: {
  page: Page
}) {
  const {
    visitingRulesAccordion: {
      images: ticketsPopupImagePath,
      ...expectedVisitingRulesAccordion
    },
    ...expectedTicketsPopup
  } = MOCK_TICKETS_POPUP;

  const expectedHeaderSingleTypeResponse = {
    data: {
      ticketsPopup: {
        ...expectedTicketsPopup,
        visitingRulesAccordion: expectedVisitingRulesAccordion,
      },
    },
  };

  await createAndPublishHeaderSingleType({
    page,
    ticketsPopup: MOCK_TICKETS_POPUP,
  });

  const queryParams = {
    populate: [
      `ticketsPopup.generalTickets`,
      `ticketsPopup.subsidizedTicket.categories`,
      `ticketsPopup.subsidizedTicket.button`,
      `ticketsPopup.visitingRulesAccordion.images`,
      `ticketsPopup.visitingRulesAccordion.button`,
      `ticketsPopup.ticketRefundAccordion.refundBody`,
      `ticketsPopup.ticketRefundAccordion.button`,
      `ticketsPopup.buyTicketsButton`,
    ],
  };

  const headerSingleTypeResponse = (await axios.get(getStrapiUrl({
    path: `/api/header?${qs.stringify(queryParams)}`
  }))).data;

  const ticketsPopupBlock = headerSingleTypeResponse.data.ticketsPopup;

  await expect({
    data: {
      ticketsPopup: {
        generalTicketsLink: ticketsPopupBlock.generalTicketsLink,
        generalTickets: [
          {
            id: 0,
            category: ticketsPopupBlock.generalTickets[0].category,
            price: ticketsPopupBlock.generalTickets[0].price,
          },
        ],
        subsidizedTicket: {
          category: ticketsPopupBlock.subsidizedTicket.category,
          description: ticketsPopupBlock.subsidizedTicket.description,
          categories: [
            {
              id: 0,
              category: ticketsPopupBlock.subsidizedTicket.categories[0].category,
              price: ticketsPopupBlock.subsidizedTicket.categories[0].price,
            },
          ],
          button: {
            label: ticketsPopupBlock.subsidizedTicket.button.label,
            link: ticketsPopupBlock.subsidizedTicket.button.link,
          },
        },
        visitingRulesAccordion: {
          button: {
            label: ticketsPopupBlock.visitingRulesAccordion.button.label,
            link: ticketsPopupBlock.visitingRulesAccordion.button.link,
          },
        },
        ticketRefundAccordion: {
          refundHead: ticketsPopupBlock.ticketRefundAccordion.refundHead,
          refundBody: [
            {
              id: 0,
              refundReason: ticketsPopupBlock.ticketRefundAccordion.refundBody[0].refundReason,
            },
          ],
          button: {
            label: ticketsPopupBlock.ticketRefundAccordion.button.label,
            link: ticketsPopupBlock.ticketRefundAccordion.button.link,
          },
        },
        buyTicketsButton: {
          label: ticketsPopupBlock.buyTicketsButton.label,
          link: ticketsPopupBlock.buyTicketsButton.link,
        },
        note: ticketsPopupBlock.note,
      },
    },
  })
    .toEqual(expectedHeaderSingleTypeResponse);

  await expect(ticketsPopupBlock.visitingRulesAccordion.images[0].url)
    .not
    .toBeNull();
}