import { Page } from "@playwright/test";
import { getStrapiUrl, saveAndPublish, uploadFile } from "../global-helpers";
import axios from "axios";

export async function createAndPublishContactZooPage({
  page,
  hero,
  seo,
}: {
  page: Page,
  hero: {
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
    filePath: string,
  },
  seo: {
    metaTitle: string,
    metaDescription: string
  },
}) {
  await page.getByText(`Content Manager`)
    .click();

  await page.getByText(`Страница контактного зоопарка`)
    .click();

  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'Hero'
  }).click();

  await page.locator('id=blocks.0.title')
    .fill(hero.title);

  await uploadFile({
    page,
    filePath: hero.filePath,
  });

  await page.locator('id=blocks.0.infoCard.title')
    .fill(hero.infoCard.title);

  await page.locator('id=blocks.0.infoCard.description')
    .fill(hero.infoCard.description);

  await page.getByText('No entry yet. Click on the button below to add one.')
    .first()
    .click();

  await page.locator('id=blocks.0.scheduleCard.title')
    .fill(hero.scheduleCard.title);

  await page.locator('id=blocks.0.scheduleCard.timetable.0.days')
    .fill(hero.scheduleCard.timetable[0].days);

  await page.locator('id=blocks.0.scheduleCard.timetable.0.time')
    .fill(hero.scheduleCard.timetable[0].time);

  await page.locator('id=blocks.0.scheduleCard.timetable.0.ticketsOfficeTime')
    .fill(hero.scheduleCard.timetable[0].ticketsOfficeTime);

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