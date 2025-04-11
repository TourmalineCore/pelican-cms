import { Page } from "@playwright/test";
import { getStrapiUrl, saveAndPublish, uploadFile } from "../global-helpers";
import axios from "axios";
import { TicketsPopupBlock } from "../types";

export async function createAndPublishHeaderSingleType({
  page,
  ticketsPopup,
}: {
  page: Page,
  ticketsPopup: TicketsPopupBlock,
}) {
  const {
    generalTicketsLink,
    generalTickets,
    subsidizedTicket,
    visitingRulesAccordion,
    ticketRefundAccordion,
    buyTicketsButton,
    note,
  } = ticketsPopup;

  await page.locator('a[aria-label="Content Manager"]')
    .click();


  await page.locator(`a`, { hasText: 'Шапка сайта' })
    .click();

  await createTicketsPopupBlock({
    page,
    generalTicketsLink,
    generalTickets,
    subsidizedTicket,
    visitingRulesAccordion,
    ticketRefundAccordion,
    buyTicketsButton,
    note,
  });

  await saveAndPublish({ page });
}

export async function deleteHeaderSingleType() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/header` }));
  } catch { }
}

export async function createTicketsPopupBlock({
  page,
  generalTicketsLink,
  generalTickets,
  subsidizedTicket,
  visitingRulesAccordion,
  ticketRefundAccordion,
  buyTicketsButton,
  note,
}: {
  page: Page,
} & TicketsPopupBlock) {
  await page.locator('[name="ticketsPopup.generalTicketsLink"]')
    .fill(generalTicketsLink);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.waitForTimeout(1000);

  await page.locator('[name="ticketsPopup.generalTickets.0.category"]')
    .fill(generalTickets[0].category);

  await page.locator('[name="ticketsPopup.generalTickets.0.price"]')
    .fill(generalTickets[0].price);

  await page.locator('[name="ticketsPopup.subsidizedTicket.category"]')
    .fill(subsidizedTicket.category);

  await page.locator('[name="ticketsPopup.subsidizedTicket.description"]')
    .fill(subsidizedTicket.description);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.locator('[name="ticketsPopup.subsidizedTicket.categories.0.category"]')
    .fill(subsidizedTicket.categories[0].category);

  await page.locator('[name="ticketsPopup.subsidizedTicket.categories.0.price"]')
    .fill(subsidizedTicket.categories[0].price);

  await page.locator('[name="ticketsPopup.subsidizedTicket.button.label"]')
    .fill(subsidizedTicket.button.label);

  await uploadFile({
    page,
    filePath: visitingRulesAccordion.images[0].url,
  });

  await page.locator('[name="ticketsPopup.visitingRulesAccordion.button.label"]')
    .fill(visitingRulesAccordion.button.label);

  await page.locator('[name="ticketsPopup.visitingRulesAccordion.button.link"]')
    .fill(visitingRulesAccordion.button.link);

  await page.locator('[name="ticketsPopup.ticketRefundAccordion.refundHead"]')
    .fill(ticketRefundAccordion.refundHead);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.locator('[name="ticketsPopup.ticketRefundAccordion.refundBody.0.refundReason"]')
    .fill(ticketRefundAccordion.refundBody[0].refundReason);

  await page.locator('[name="ticketsPopup.ticketRefundAccordion.button.label"]')
    .fill(ticketRefundAccordion.button.label);

  await page.locator('[name="ticketsPopup.ticketRefundAccordion.button.link"]')
    .fill(ticketRefundAccordion.button.link);

  await page.locator('[name="ticketsPopup.buyTicketsButton.label"]')
    .fill(buyTicketsButton.label);

  await page.locator('[name="ticketsPopup.buyTicketsButton.link"]')
    .fill(buyTicketsButton.link);

  await page.locator('[name="ticketsPopup.note"]')
    .fill(note);
}