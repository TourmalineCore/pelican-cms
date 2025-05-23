import test, { APIRequestContext, expect } from "@playwright/test";
import { MOCK_SEO } from "../mocks";
import qs from "qs";
import { HttpStatusCode } from "../helpers/global-helpers";

const NEWS_TITLE = 'Новости';
const ENDPOINT = `/api/news-page`;

test.describe(`News page response tests`, () => {
  test.beforeEach(async ({ request }) => {
    await updateNewsPage({ request });
  });

  test.afterEach(async ({ request }) => {
    await deleteNewsPage({ request });
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
  request
}: {
  request: APIRequestContext;
}) {
  const expectedNewsPageResponse = {
    data: {
      title: NEWS_TITLE,
      seo: MOCK_SEO
    }
  };

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const newsPageResponse = await request.get(`${ENDPOINT}?${qs.stringify(queryParams)}`);
  const newsPageData = await newsPageResponse.json();

  await expect({
    data: {
      title: newsPageData.data.title,
      seo: {
        metaTitle: newsPageData.data.seo.metaTitle,
        metaDescription: newsPageData.data.seo.metaDescription,
        keywords: newsPageData.data.seo.keywords
      }
    }
  }, 'News page response corrected')
    .toEqual(expectedNewsPageResponse);
}

async function updateNewsPage({
  request
}: {
  request: APIRequestContext;
}) {
  try {
    const response = await request.put(ENDPOINT, {
      data: {
        data: {
          title: NEWS_TITLE,
          seo: MOCK_SEO,
        },
      }
    });

    await expect(response.status(), 'News page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test news page: ${error.message}`)
  }
}

async function deleteNewsPage({
  request
}: {
  request: APIRequestContext;
}) {
  try {
    const response = await request.delete(ENDPOINT);

    await expect(response.status(), 'News page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test news page: ${error.message}`)
  }
}
