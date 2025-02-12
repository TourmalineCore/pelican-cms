import { Page } from "@playwright/test";
import { getStrapiUrl, saveAndPublish, uploadFile } from "../global-helpers";
import axios from "axios";

export async function createAndPublishHomepage({
  page,
  hero,
  textAndMedia,
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
  textAndMedia: {
    title,
    description,
    filePath: string,
  }
  seo: {
    metaTitle: string,
    metaDescription: string
  }
}) {
  await page.getByText(`Content Manager`)
    .click();

  await page.getByText(`Главная страница`)
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

  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'TextAndMedia'
  }).click();

  await page.locator('id=blocks.1.title')
    .fill(textAndMedia.title);

  await page.locator('id=blocks.1.description')
    .fill(textAndMedia.description);

  await uploadFile({
    page,
    filePath: textAndMedia.filePath,
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

export async function deleteHomepage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/home` }));
  } catch { }
}