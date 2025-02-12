import { Page } from '@playwright/test';
import {
  getStrapiUrl,
  saveAndPublish
} from '../global-helpers';
import axios from 'axios';
import { E2E_SMOKE_NAME_PREFIX } from '../../consts';

export async function createAndPublishDocumentsCategory({
  page,
  title,
}: {
  page: Page,
  title: string,
}) {
  await page.getByText(`Content Manager`)
    .click();

  await page.getByText(`Категории документов`)
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.locator(`id=title`)
    .fill(title);

  await saveAndPublish({ page });
}

export async function deleteDocumentsCategories() {
  const documentCategoriesResponse = (await axios.get(getStrapiUrl({ path: '/api/documents-categories?populate=*' }))).data;

  const documentCategoriesDelete = getDocumentCategoriesWithTestPrefix({ documentCategories: documentCategoriesResponse });

  documentCategoriesDelete.forEach(async ({ id }) => {
    await axios.delete(getStrapiUrl({ path: `/api/documents-categories/${id}` }));
  })
}

export function getDocumentCategoriesWithTestPrefix({
  documentCategories
}: {
  documentCategories: {
    data: {
      id?: number;
      attributes?: {
        title: string;
      }
    }[]
  }
}) {
  return documentCategories.data.filter((documentCategories) => documentCategories?.attributes.title.startsWith(E2E_SMOKE_NAME_PREFIX));
}