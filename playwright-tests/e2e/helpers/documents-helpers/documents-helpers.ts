import { Page } from '@playwright/test';
import {
  E2E_SMOKE_NAME_PREFIX,
  getStrapiUrl, saveAndPublish, uploadFile
} from '../global-helpers';
import axios from 'axios';

export async function deleteDocuments() {
  const documentsResponse = (await axios.get(getStrapiUrl({ path: '/api/documents?populate=*' }))).data;

  const documentsDelete = getDocumentsWithTestPrefix({ documents: documentsResponse });

  documentsDelete.forEach(async ({ documentId }) => {
    await axios.delete(getStrapiUrl({ path: `/api/documents/${documentId}` }));
  })
}

export async function createAndPublishDocument({
  page,
  categoryTitle,
  title,
  subtitle,
  description,
  filePath,
}: {
  page: Page,
  categoryTitle: string,
  title: string,
  subtitle: string,
  description: string,
  filePath: string,
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.getByText(`Документы`)
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

  await uploadFile({
    page,
    filePath,
  });
  await page.locator('[name="category"]')
    .click();

  await page.getByText(categoryTitle)
    .first()
    .click();


  await saveAndPublish({ page });
}

export function getDocumentsWithTestPrefix({
  documents
}: {
  documents: DocumentsResponse
}) {
  return documents.data.filter((document) => document.title.startsWith(E2E_SMOKE_NAME_PREFIX));
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
