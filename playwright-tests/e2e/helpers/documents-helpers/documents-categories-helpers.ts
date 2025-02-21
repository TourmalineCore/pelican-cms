import { Page } from '@playwright/test';
import {
  E2E_SMOKE_NAME_PREFIX,
  getStrapiUrl,
  saveAndPublish
} from '../global-helpers';
import axios from 'axios';

export async function createAndPublishDocumentsCategory({
  page,
  title,
}: {
  page: Page,
  title: string,
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.getByText(`Категории документов`)
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.locator('[name="title"]')
    .fill(title);

  await saveAndPublish({ page });
}

export async function deleteDocumentsCategories() {
  const documentCategoriesResponse = (await axios.get(getStrapiUrl({ path: '/api/documents-categories?populate=*' }))).data;

  const documentCategoriesDelete = getDocumentCategoriesWithTestPrefix({ documentCategories: documentCategoriesResponse });

  documentCategoriesDelete.forEach(async ({ documentId }) => {
    await axios.delete(getStrapiUrl({ path: `/api/documents-categories/${documentId}` }));
  })
}

export function getDocumentCategoriesWithTestPrefix({
  documentCategories
}: {
  documentCategories: {
    data: {
      id?: number;
      documentId: string;
      title: string;
      slug: string;
    }[]
  }
}) {
  return documentCategories.data.filter((documentCategories) => documentCategories.title.startsWith(E2E_SMOKE_NAME_PREFIX));
}