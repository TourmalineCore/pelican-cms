import { Page } from "@playwright/test";
import { createHeroBlock, getStrapiUrl, saveAndPublish } from "../global-helpers";
import axios from "axios";

export async function createAndPublishContactZooPage({
  page,
  title,
  infoCard,
  scheduleCard,
  seo,
  filePath,
}: {
  page: Page,
  title: string,
  infoCard: {
    title: string,
    description: string
  },
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

  await page.getByText(`Страница контактного зоопарка`)
    .click();

  await createHeroBlock({
    page,
    title,
    infoCard,
    scheduleCard,
    filePath
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

export async function deleteContactZooPage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/contact-zoo` }));
  } catch { }
}