import { Page } from "@playwright/test";
import { createSeo, getStrapiUrl, saveAndPublish } from "../global-helpers";
import axios from "axios";
import { SeoBlock } from "../types";

export async function createSaveAndPublishDocumentsPage({
  page,
  documentsTitle,
  seo,
}: {
  page: Page,
  documentsTitle: string,
  seo: SeoBlock,
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Страница документов' })
    .click();

  await page.locator('[name="title"]')
    .fill(documentsTitle);

  await createSeo({
    page,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    keywords: seo.keywords
  });

  await saveAndPublish({ page });
}

export async function deleteDocumentsPage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/documents-page` }));
  } catch { }
}