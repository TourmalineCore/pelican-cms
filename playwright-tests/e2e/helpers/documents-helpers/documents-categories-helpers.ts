import { Page } from '@playwright/test';
import {
  createSeo, getStrapiUrl,
  saveAndPublish
} from '../global-helpers';
import axios from 'axios';
import { SeoBlock } from '../types';

export async function createAndPublishDocumentsCategory({
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

export async function deleteDocumentCategoryByTitle({
  title
}: {
  title: string;
}) {
  const documentCategoriesResponse = (await axios.get(getStrapiUrl({ path: '/api/documents-categories?populate=*' }))).data;

  const documentCategory = getDocumentCategoryByTitle({
    documentCategories: documentCategoriesResponse,
    title
  });

  await axios.delete(getStrapiUrl({ path: `/api/documents-categories/${documentCategory.documentId}` }));
}

export function getDocumentCategoryByTitle({
  documentCategories,
  title
}: {
  documentCategories: {
    data: {
      id?: number;
      documentId: string;
      title: string;
      slug: string;
      seo: SeoBlock;
    }[]
  };
  title: string;
}) {
  return documentCategories.data.find((documentCategories) => documentCategories.title === title);
}