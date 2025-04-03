import test, { expect, Page } from "@playwright/test";
import { createAndPublishDocumentsCategory, deleteDocumentCategoryByTitle } from "../helpers/documents-helpers/documents-categories-helpers";
import { createAndPublishDocument, deleteDocument, getDocumentByTitle } from "../helpers/documents-helpers/documents-helpers";
import { authenticateWithJwtToken, E2E_SMOKE_NAME_PREFIX, getStrapiUrl } from "../helpers/global-helpers";
import axios from "axios";

const DOCUMENT_CATEGORY_TITLE = `${E2E_SMOKE_NAME_PREFIX} Отчёты`;
const DOCUMENT_TITLE = `${E2E_SMOKE_NAME_PREFIX} Договор №350474`;

test.describe(`Documents response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });
  });

  test.afterEach(async () => {
    await deleteDocumentCategoryByTitle({
      title: DOCUMENT_CATEGORY_TITLE
    });

    await deleteDocument({
      title: DOCUMENT_TITLE
    });
  });

  test(`
      GIVEN collection of documents without record
      WHEN create one document
      SHOULD get a response with this document
      `,
    checkDocumentsResponseTest
  );
});

async function checkDocumentsResponseTest({
  page,
}: {
  page: Page
}) {
  const showDate = false;
  const subtitle = `Договор на поставку продукции животноводства (мясо говядина) для нужд муниципального бюджетного учреждения культуры «зоопарк»`;
  const description = `Контракт заключен по результатам электронного аукциона в рамках 223-ФЗ. Извещение №31907985126 в электронной форме размещены на сайте по адресу в сети Интернет: www.zakupki.gov.ru и на электронной площадке tender.otc.ru процедура №4442641 лот №7816638. Протокол №U4442641-7816638-3 от 07.07.2019 г.`;
  const date = new Date();
  const expectedDocumentsResponse = {
    data: [
      {
        date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`,
        showDate,
        title: DOCUMENT_TITLE,
        subtitle: `<p>${subtitle}</p>`,
        description: `<p>${description}</p>`,
      }
    ]
  };

  await createAndPublishDocumentsCategory({
    page,
    title: DOCUMENT_CATEGORY_TITLE,
  });

  await createAndPublishDocument({
    page,
    categoryTitle: DOCUMENT_CATEGORY_TITLE,
    title: DOCUMENT_TITLE,
    subtitle,
    description,
  });

  const documentsResponse = (await axios.get(getStrapiUrl({ path: '/api/documents?populate=*' }))).data;
  const documentTest = getDocumentByTitle({
    documents: documentsResponse,
    title: DOCUMENT_TITLE
  });

  await expect({
    data: [
      {
        date: documentTest.date,
        showDate: documentTest.showDate,
        title: documentTest.title,
        subtitle: documentTest.subtitle,
        description: documentTest.description,
      }
    ]
  })
    .toEqual(expectedDocumentsResponse);

  await expect(documentTest.files[0].url)
    .not
    .toBeNull();
}