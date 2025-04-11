import test, { expect } from "@playwright/test";
import axios, { HttpStatusCode } from "axios";
import { E2E_SMOKE_NAME_PREFIX, getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";
import { deleteDocumentCategoryByTitle, createDocumentsCategoryByTitle } from "../helpers/document-categories";

const DOCUMENT_CATEGORY_TITLE = `${E2E_SMOKE_NAME_PREFIX} Отчёты`;
const DOCUMENT_TITLE = `${E2E_SMOKE_NAME_PREFIX} Договор №350474`;
const SUBTITLE = `Договор на поставку продукции животноводства (мясо говядина) для нужд муниципального бюджетного учреждения культуры «зоопарк»`;
const DESCRIPTION = `Контракт заключен по результатам электронного аукциона в рамках 223-ФЗ. Извещение №31907985126 в электронной форме размещены на сайте по адресу в сети Интернет: www.zakupki.gov.ru и на электронной площадке tender.otc.ru процедура №4442641 лот №7816638. Протокол №U4442641-7816638-3 от 07.07.2019 г.`;
const ENDPOINT = `/api/documents`;

test.describe(`Documents response tests`, () => {
  test.beforeEach(async () => {
    await deleteDocument({
      title: DOCUMENT_TITLE
    });

    await createDocuments();
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
      GIVEN an empty documents collection
      WHEN call method POST ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkDocumentsResponseTest
  );
});

async function checkDocumentsResponseTest() {
  const showDate = false;
  const description = DESCRIPTION;
  const date = new Date();
  const expectedDocumentsResponse = {
    data: [
      {
        date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, `0`)}-${(date.getDate()).toString().padStart(2, '0')}`,
        showDate,
        title: DOCUMENT_TITLE,
        subtitle: SUBTITLE,
        description: description,
      }
    ]
  };

  const documentsResponse = (await axios.get(getStrapiUrl({ path: `${ENDPOINT}?populate=*` }))).data;

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
  }, 'Documents response corrected')
    .toEqual(expectedDocumentsResponse);

  await expect(documentTest.files[0].url)
    .not
    .toBeNull();
}


async function createDocuments() {
  const documentCategory = await createDocumentsCategoryByTitle({
    title: DOCUMENT_CATEGORY_TITLE
  });
  const fileId = await getFileIdByName({ name: '[E2E-SMOKE]-new-document.pdf' });

  const response = await axios.post(`${getStrapiUrl({ path: ENDPOINT })}`, {
    data: {
      title: DOCUMENT_TITLE,
      category: documentCategory.data.data.id,
      subtitle: SUBTITLE,
      description: DESCRIPTION,
      files: [fileId],
      showDate: false
    }
  });

  await expect(response.status, 'Documents creation')
    .toEqual(HttpStatusCode.Created);
}

async function deleteDocument({
  title
}: {
  title: string;
}) {
  const documentsResponse = (await axios.get(getStrapiUrl({
    path: `${ENDPOINT}?populate=*`
  }))).data;

  const document = getDocumentByTitle({
    documents: documentsResponse,
    title
  });

  if (document) {
    const response = await axios.delete(getStrapiUrl({ path: `${ENDPOINT}/${document.documentId}` }));

    await expect(response.status, 'Documents deletion')
      .toEqual(HttpStatusCode.NoContent);
  }
}

function getDocumentByTitle({
  documents,
  title
}: {
  documents: DocumentsResponse;
  title: string;
}) {
  return documents.data.find((document) => document.title === title);
}

type DocumentsResponse = {
  data: {
    id?: number;
    documentId: string;
    date: string,
    showDate: boolean,
    title: string;
    subtitle: string;
    description?: string;
    files: {
      data: {
        attributes: {
          url: string;
        }
      }
    }
  }[]
}
