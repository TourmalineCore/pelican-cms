import { MOCK_HERO, MOCK_SEO } from "../mocks";
import { API_SMOKE_NAME_PREFIX, HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";
import qs from "qs";

const OTHER_PAGE_TITLE = `${API_SMOKE_NAME_PREFIX} Экскурсии`;
const ENDPOINT = '/api/other-pages';

test.describe(`Other pages response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await deleteOtherPagesByTitle({
      title: OTHER_PAGE_TITLE,
      apiRequest
    });

    await createOtherPages({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteOtherPagesByTitle({
      title: OTHER_PAGE_TITLE,
      apiRequest
    });
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
  } catch (error) {
    throw new Error(`Failed to create test other page: ${error.message}`)
  }
}

async function deleteOtherPagesByTitle({
  title,
  apiRequest
}: {
  title: string;
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(`${ENDPOINT}?populate=*`);
    const responseData = await response.json();

    const otherPage = getOtherPageByTitle({
      otherPage: responseData,
      title
    });

    if (otherPage) {
      const response = await apiRequest(`${ENDPOINT}/${otherPage.documentId}`, {
        method: 'DELETE'
      });

      await expect(response.status(), 'Other page should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
    throw new Error(`Failed to delete test other page: ${error.message}`)
  }
}

function getOtherPageByTitle({
  otherPage,
  title,
}: {
  otherPage: OtherPageResponse;
  title: string;
}) {
  return otherPage.data.find((item) => item.title === title);
}

type OtherPageResponse = {
  data: {
    id?: number;
    documentId: string;
    title: string;
    slug: string;
    blocks: unknown[]
  }[]
}