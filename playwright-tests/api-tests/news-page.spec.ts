import { MOCK_SEO } from "../mocks";
import qs from "qs";
import { HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";

const NEWS_TITLE = 'Новости';
const ENDPOINT = `/api/news-page`;

test.describe(`News page response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await updateNewsPage({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteNewsPage({ apiRequest });
  });

  test(`
    GIVEN an empty news page
    WHEN call method PUT ${ENDPOINT}
    AND call method GET ${ENDPOINT}
    SHOULD get a correct response
    `,
    checkNewsPageResponseTest
  );
});

async function checkNewsPageResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedNewsPageResponse = {
    title: NEWS_TITLE,
    seo: MOCK_SEO
  };

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const newsPageResponse = await apiRequest(`${ENDPOINT}?${qs.stringify(queryParams)}`);
  const newsPageData = await newsPageResponse.json();

  await expect(newsPageData.data, 'News page response is correct')
    .toMatchObject(expectedNewsPageResponse);
}

async function updateNewsPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'PUT',
      data: {
        data: {
          title: NEWS_TITLE,
          seo: MOCK_SEO,
        },
      }
    });

    await expect(response.status(), 'News page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error: any) {
    throw new Error(`Failed to update test news page: ${error.message}`)
  }
}

async function deleteNewsPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'DELETE'
    });

    await expect(response.status(), 'News page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error: any) {
    throw new Error(`Failed to delete test news page: ${error.message}`)
  }
}
