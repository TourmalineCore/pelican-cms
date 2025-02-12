import { Page } from '@playwright/test';
import axios from 'axios';
import { getStrapiUrl, saveAndPublish, uploadFile } from '../global-helpers';
import { E2E_SMOKE_NAME_PREFIX } from '../../consts';

export async function deleteNews() {
  const newsResponse = (await axios.get(getStrapiUrl({ path: '/api/news?populate=*' }))).data;

  const newsDelete = getNewsWithTestPrefix({ news: newsResponse });

  newsDelete.forEach(async ({ id }) => {
    await axios.delete(getStrapiUrl({ path: `/api/news/${id}` }));
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
  await page.getByText(`Content Manager`)
    .click();

  await page.getByText(`Новости`)
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.locator(`id=title`)
    .fill(title);

  await page.locator(`id=description`)
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
  return news.data.filter((news) => news?.attributes.title.startsWith(E2E_SMOKE_NAME_PREFIX));
}

type NewsResponse = {
  data: {
    id?: number;
    attributes?: {
      title: string;
      description?: string;
      innerContent: string;
      image: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          }
        }
      }
    }
  }[]
}