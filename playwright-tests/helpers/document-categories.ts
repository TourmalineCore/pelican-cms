import { MOCK_SEO } from "../mocks";
import { SeoBlock } from "../types";
import { APIRequestContext, expect } from "@playwright/test";
import { HttpStatusCode } from "./global-helpers";

const ENDPOINT = `/api/documents-categories`;

export async function createDocumentsCategoryByTitle({
  title,
  request
}: {
  title: string;
  request: APIRequestContext;
}) {
  try {
    const response = await request.post(ENDPOINT, {
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
  } catch (error) {
    throw new Error(`Failed to create test documents categories: ${error.message}`)
  }
}

export async function deleteDocumentCategoryByTitle({
  title,
  request
}: {
  title: string;
  request: APIRequestContext;
}) {
  try {
    const documentCategoriesResponse = (await request.get(`${ENDPOINT}?populate=*`));
    const documentCategoriesData = await documentCategoriesResponse.json();

    const documentCategory = getDocumentCategoryByTitle({
      documentCategories: documentCategoriesData,
      title
    });

    if (documentCategory) {
      const response = await request.delete(`${ENDPOINT}/${documentCategory.documentId}`);

      await expect(response.status(), 'Documents categories should be deleted with status 204')
        .toEqual(HttpStatusCode.NoContent);
    }
  } catch (error) {
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
