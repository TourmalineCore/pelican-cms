import { Page } from '@playwright/test';
import {
  getStrapiUrl, saveAndPublish, selectFile
} from '../global-helpers';
import axios from 'axios';

export async function deleteDocument({
  title
}: {
  title: string;
}) {
  const documentsResponse = (await axios.get(getStrapiUrl({ path: '/api/documents?populate=*' }))).data;

  const document = getDocumentByTitle({
    documents: documentsResponse,
    title
  });

  await axios.delete(getStrapiUrl({ path: `/api/documents/${document.documentId}` }));
}

export async function createAndPublishDocument({
  page,
  categoryTitle,
  title,
  subtitle,
  description,
}: {
  page: Page,
  categoryTitle: string,
  title: string,
  subtitle: string,
  description: string,
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Документы' })
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.getByRole(`checkbox`, {
    name: `showDate`,
  })
    .click();

  await page.locator('[name="title"]')
    .fill(title);

  await page.locator(`.ck-content`)
    .nth(0)
    .fill(subtitle);

  await page.locator(`.ck-content`)
    .nth(1)
    .fill(description);

  await selectFile({
    page,
    isMultipleSelection: true
  });

  await page.locator('[name="category"]')
    .click();

  await page.getByText(categoryTitle)
    .first()
    .click();

  await saveAndPublish({ page });
}

export function getDocumentByTitle({
  documents,
  title
}: {
  documents: DocumentsResponse;
  title: string;
}) {
  return documents.data.find((document) => document.title === title);
}

type DocumentsResponse = {
  data: {
    id?: number;
    documentId: string;
    date: string,
    showDate: boolean,
    title: string;
    subtitle: string;
    description?: string;
    files: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }[]
}
