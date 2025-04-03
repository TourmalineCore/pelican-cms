import test, { expect, Page } from "@playwright/test";
import { authenticateWithJwtToken, E2E_SMOKE_NAME_PREFIX, getStrapiUrl } from "../helpers/global-helpers";
import { createAndPublishNews, deleteNews, getNewsByTitle } from "../helpers/news-helpers/news-helpers";
import axios from "axios";
import { MOCK_SEO } from "../helpers/mocks";

const NEWS_TITLE = `${E2E_SMOKE_NAME_PREFIX} В зоопарке появился амурский тигр`;

test.describe(`News response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });
  });

  test.afterEach(async () => {
    await deleteNews({
      title: NEWS_TITLE
    });
  });

  test(`
      GIVEN collection of news without record
      WHEN create one news
      SHOULD get a response with this news
      `,
    checkNewsResponseTest
  );
})

async function checkNewsResponseTest({
  page,
}: {
  page: Page
}) {
  const description = `На фотографии изображен амурский тигр!`;
  const innerContent = `В зоопарке появился амурский тигр, приходите посмотреть!`;
  const expectedNewsResponse = {
    data: [
      {
        title: NEWS_TITLE,
        description,
        innerContent: `<p>${innerContent}</p>`,
        slug: 'e2e-smoke-v-zooparke-poyavilsya-amurskij-tigr',
        seo: MOCK_SEO
      }
    ]
  };

  await createAndPublishNews({
    page,
    title: NEWS_TITLE,
    description,
    innerContent,
    seo: MOCK_SEO,
  });

  const newsResponse = (await axios.get(getStrapiUrl({ path: '/api/news?populate=*' }))).data;
  const newsTest = getNewsByTitle({
    news: newsResponse,
    title: NEWS_TITLE
  });

  await expect({
    data: [
      {
        title: newsTest.title,
        description: newsTest.description,
        innerContent: newsTest.innerContent,
        slug: newsTest.slug,
        seo: {
          metaTitle: newsTest.seo.metaTitle,
          metaDescription: newsTest.seo.metaDescription,
          keywords: newsTest.seo.keywords
        }
      }
    ]
  })
    .toEqual(expectedNewsResponse);

  await expect(newsTest.image.url)
    .not
    .toBeNull();
}