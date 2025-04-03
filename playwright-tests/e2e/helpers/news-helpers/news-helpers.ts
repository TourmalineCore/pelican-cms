import { Page } from '@playwright/test';
import axios from 'axios';
import { createSeo, getStrapiUrl, saveAndPublish, selectFile } from '../global-helpers';
import { SeoBlock } from '../types';

export async function deleteNews({
  title
}: {
  title: string;
}) {
  const newsResponse = (await axios.get(getStrapiUrl({ path: '/api/news?populate=*' }))).data;

  const news = getNewsByTitle({
    news: newsResponse,
    title
  });

  await axios.delete(getStrapiUrl({ path: `/api/news/${news.documentId}` }));
}

export async function createAndPublishNews({
  page,
  title,
  description,
  innerContent,
  seo
}: {
  page: Page;
  title: string;
  description: string;
  innerContent: string;
  seo?: SeoBlock;
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Новости' })
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.locator('[name="title"]')
    .fill(title);

  await page.locator(`[name="description"]`)
    .fill(description);

  await selectFile({
    page,
  });

  await page.locator(`.ck-content`)
    .fill(innerContent);

  if (seo) {
    await createSeo({
      page,
      metaTitle: seo.metaTitle,
      metaDescription: seo.metaDescription,
      keywords: seo.keywords,
    });
  }

  await saveAndPublish({ page });
}

export function getNewsByTitle({
  news,
  title,
}: {
  news: NewsResponse;
  title: string;
}) {
  return news.data.find((news) => news.title === title);
}

type NewsResponse = {
  data: {
    id?: number;
    documentId: string;
    title: string;
    description?: string;
    innerContent: string;
    image: {
      url: string;
      alternativeText: string;
    },
    slug: string;
    seo: SeoBlock;
  }[]
}