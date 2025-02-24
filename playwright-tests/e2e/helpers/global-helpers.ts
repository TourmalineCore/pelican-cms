import { Page } from "@playwright/test";
import axios from "axios";
import 'dotenv/config';
import { HeroBlock, ImageWithButtonGridBlock, SeoBlock, TextAndMediaBlock } from "./types";

export const E2E_SMOKE_NAME_PREFIX = `[E2E-SMOKE]`;

export async function gotoCMS({
  page
}: {
  page: Page
}) {
  await page.goto(getStrapiUrl({ path: '/admin' }), {
    waitUntil: 'networkidle'
  })
}

export async function gotoUI({
  page,
  path,
}: {
  page: Page
  path?: string
}) {
  await page.goto(`${process.env.FRONTEND_URL}/${path}` || `http://localhost:40110/${path}`, {
    waitUntil: 'networkidle'
  })
}

export function getStrapiUrl({
  path
}: {
  path: string
}) {
  return `${process.env.SERVER_URL || 'http://localhost:1337'}${path}`
}

export async function authenticate({
  page,
}: {
  page: Page,
}) {
  await page.getByRole(`textbox`)
    .first()
    .fill(`admin@init-strapi-admin.strapi.io`);

  await page.getByRole(`textbox`)
    .last()
    .fill(`admin`);

  await page.getByText(`Login`)
    .click();
}

export async function uploadFile({
  page,
  filePath,
}: {
  page: Page
  filePath: string,
}) {
  await page.getByText(`Click to add an asset or drag and drop one in this area`)
    .first()
    .click();

  await page.getByRole(`button`, {
    name: `Add more assets`,
  })
    .click();

  await page.locator('input[name="files"]')
    .setInputFiles(filePath);


  await page.getByText(`Upload 1 asset to the library`)
    .click();

  await page.getByRole(`button`, {
    name: `Finish`,
  })
    .click();
}

export async function deleteFiles() {
  const filesResponse = (await axios.get(getStrapiUrl({ path: '/api/upload/files' }))).data;

  const filesDelete = filesResponse.filter((file) => file.name.startsWith(E2E_SMOKE_NAME_PREFIX));

  filesDelete.forEach(async ({ id }) => {
    await axios.delete(getStrapiUrl({ path: `/api/upload/files/${id}` }));
  })
}

export async function clickByCheckboxAndDeleteWithConfirm({
  page,
}: {
  page: Page
}) {
  await page.getByRole(`checkbox`)
    .first()
    .check();

  await page.getByRole(`button`, {
    name: `Delete`,
  })
    .first()
    .click();

  await page.getByRole(`button`, {
    name: `Confirm`,
  })
    .click();
}

export async function saveAndPublish({
  page
}: {
  page: Page
}) {
  await page.getByRole(`button`, {
    name: 'Save'
  })
    .click();

  await page.getByRole(`button`, {
    name: 'Publish'
  })
    .click();

  await page.waitForTimeout(500);
}

export async function createSeo({
  page,
  metaTitle,
  metaDescription
}: {
  page: Page,
  metaTitle: SeoBlock['metaTitle'],
  metaDescription: SeoBlock['metaDescription']
}) {
  await page.getByText('No entry yet. Click to add one.')
    .last()
    .click();

  await page.locator('[name="seo.metaTitle"]')
    .fill(metaTitle);


  await page.locator('[name="seo.metaDescription"]')
    .fill(metaDescription);
}

export async function createHeroBlock({
  page,
  id,
  title,
  infoCard,
  scheduleCard,
  filePath,
}: {
  page: Page,
  id: number
} & HeroBlock) {
  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'Hero'
  }).click();

  await page.getByRole('button', {
    name: 'Hero'
  }).click();

  await page.locator(`[name="blocks.${id}.title"]`)
    .fill(title);

  await uploadFile({
    page,
    filePath,
  });

  await page.locator(`[name="blocks.${id}.infoCard.title"]`)
    .fill(infoCard.title);

  await page.locator(`[name="blocks.${id}.infoCard.description"]`)
    .fill(infoCard.description);

  await page.locator(`[name="blocks.${id}.scheduleCard.title"]`)
    .fill(scheduleCard.title);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.locator(`[name="blocks.${id}.scheduleCard.timetable.0.days"]`)
    .fill(scheduleCard.timetable[0].days);

  await page.locator(`[name="blocks.${id}.scheduleCard.timetable.0.time"]`)
    .fill(scheduleCard.timetable[0].time);

  await page.locator(`[name="blocks.${id}.scheduleCard.timetable.0.ticketsOfficeTime"]`)
    .fill(scheduleCard.timetable[0].ticketsOfficeTime);
}

export async function createTextAndMediaBlock({
  page,
  id,
  title,
  description,
  filePath
}: {
  page: Page,
  id: number
} & TextAndMediaBlock) {
  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'TextAndMedia'
  }).click();

  await page.getByRole('button', {
    name: 'TextAndMedia'
  }).click();

  await page.locator(`[name="blocks.${id}.title"]`)
    .fill(title);

  await page.locator(`[name="blocks.${id}.description"]`)
    .fill(description);

  await uploadFile({
    page,
    filePath,
  });
}

export async function createImageWithButtonGridBlock({
  page,
  id,
  title,
  description,
  link,
  label,
  largeImagePath,
  smallImagePath,
}: {
  page: Page,
  id: number
} & ImageWithButtonGridBlock) {
  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'ImageWithButtonGrid'
  }).click();

  await page.getByRole('button', {
    name: 'ImageWithButtonGrid'
  }).click();

  await page.locator(`[name="blocks.${id}.title"]`)
    .fill(title);

  await page.locator(`[name="blocks.${id}.description"]`)
    .fill(description);

  await page.locator(`[name="blocks.${id}.button.link"]`)
    .fill(link);

  await page.locator(`[name="blocks.${id}.button.label"]`)
    .fill(label);

  await uploadFile({
    page,
    filePath: largeImagePath,
  });

  await uploadFile({
    page,
    filePath: smallImagePath,
  });
}