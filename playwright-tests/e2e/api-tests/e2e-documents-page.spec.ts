import test, { Page, expect } from "@playwright/test";
import axios from "axios";
import { deleteDocumentsPage, createAndPublishDocumentsPage } from "../helpers/documents-page-helpers/documents-page-helpers";
import { authenticateWithJwtToken, getStrapiUrl } from "../helpers/global-helpers";
import { MOCK_SEO } from "../helpers/mocks";
import qs from "qs";

test.describe(`Documents page response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });
    await deleteDocumentsPage();
  });

  test.afterEach(async () => {
    await deleteDocumentsPage();
  });


  test(`
      GIVEN empty documents page
      WHEN fill out the documents page
      SHOULD get a response documents  page
      `,
    checkDocumentsPageResponseTest
  );
});


async function checkDocumentsPageResponseTest({
  page
}: {
  page: Page
}) {
  const documentsTitle = 'Информация о деятельности МБУК «Зоопарк»';
  const expectedDocumentsPageResponse = {
    data: {
      documentsTitle,
      seo: MOCK_SEO
    }
  };

  await createAndPublishDocumentsPage({
    page,
    documentsTitle,
    seo: MOCK_SEO
  })

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const documentsPageResponse = (await axios.get(getStrapiUrl({
    path: `/api/documents-page?${qs.stringify(queryParams)}`
  }))).data;


  await expect({
    data: {
      documentsTitle: documentsPageResponse.data.title,
      seo: {
        metaTitle: documentsPageResponse.data.seo.metaTitle,
        metaDescription: documentsPageResponse.data.seo.metaDescription,
        keywords: documentsPageResponse.data.seo.keywords
      }
    }
  })
    .toEqual(expectedDocumentsPageResponse);
}