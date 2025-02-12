import { Page } from "@playwright/test";
import { createHeroBlock, getStrapiUrl, saveAndPublish, uploadFile } from "../global-helpers";
import axios from "axios";

export async function createAndPublishHomepage({
  page,
  title,
  infoCard,
  scheduleCard,
  cards,
  seo,
  filePath,
}: {
  page: Page,
  title: string,
  infoCard: {
    title: string,
    description: string
  },
  cards: {
    title: string,
    description: string,
    link: string,
    labels: {
      text: string
    }[]
  }[],
  scheduleCard: {
    title: string,
    timetable: {
      days: string,
      time: string,
      ticketsOfficeTime: string
    }[]
  }
  seo: {
    metaTitle: string,
    metaDescription: string
  }
  filePath: string
}) {
  await page.getByText(`Content Manager`)
    .click();

  await page.getByText(`Главная страница`)
    .click();

  await createHeroBlock({
    page,
    title,
    infoCard,
    scheduleCard,
    filePath
  });

  await createCardsBlock({
    page,
    title: cards[0].title,
    description: cards[0].description,
    link: cards[0].link,
    labels: cards[0].labels[0],
    filePath,
  });

  await page.getByText('No entry yet. Click on the button below to add one.')
    .last()
    .click();

  await page.locator('id=seo.metaTitle')
    .fill(seo.metaTitle);

  await page.locator('id=seo.metaDescription')
    .fill(seo.metaDescription);

  await saveAndPublish({ page });
}

async function createCardsBlock({
  page,
  title,
  description,
  link,
  labels,
  filePath
}: {
  page: Page,
  title: string,
  description: string,
  link: string,
  labels: {
    text: string
  },
  filePath: string
}) {
  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'Cards'
  }).click();

  await page.getByText('No entry yet. Click on the button below to add one.')
    .first()
    .click();

  await page.locator('id=blocks.1.cards.0.title')
    .fill(title);

  await page.locator('id=blocks.1.cards.0.description')
    .fill(description);

  await uploadFile({
    page,
    filePath,
  });

  await page.locator('id=blocks.1.cards.0.link')
    .fill(link);

  await page.getByText('No entry yet. Click on the button below to add one.')
    .first()
    .click();

  await page.locator('id=blocks.1.cards.0.labels.0.text')
    .fill(labels.text);
}

export async function deleteHomepage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/home` }));
  } catch { }
}