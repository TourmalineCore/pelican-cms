import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";
import { API_SMOKE_NAME_PREFIX, getFileIdByName, TEST_FILE_NAME_PREFIX, HttpStatusCode } from "../helpers/global-helpers";
import { createDocumentsCategoryByTitle, deleteDocumentCategoryByTitle } from "../helpers/document-categories";

const DOCUMENT_CATEGORY_TITLE = `${API_SMOKE_NAME_PREFIX} Отчёты`;
const DOCUMENT_TITLE = `${API_SMOKE_NAME_PREFIX} Договор №350474`;
const SUBTITLE = `Договор на поставку продукции животноводства (мясо говядина) для нужд муниципального бюджетного учреждения культуры «зоопарк»`;
const DESCRIPTION = `Контракт заключен по результатам электронного аукциона в рамках 223-ФЗ. Извещение №31907985126 в электронной форме размещены на сайте по адресу в сети Интернет: www.zakupki.gov.ru и на электронной площадке tender.otc.ru процедура №4442641 лот №7816638. Протокол №U4442641-7816638-3 от 07.07.2019 г.`;
const ENDPOINT = `/api/documents`;

test.describe(`Documents response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await deleteDocument({
      title: DOCUMENT_TITLE,
      apiRequest
    });

    await createDocuments({
      apiRequest
    });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteDocumentCategoryByTitle({
      title: DOCUMENT_CATEGORY_TITLE,
      apiRequest
    });

    await deleteDocument({
      title: DOCUMENT_TITLE,
      apiRequest
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

async function checkDocumentsResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const showDate = false;
  const description = DESCRIPTION;
  const date = new Date();
  const expectedDocumentsResponse = [
    {
      date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, `0`)}-${(date.getDate()).toString().padStart(2, '0')}`,
      showDate,
      title: DOCUMENT_TITLE,
      subtitle: SUBTITLE,
      description: description,
    }
  ];

  const documentsResponse = await apiRequest(`${ENDPOINT}?populate=*`);
  const documentsData = await documentsResponse.json();

  const documentTest = getDocumentByTitle({
    documents: documentsData,
    title: DOCUMENT_TITLE
  })!;

  await expect(documentsData.data, 'Documents response is correct')
    .toMatchObject(expectedDocumentsResponse);

  await expect(documentTest.files[0].url)
    .not
    .toBeNull();
}

async function createDocuments({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const documentCategoryId = await createDocumentsCategoryByTitle({
      title: DOCUMENT_CATEGORY_TITLE,
      apiRequest
    });

    const fileId = await getFileIdByName({ name: `${TEST_FILE_NAME_PREFIX}-new-document.pdf`, apiRequest });

    const response = await apiRequest(ENDPOINT, {
      method: 'POST',
      data: {
        data: {
          title: DOCUMENT_TITLE,
          category: documentCategoryId,
          subtitle: SUBTITLE,
          description: DESCRIPTION,
          files: [fileId],
          showDate: false
        }
      }
    });

    await expect(response.status(), 'Documents should be created with status 201')
      .toEqual(HttpStatusCode.Created);
  } catch (error: any) {
    throw new Error(`Failed to create test documents: ${error.message}`)
  }
}

async function deleteDocument({
  title,
  apiRequest
}: {
  title: string;
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const documentsResponse = await apiRequest(`${ENDPOINT}?populate=*`);
    const documentsData = await documentsResponse.json();

    const document = getDocumentByTitle({
      documents: documentsData,
      title
    });

    if (document) {
      const response = await apiRequest(`${ENDPOINT}/${document.documentId}`, {
        method: 'DELETE'
      });

      await expect(response.status(), 'Documents should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete test documents: ${error.message}`)
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
