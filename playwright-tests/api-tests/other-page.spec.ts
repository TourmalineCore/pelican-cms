import qs from "qs";
import {
  MOCK_CATEGORIES
} from "../mocks";
import { HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";

const ENDPOINT = `/api/other`;

test.describe(`Other page response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await updateOtherPage({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await cleanupOtherPage({ apiRequest });
  });

  test(`
      GIVEN an empty other page
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkOtherPageResponseTest
  );
});

async function checkOtherPageResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedContactZooPageResponse = {
    blocks: [
      MOCK_CATEGORIES,
    ],
  };

  const queryParams = {
    populate: [
      `blocks.categories`,
    ],
  };

  const otherPageDataResponse = await apiRequest(
    `${ENDPOINT}?${qs.stringify(queryParams)}`
  );

  const otherPageData = await otherPageDataResponse.json();

  await expect(otherPageData.data, 'Other page response is correct')
    .toMatchObject(expectedContactZooPageResponse);
}

async function updateOtherPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'PUT',
      data: {
        data: {
          blocks: [
            MOCK_CATEGORIES,
          ],
        },
      }
    });

    await expect(response.status(), 'Other page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test other page: ${error.message}`)
  }
}

async function cleanupOtherPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'DELETE'
    });

    await expect(response.status(), 'Other page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test other page: ${error.message}`)
  }
}
