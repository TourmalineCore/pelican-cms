import axios, { HttpStatusCode } from "axios";
import { getStrapiUrl } from "./global-helpers";
import { MOCK_SEO } from "../mocks";
import { SeoBlock } from "../types";
import { expect } from "@playwright/test";

const ENDPOINT = `/api/documents-categories`;

export async function createDocumentsCategoryByTitle({
  title
}: {
  title: string;
}) {
  const response = await axios.post(`${getStrapiUrl({ path: ENDPOINT })}`, {
    data: {
      title,
      seo: MOCK_SEO
    }
  });

  await expect(response.status, 'Documents categories creation')
    .toEqual(HttpStatusCode.Created);

  return response
}

export async function deleteDocumentCategoryByTitle({
  title
}: {
  title: string;
}) {
  const documentCategoriesResponse = (await axios.get(getStrapiUrl({ path: `${ENDPOINT}?populate=*` }))).data;

  const documentCategory = getDocumentCategoryByTitle({
    documentCategories: documentCategoriesResponse,
    title
  });

  if (documentCategory) {
    const response = await axios.delete(getStrapiUrl({
      path: `${ENDPOINT}/${documentCategory.documentId}`
    }));

    await expect(response.status, 'Documents categories deletion')
      .toEqual(HttpStatusCode.NoContent);
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