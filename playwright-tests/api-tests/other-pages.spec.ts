import { MOCK_HERO, MOCK_SEO } from "../mocks";
import { API_SMOKE_NAME_PREFIX, HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";
import qs from "qs";

const OTHER_PAGE_TITLE = `${API_SMOKE_NAME_PREFIX} Экскурсии`;
const ENDPOINT = '/api/other-pages';

test.describe(`Other pages response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await deleteOtherPagesByPrefix({ apiRequest });

    await createOtherPages({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteOtherPagesByPrefix({ apiRequest });
  });

  test(`
      GIVEN an empty other pages collection
      WHEN call method POST ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkOtherPagesResponseTest
  );
})

async function checkOtherPagesResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedNewsResponse = [
    {
      title: OTHER_PAGE_TITLE,
      slug: 'api-smoke-ekskursii',
      blocks: [
        MOCK_HERO
      ],
      seo: MOCK_SEO
    }
  ];

  const queryParams = {
    populate: [
      `blocks.infoCard`,
      `blocks.scheduleCard`,
      `blocks.scheduleCard.timetable`,
      `blocks.image`,
      `seo`
    ],
  };

  const response = await apiRequest(`${ENDPOINT}?${qs.stringify(queryParams)}`);
  const responseData = await response.json();

  await expect(responseData.data, 'Other page response is correct')
    .toMatchObject(expectedNewsResponse);
}

async function createOtherPages({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'POST',
      data: {
        data: {
          title: OTHER_PAGE_TITLE,
          blocks: [
            MOCK_HERO
          ],
          seo: MOCK_SEO
        }
      }
    });

    await expect(response.status(), 'Other page should be created with status 201')
      .toEqual(HttpStatusCode.Created);
  } catch (error: any) {
    throw new Error(`Failed to create test other page: ${error.message}`)
  }
}

async function deleteOtherPagesByPrefix({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(`${ENDPOINT}?populate=*`);
    const responseData = await response.json();

    const toDelete = responseData.data.filter((item: any) =>
      item.title?.startsWith(API_SMOKE_NAME_PREFIX)
    );

    for (const item of toDelete) {
      const response = await apiRequest(`${ENDPOINT}/${item.documentId}`, {
        method: 'DELETE'
      });

      await expect(response.status(), 'Other page should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete test other page: ${error.message}`)
  }
}