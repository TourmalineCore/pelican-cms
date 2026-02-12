import { MOCK_SEO } from "../mocks";
import { API_SMOKE_NAME_PREFIX } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";
import { deleteDocumentCategoryByTitle, createDocumentsCategoryByTitle } from "../helpers/document-categories";

const DOCUMENT_CATEGORY_TITLE = `${API_SMOKE_NAME_PREFIX} Договора`;
const ENDPOINT = `/api/documents-categories`;

test.describe(`Documents categories response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await deleteDocumentCategoryByTitle({
      title: DOCUMENT_CATEGORY_TITLE,
      apiRequest
    });

    await createDocumentsCategoryByTitle({
      title: DOCUMENT_CATEGORY_TITLE,
      apiRequest
    });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteDocumentCategoryByTitle({
      title: DOCUMENT_CATEGORY_TITLE,
      apiRequest
    });
  });

  test(`
      GIVEN an empty documents categories collection
      WHEN call method POST ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkDocumentsCategoriesResponseTest
  );
});

async function checkDocumentsCategoriesResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest']
}) {
  const expectedDocumentsCategoriesResponse = [
    {
      title: DOCUMENT_CATEGORY_TITLE,
      slug: 'api-smoke-dogovora',
      seo: MOCK_SEO
    }
  ];

  const documentsCategoriesResponse = await apiRequest(`${ENDPOINT}?populate=*&filters[title][$eq]=${DOCUMENT_CATEGORY_TITLE}`);

  const documentsCategoriesData = await documentsCategoriesResponse.json();

  await expect(documentsCategoriesData.data, 'Documents categories response is correct')
    .toMatchObject(expectedDocumentsCategoriesResponse);
}
