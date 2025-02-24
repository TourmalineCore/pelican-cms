import { Page } from '@playwright/test';
import axios from 'axios';
import { E2E_SMOKE_NAME_PREFIX, getStrapiUrl, saveAndPublish, uploadFile } from '../global-helpers';

export async function deleteNews() {
  const newsResponse = (await axios.get(getStrapiUrl({ path: '/api/news?populate=*' }))).data;

  const newsDelete = getNewsWithTestPrefix({ news: newsResponse });

  newsDelete.forEach(async ({ documentId }) => {
    await axios.delete(getStrapiUrl({ path: `/api/news/${documentId}` }));
  })
}

export async function createAndPublishNews({
  page,
  title,
  description,
  innerContent,
  filePath,
}: {
  page: Page,
  title: string,
  description: string,
  innerContent: string,
  filePath: string
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.getByText(`Новости`)
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.locator('[name="title"]')
    .fill(title);

  await page.locator(`[name="description"]`)
    .fill(description);

  await uploadFile({
    page,
    filePath,
  });

  await page.locator(`.ck-content`)
    .fill(innerContent);

  await saveAndPublish({ page });
}

export function getNewsWithTestPrefix({
  news
}: {
  news: NewsResponse
}) {
  return news.data.filter((news) => news.title.startsWith(E2E_SMOKE_NAME_PREFIX));
}

type NewsResponse = {
  data: {
    id?: number;
    documentId: string,
    title: string;
    description?: string;
    innerContent: string;
    image: {
      url: string;
      alternativeText: string;
    }
  }[]
}