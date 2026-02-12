import { MOCK_SEO } from "../mocks";
import qs from "qs";
import { HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";

const DOCUMENT_TITLE = 'Информация о деятельности МБУК «Зоопарк»';
const ENDPOINT = `/api/documents-page`;

test.describe(`Documents page response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await updateDocumentsPage({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteDocumentsPage({ apiRequest });
  });

  test(`
      GIVEN an empty documents page
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkDocumentsPageResponseTest
  );
});

async function checkDocumentsPageResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest']
}) {
  const expectedDocumentsPageResponse = {
    title: DOCUMENT_TITLE,
    seo: MOCK_SEO
  };

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const documentsPageResponse = await apiRequest(`${ENDPOINT}?${qs.stringify(queryParams)}`);
  const documentsPageData = await documentsPageResponse.json()

  await expect(documentsPageData.data, 'Documents page response is correct')
    .toMatchObject(expectedDocumentsPageResponse);
}

async function updateDocumentsPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'PUT',
      data: {
        data: {
          title: DOCUMENT_TITLE,
          seo: MOCK_SEO
        }
      }
    });

    await expect(response.status(), 'Documents page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error: any) {
    throw new Error(`Failed to update test documents page: ${error.message}`)
  }
}

async function deleteDocumentsPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest']
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'DELETE'
    });

    await expect(response.status(), 'Documents page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error: any) {
    throw new Error(`Failed to delete test documents page: ${error.message}`)
  }
}
