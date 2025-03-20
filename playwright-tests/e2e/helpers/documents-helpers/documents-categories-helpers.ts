import { Page } from '@playwright/test';
import {
  createSeo,
  E2E_SMOKE_NAME_PREFIX,
  getStrapiUrl,
  saveAndPublish
} from '../global-helpers';
import axios from 'axios';
import { SeoBlock } from '../types';

export async function createSaveAndPublishDocumentsCategory({
  page,
  title,
  seo,
}: {
  page: Page,
  title: string,
  seo?: SeoBlock
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Категории документов' })
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.locator('[name="title"]')
    .fill(title);

  if (seo) {
    await createSeo({
      page,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      keywords: seo.keywords
    })
  }

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
      seo: SeoBlock;
    }[]
  }
}) {
  return documentCategories.data.filter((documentCategories) => documentCategories.title.startsWith(E2E_SMOKE_NAME_PREFIX));
}