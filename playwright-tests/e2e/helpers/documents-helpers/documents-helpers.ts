import { Page } from '@playwright/test';
import {
  getStrapiUrl, saveAndPublish, uploadFile
} from '../global-helpers';
import axios from 'axios';
import { E2E_SMOKE_NAME_PREFIX } from '../../consts';

export async function deleteDocuments() {
  const documentsResponse = (await axios.get(getStrapiUrl({ path: '/api/documents?populate=*' }))).data;

  const documentsDelete = getDocumentsWithTestPrefix({ documents: documentsResponse });

  documentsDelete.forEach(async ({ id }) => {
    await axios.delete(getStrapiUrl({ path: `/api/documents/${id}` }));
  })
}

export async function createAndPublishDocument({
  page,
  categoryTitle,
  title,
  subtitle,
  description,
  filePath,
}: {
  page: Page,
  categoryTitle: string,
  title: string,
  subtitle: string,
  description: string,
  filePath: string,
}) {
  await page.getByText(`Content Manager`)
    .click();

  await page.getByText(`Документы`)
    .click();

  await page.getByText(`Create new entry`)
    .first()
    .click();

  await page.getByRole(`checkbox`, {
    name: `showDate`,
  })
    .click();

  await page.locator(`id=title`)
    .fill(title);

  await page.locator(`.ck-content`)
    .nth(0)
    .fill(subtitle);

  await page.locator(`.ck-content`)
    .nth(1)
    .fill(description);

  await uploadFile({
    page,
    filePath,
  });

  await page.locator(`id=category`)
    .click();

  await page.getByText(categoryTitle)
    .first()
    .click();


  await saveAndPublish({ page });
}

export function getDocumentsWithTestPrefix({
  documents
}: {
  documents: DocumentsResponse
}) {
  return documents.data.filter((document) => document?.attributes.title.startsWith(E2E_SMOKE_NAME_PREFIX));
}

type DocumentsResponse = {
  data: {
    id?: number;
    attributes?: {
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
    }
  }[]
}
