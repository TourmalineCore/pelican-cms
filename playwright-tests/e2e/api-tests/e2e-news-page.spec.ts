import test, { Page, expect } from "@playwright/test";
import axios from "axios";
import { authenticateWithJwtToken, getStrapiUrl } from "../helpers/global-helpers";
import { MOCK_SEO } from "../helpers/mocks";
import { deleteNewsPage, createAndPublishNewsPage } from "../helpers/news-page-helpers/news-page-helpers";
import qs from "qs";

test.describe(`News page response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });

    await deleteNewsPage();
  });

  test.afterEach(async () => {
    await deleteNewsPage();
  });


  test(`
    GIVEN empty news page
    WHEN fill out the news page
    SHOULD get a response news page
    `,
    checkNewsPageResponseTest
  );
});


async function checkNewsPageResponseTest({
  page
}: {
  page: Page
}) {
  const newsTitle = 'Новости';
  const expectedNewsPageResponse = {
    data: {
      newsTitle,
      seo: MOCK_SEO
    }
  };

  await createAndPublishNewsPage({
    page,
    newsTitle,
    seo: MOCK_SEO
  })

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const newsPageResponse = (await axios.get(getStrapiUrl({
    path: `/api/news-page?${qs.stringify(queryParams)}`
  }))).data;


  await expect({
    data: {
      newsTitle: newsPageResponse.data.title,
      seo: {
        metaTitle: newsPageResponse.data.seo.metaTitle,
        metaDescription: newsPageResponse.data.seo.metaDescription,
        keywords: newsPageResponse.data.seo.keywords
      }
    }
  })
    .toEqual(expectedNewsPageResponse);
}