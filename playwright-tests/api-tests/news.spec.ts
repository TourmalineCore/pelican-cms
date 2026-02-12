import { MOCK_SEO } from "../mocks";
import { API_SMOKE_NAME_PREFIX, getFileIdByName, HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";
import { SeoBlock } from "../types";

const NEWS_TITLE = `${API_SMOKE_NAME_PREFIX} В зоопарке появился амурский тигр`;
const DESCRIPTION = `На фотографии изображен амурский тигр!`;
const INNER_CONTENT = `В зоопарке появился амурский тигр, приходите посмотреть!`;
const DATE = '2025-02-15'
const ENDPOINT = '/api/news';

test.describe(`News response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await deleteNewsByTitle({
      title: NEWS_TITLE,
      apiRequest
    });

    await createNews({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteNewsByTitle({
      title: NEWS_TITLE,
      apiRequest
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

async function checkNewsResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedNewsResponse = [
    {
      title: NEWS_TITLE,
      description: DESCRIPTION,
      innerContent: INNER_CONTENT,
      slug: '2025/02/15/api-smoke-v-zooparke-poyavilsya-amurskij-tigr',
      date: DATE,
      seo: MOCK_SEO
    }
  ];

  const newsResponse = await apiRequest(`${ENDPOINT}?populate=*`);
  const newsData = await newsResponse.json();

  const newsTest = getNewsByTitle({
    news: newsData,
    title: NEWS_TITLE
  })!;

  await expect(newsData.data, 'News response is correct')
    .toMatchObject(expectedNewsResponse);

  await expect(newsTest.image.url)
    .not
    .toBeNull();
}

async function createNews({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'POST',
      data: {
        data: {
          title: NEWS_TITLE,
          description: DESCRIPTION,
          image: await getFileIdByName({
            apiRequest
          }),
          innerContent: INNER_CONTENT,
          date: DATE,
          seo: MOCK_SEO
        }
      }
    });

    await expect(response.status(), 'News should be created with status 201')
      .toEqual(HttpStatusCode.Created);
  } catch (error: any) {
    throw new Error(`Failed to create test news: ${error.message}`)
  }
}

async function deleteNewsByTitle({
  title,
  apiRequest
}: {
  title: string;
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const newsResponse = await apiRequest(`${ENDPOINT}?populate=*`);
    const newsData = await newsResponse.json();

    const news = getNewsByTitle({
      news: newsData,
      title
    });

    if (news) {
      const response = await apiRequest(`${ENDPOINT}/${news.documentId}`, {
        method: 'DELETE'
      });

      await expect(response.status(), 'News should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete test news: ${error.message}`)
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