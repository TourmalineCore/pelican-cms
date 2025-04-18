import test, { expect } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import qs from "qs";
import { getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";
import { MOCK_TICKETS_POPUP } from "../mocks";

const ENDPOINT = `/api/header`;

test.describe(`Header Single Type response tests`, () => {
  test.beforeEach(async () => {
    await updateHeaderSingleTypes();
  });

  test.afterEach(async () => {
    await deleteHeaderSingleType();
  });

  test(`
      GIVEN an empty header single types
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkHeaderSingleTypeResponseTest
  );
});

async function checkHeaderSingleTypeResponseTest() {
  const expectedHeaderSingleTypeResponse = {
    data: MOCK_TICKETS_POPUP
  };

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
    path: `${ENDPOINT}?${qs.stringify(queryParams)}`
  }))).data;

  const ticketsPopupBlock = headerSingleTypeResponse.data.ticketsPopup;

  await expect({
    data: {
      ticketsPopup: {
        generalTicketsLink: ticketsPopupBlock.generalTicketsLink,
        generalTickets: [
          {
            category: ticketsPopupBlock.generalTickets[0].category,
            price: ticketsPopupBlock.generalTickets[0].price,
            description: ticketsPopupBlock.generalTickets[0].description
          },
        ],
        subsidizedTicket: {
          category: ticketsPopupBlock.subsidizedTicket.category,
          description: ticketsPopupBlock.subsidizedTicket.description,
          categories: [
            {
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
  }, 'Header single types response corrected')
    .toEqual(expectedHeaderSingleTypeResponse);

  await expect(ticketsPopupBlock.visitingRulesAccordion.images[0].url)
    .not
    .toBeNull();
}

async function updateHeaderSingleTypes() {
  try {
    const response = await axios.put(`${getStrapiUrl({ path: ENDPOINT })}`, {
      data: {
        ticketsPopup: {
          ...MOCK_TICKETS_POPUP.ticketsPopup,
          visitingRulesAccordion: {
            button: MOCK_TICKETS_POPUP.ticketsPopup.visitingRulesAccordion.button,
            images: [
              {
                id: await getFileIdByName()
              }
            ]
          }
        }
      },
    });

    await expect(response.status, 'Header single types should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test header single types: ${(error as AxiosError).message}`)
  }
}

async function deleteHeaderSingleType() {
  try {
    const response = await axios.delete(getStrapiUrl({
      path: ENDPOINT
    }));

    await expect(response.status, 'Header single types should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test header single types: ${(error as AxiosError).message}`)
  }
}
