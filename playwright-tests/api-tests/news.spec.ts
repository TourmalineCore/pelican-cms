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
    await deleteNews({
      apiRequest
    });

    await createNews({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteNews({
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
      seo: MOCK_SEO,
      isPinned: true
    }
  ];

  const news = await getNews({ apiRequest })

  await expect(news, 'News response is correct')
    .toMatchObject(expectedNewsResponse);

  await expect(news[0].image.url)
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
          seo: MOCK_SEO,
          isPinned: true
        }
      }
    });

    await expect(response.status(), 'News should be created with status 201')
      .toEqual(HttpStatusCode.Created);
  } catch (error: any) {
    throw new Error(`Failed to create test news: ${error.message}`)
  }
}

async function getNews({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const newsResponse = await apiRequest(`${ENDPOINT}?populate=*&filters[title][$eq]=${NEWS_TITLE}`);
  const news: News[] = (await newsResponse.json()).data;

  return news;
}

async function deleteNews({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const news = await getNews({ apiRequest })

    for (const { documentId } of news) {
      const response = await apiRequest(`${ENDPOINT}/${documentId}`, {
        method: 'DELETE'
      });

      await expect(response.status(), 'News should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);

    };
  } catch (error: any) {
    throw new Error(`Failed to delete test news: ${error.message}`)
  }
}

type News = {
  id?: number;
  documentId: string;
  title: string;
  description?: string;
  innerContent: string;
  date: string;
  isPinned: boolean;
  image: {
    url: string;
    alternativeText: string;
  },
  slug: string;
  seo: SeoBlock;
}