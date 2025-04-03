import test, { Page, expect } from "@playwright/test";
import axios from "axios";
import { createAndPublishDocumentsCategory, deleteDocumentCategoryByTitle, getDocumentCategoryByTitle } from "../helpers/documents-helpers/documents-categories-helpers";
import { authenticateWithJwtToken, E2E_SMOKE_NAME_PREFIX, getStrapiUrl } from "../helpers/global-helpers";
import { MOCK_SEO } from "../helpers/mocks";

const DOCUMENT_CATEGORY_TITLE = `${E2E_SMOKE_NAME_PREFIX} Договора`;

test.describe(`Documents categories response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });
  });

  test.afterEach(async () => {
    await deleteDocumentCategoryByTitle({
      title: DOCUMENT_CATEGORY_TITLE
    });
  });

  test(`
      GIVEN collection of documents categories without record
      WHEN create one category
      SHOULD get a response with this category
      `,
    checkDocumentsCategoriesResponseTest
  );
});

async function checkDocumentsCategoriesResponseTest({
  page,
}: {
  page: Page
}) {
  const expectedDocumentsCategoriesResponse = {
    data: [
      {
        title: DOCUMENT_CATEGORY_TITLE,
        slug: 'e2e-smoke-dogovora',
        seo: MOCK_SEO
      }
    ]
  };

  await createAndPublishDocumentsCategory({
    page,
    title: DOCUMENT_CATEGORY_TITLE,
    seo: MOCK_SEO,
  });

  const documentsCategoriesResponse = (await axios.get(getStrapiUrl({ path: '/api/documents-categories?populate=*' }))).data;
  const documentCategoryTest = getDocumentCategoryByTitle({
    documentCategories: documentsCategoriesResponse,
    title: DOCUMENT_CATEGORY_TITLE
  });

  await expect({
    data: [
      {
        title: documentCategoryTest.title,
        slug: documentCategoryTest.slug,
        seo: {
          metaTitle: documentCategoryTest.seo.metaTitle,
          metaDescription: documentCategoryTest.seo.metaDescription,
          keywords: documentCategoryTest.seo.keywords,
        },
      }
    ]
  })
    .toEqual(expectedDocumentsCategoriesResponse);
}