import test, { expect } from "@playwright/test";
import axios, { HttpStatusCode } from "axios";
import { MOCK_SEO } from "../mocks";
import { E2E_SMOKE_NAME_PREFIX, getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";
import { SeoBlock } from "../types";

const NEWS_TITLE = `${E2E_SMOKE_NAME_PREFIX} В зоопарке появился амурский тигр`;
const DESCRIPTION = `На фотографии изображен амурский тигр!`;
const INNER_CONTENT = `В зоопарке появился амурский тигр, приходите посмотреть!`;
const ENDPOINT = '/api/news';

test.describe(`News response tests`, () => {
  test.beforeEach(async () => {
    await deleteNewsByTitle({
      title: NEWS_TITLE
    });

    await createNewsAsync();
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
        slug: 'e2e-smoke-v-zooparke-poyavilsya-amurskij-tigr',
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

async function createNewsAsync() {
  const response = await axios.post(`${getStrapiUrl({ path: ENDPOINT })}`, {
    data: {
      title: NEWS_TITLE,
      description: DESCRIPTION,
      image: await getFileIdByName(),
      innerContent: INNER_CONTENT,
      seo: MOCK_SEO
    }
  });

  await expect(response.status, 'News page creating')
    .toEqual(HttpStatusCode.Created);
}

async function deleteNewsByTitle({
  title
}: {
  title: string;
}) {
  const newsResponse = (await axios.get(getStrapiUrl({ path: `${ENDPOINT}?populate=*` }))).data;

  const news = getNewsByTitle({
    news: newsResponse,
    title
  });

  if (news) {
    const response = await axios.delete(getStrapiUrl({
      path: `${ENDPOINT}/${news.documentId}`
    }));

    await expect(response.status, 'News deletion')
      .toEqual(HttpStatusCode.NoContent);
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
    image: {
      url: string;
      alternativeText: string;
    },
    slug: string;
    seo: SeoBlock;
  }[]
}