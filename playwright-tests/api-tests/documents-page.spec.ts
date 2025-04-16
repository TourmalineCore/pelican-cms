import test, { expect } from "@playwright/test";
import axios, { HttpStatusCode } from "axios";
import { MOCK_SEO } from "../mocks";
import qs from "qs";
import { getStrapiUrl } from "../helpers/global-helpers";

const DOCUMENT_TITLE = 'Информация о деятельности МБУК «Зоопарк»';
const ENDPOINT = `/api/documents-page`;

test.describe(`Documents page response tests`, () => {
  test.beforeEach(async () => {
    await updateDocumentsPage();
  });

  test.afterEach(async () => {
    await deleteDocumentsPage();
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


async function checkDocumentsPageResponseTest() {
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

  const documentsPageResponse = (await axios.get(getStrapiUrl({
    path: `${ENDPOINT}?${qs.stringify(queryParams)}`
  }))).data;


  await expect({
    data: {
      title: documentsPageResponse.data.title,
      seo: {
        metaTitle: documentsPageResponse.data.seo.metaTitle,
        metaDescription: documentsPageResponse.data.seo.metaDescription,
        keywords: documentsPageResponse.data.seo.keywords
      }
    }
  }, 'Documents page response corrected')
    .toEqual(expectedDocumentsPageResponse);
}

async function updateDocumentsPage() {
  const response = await axios.put(`${getStrapiUrl({ path: ENDPOINT })}`, {
    data: {
      title: DOCUMENT_TITLE,
      seo: MOCK_SEO
    }
  });

  await expect(response.status, 'Documents page updating')
    .toEqual(HttpStatusCode.Ok);
}

async function deleteDocumentsPage() {
  const response = await axios.delete(getStrapiUrl({
    path: ENDPOINT
  }));

  await expect(response.status, 'Documents page deletion')
    .toEqual(HttpStatusCode.NoContent);
}