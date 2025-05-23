import test, { expect } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { MOCK_SEO } from "../mocks";
import { E2E_SMOKE_NAME_PREFIX, getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";
import { SeoBlock } from "../types";

const NEWS_TITLE = `${E2E_SMOKE_NAME_PREFIX} В зоопарке появился амурский тигр`;
const DESCRIPTION = `На фотографии изображен амурский тигр!`;
const INNER_CONTENT = `В зоопарке появился амурский тигр, приходите посмотреть!`;
const DATE = '2025-02-15'
const ENDPOINT = '/api/news';

test.describe(`News response tests`, () => {
  test.beforeEach(async () => {
    await deleteNewsByTitle({
      title: NEWS_TITLE
    });

    await createNews();
  });

  test.afterEach(async () => {
    await deleteNewsByTitle({
      title: NEWS_TITLE
    });
  });

  test(`
      GIVEN an empty news collection
      WHEN call method POST ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkNewsResponseTest
  );
})

async function checkNewsResponseTest() {
  const expectedNewsResponse = {
    data: [
      {
        title: NEWS_TITLE,
        description: DESCRIPTION,
        innerContent: INNER_CONTENT,
        slug: '2025/02/15/e2e-smoke-v-zooparke-poyavilsya-amurskij-tigr',
        date: DATE,
        seo: MOCK_SEO
      }
    ]
  };

  const newsResponse = (await axios.get(getStrapiUrl({ path: `${ENDPOINT}?populate=*` }))).data;
  const newsTest = getNewsByTitle({
    news: newsResponse,
    title: NEWS_TITLE
  });

  await expect({
    data: [
      {
        title: newsTest.title,
        description: newsTest.description,
        innerContent: newsTest.innerContent,
        date: newsTest.date,
        slug: newsTest.slug,
        seo: {
          metaTitle: newsTest.seo.metaTitle,
          metaDescription: newsTest.seo.metaDescription,
          keywords: newsTest.seo.keywords
        }
      }
    ]
  }, 'News response corrected')
    .toEqual(expectedNewsResponse);

  await expect(newsTest.image.url)
    .not
    .toBeNull();
}

async function createNews() {
  try {
    const response = await axios.post(`${getStrapiUrl({ path: ENDPOINT })}`, {
      data: {
        title: NEWS_TITLE,
        description: DESCRIPTION,
        image: await getFileIdByName(),
        innerContent: INNER_CONTENT,
        date: DATE,
        seo: MOCK_SEO
      }
    });

    await expect(response.status, 'News should be created with status 201')
      .toEqual(HttpStatusCode.Created);
  } catch (error) {
    throw new Error(`Failed to create test news: ${(error as AxiosError).message}`)
  }
}

async function deleteNewsByTitle({
  title
}: {
  title: string;
}) {
  try {
    const newsResponse = (await axios.get(getStrapiUrl({ path: `${ENDPOINT}?populate=*` }))).data;

    const news = getNewsByTitle({
      news: newsResponse,
      title
    });

    if (news) {
      const response = await axios.delete(getStrapiUrl({
        path: `${ENDPOINT}/${news.documentId}`
      }));

      await expect(response.status, 'News should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test news: ${(error as AxiosError).message}`)
  }
}

function getNewsByTitle({
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
    date: string;
    image: {
      url: string;
      alternativeText: string;
    },
    slug: string;
    seo: SeoBlock;
  }[]
}
