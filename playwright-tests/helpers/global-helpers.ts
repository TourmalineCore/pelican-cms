import { Page } from "@playwright/test";
import axios from "axios";
import 'dotenv/config';

export const E2E_SMOKE_NAME_PREFIX = `[E2E-SMOKE]`;

export async function gotoUI({
  page,
  path,
}: {
  page: Page
  path?: string
}) {
  await page.goto(`${process.env.FRONTEND_URL || 'http://localhost:3000'}${path}`, {
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

export async function getFileIdByName({
  name = '[E2E-SMOKE]-tiger.png'
}: {
  name?: string
} = {}) {
  const filesResponse = (await axios.get(getStrapiUrl({ path: '/api/upload/files' }))).data;

  return filesResponse.find((file) => file.name === name).id;
}

export async function deleteFiles() {
  const filesResponse = (await axios.get(getStrapiUrl({ path: '/api/upload/files' }))).data;

  const filesDelete = filesResponse.filter((file) => file.name?.startsWith(E2E_SMOKE_NAME_PREFIX));

  if (filesDelete.length) {
    filesDelete.forEach(async ({ id }) => {
      await axios.delete(getStrapiUrl({ path: `/api/upload/files/${id}` }));
    })
  }
}