import { MOCK_SEO } from "../mocks";
import { SeoBlock } from "../types";
import { HttpStatusCode } from "./global-helpers";
import { ApiTestFixtures, expect } from "./api-test-fixtures";

const ENDPOINT = `/api/documents-categories`;

export async function createDocumentsCategoryByTitle({
  title,
  apiRequest
}: {
  title: string;
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'POST',
      data: {
        data: {
          title,
          seo: MOCK_SEO
        }
      }
    });

    const responseData = await response.json();

    await expect(response.status(), 'Documents categories should be created with status 201')
      .toEqual(HttpStatusCode.Created);

    return responseData.data.id;
  } catch (error: any) {
    throw new Error(`Failed to create test documents categories: ${error.message}`)
  }
}

export async function deleteDocumentCategoryByTitle({
  title,
  apiRequest
}: {
  title: string;
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const documentCategoriesResponse = await apiRequest(`${ENDPOINT}?populate=*`);
    const documentCategoriesData = await documentCategoriesResponse.json();

    const documentCategory = getDocumentCategoryByTitle({
      documentCategories: documentCategoriesData,
      title
    });

    if (documentCategory) {
      const response = await apiRequest(`${ENDPOINT}/${documentCategory.documentId}`, {
        method: 'DELETE'
      });

      await expect(response.status(), 'Documents categories should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error: any) {
    throw new Error(`Failed to delete test documents categories: ${error.message}`)
  }
}

export function getDocumentCategoryByTitle({
  documentCategories,
  title
}: {
  documentCategories: {
    data: {
      id?: number;
      documentId: string;
      title: string;
      slug: string;
      seo: SeoBlock;
    }[]
  };
  title: string;
}) {
  return documentCategories.data.find((documentCategories) => documentCategories.title === title);
}
