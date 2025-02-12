
import { Page } from "@playwright/test";
import axios from "axios";
import 'dotenv/config';
import { E2E_SMOKE_NAME_PREFIX } from "../consts";

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
  await page.getByRole(`textbox`, {
    name: `email`,
  })
    .fill(`admin@init-strapi-admin.strapi.io`);

  await page.getByRole(`textbox`, {
    name: `password`,
  })
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
    .click();

  await page.getByRole(`button`, {
    name: `Add more assets`,
  })
    .click();

  await page.getByRole(`textbox`, {
    name: `files`,
  })
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