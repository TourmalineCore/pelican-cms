import test, { APIRequestContext, expect } from "@playwright/test";
import { MOCK_SEO } from "../mocks";
import qs from "qs";
import { HttpStatusCode } from "../helpers/global-helpers";

const DOCUMENT_TITLE = 'Информация о деятельности МБУК «Зоопарк»';
const ENDPOINT = `/api/documents-page`;

test.describe(`Documents page response tests`, () => {
  test.beforeEach(async ({ request }) => {
    await updateDocumentsPage({ request });
  });

  test.afterEach(async ({ request }) => {
    await deleteDocumentsPage({ request });
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
  request
}: {
  request: APIRequestContext
}) {
  const expectedDocumentsPageResponse = {
    data: {
      title: DOCUMENT_TITLE,
      seo: MOCK_SEO
    }
  };

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const documentsPageResponse = await request.get(`${ENDPOINT}?${qs.stringify(queryParams)}`);
  const documentsPageData = await documentsPageResponse.json()

  await expect({
    data: {
      title: documentsPageData.data.title,
      seo: {
        metaTitle: documentsPageData.data.seo.metaTitle,
        metaDescription: documentsPageData.data.seo.metaDescription,
        keywords: documentsPageData.data.seo.keywords
      }
    }
  }, 'Documents page response corrected')
    .toEqual(expectedDocumentsPageResponse);
}

async function updateDocumentsPage({
  request
}: {
  request: APIRequestContext;
}) {
  try {
    const response = await request.put(ENDPOINT, {
      data: {
        data: {
          title: DOCUMENT_TITLE,
          seo: MOCK_SEO
        }
      }
    });

    await expect(response.status(), 'Documents page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test documents page: ${error.message}`)
  }
}

async function deleteDocumentsPage({
  request
}: {
  request: APIRequestContext
}) {
  try {
    const response = await request.delete(ENDPOINT);

    await expect(response.status(), 'Documents page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test documents page: ${error.message}`)
  }
}
