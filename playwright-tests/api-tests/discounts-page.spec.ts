import { MOCK_DISCOUNTS_CATEGORIES, MOCK_DISCOUNTS_TERMS, MOCK_SEO } from "../mocks";
import qs from "qs";
import { getFileIdByName, HttpStatusCode, TEST_FILE_NAME_PREFIX } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";

const ENDPOINT = `/api/discount-page`;

test.describe(`Discounts page response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await updateDiscountsPage({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteDiscountsPage({ apiRequest });
  });


  test(`
      GIVEN an empty discounts page
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkDiscountsPageResponseTest
  );
});


async function checkDiscountsPageResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedDiscountsPageResponse = {
    blocks: [
      MOCK_DISCOUNTS_CATEGORIES,
      MOCK_DISCOUNTS_TERMS,
    ],
    seo: MOCK_SEO
  };

  const queryParams = {
    populate: [
      "blocks.remark.file",
      "blocks.rulesCards",
      "blocks.discountsCards.rules.basis.file",
      'blocks.discountsCards.rules.docs',
      'blocks.discountsCards.rules.terms',
      `seo`,
    ],
  };

  const discountsPageResponse = await apiRequest(
    `${ENDPOINT}?${qs.stringify(queryParams)}`
  );

  const discountsPageData = await discountsPageResponse.json();

  const categoriesBlock = discountsPageData.data.blocks.find((block) => block.__component === 'discounts.categories');

  await expect(discountsPageData.data, 'Discounts page response is correct')
    .toMatchObject(expectedDiscountsPageResponse);

  await expect(categoriesBlock.remark.file.url)
    .not.
    toBeNull()
}

async function updateDiscountsPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'PUT',
      data: {
        data: {
          blocks: [
            {
              __component: MOCK_DISCOUNTS_CATEGORIES.__component,
              title: MOCK_DISCOUNTS_CATEGORIES.title,
              discountsCards: [{
                title: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].title,
                price: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].price,
                note: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].note,
                rules: {
                  info: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].rules.info,
                  terms: [{
                    text: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].rules.terms[0].text
                  }],
                  docs: [{
                    text: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].rules.docs[0].text
                  }],
                  basis: [{
                    title: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].rules.basis[0].title,
                    link: MOCK_DISCOUNTS_CATEGORIES.discountsCards[0].rules.basis[0].link,
                  }]
                }
              }],
              remark: {
                title: MOCK_DISCOUNTS_CATEGORIES.remark.title,
                file: await getFileIdByName({
                  name: `${TEST_FILE_NAME_PREFIX}-new-document.pdf`,
                  apiRequest
                })
              },
            },
            MOCK_DISCOUNTS_TERMS,
          ],
          seo: MOCK_SEO
        }
      }
    });

    await expect(response.status(), 'Discounts page updating')
      .toEqual(HttpStatusCode.Ok);
  } catch (error: any) {
    throw new Error(`Failed to update test discounts page: ${error.message}`)
  }

}

async function deleteDiscountsPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'DELETE'
    });

    await expect(response.status(), 'Discounts page should be deleted with status 200')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error: any) {
    throw new Error(`Failed to delete test visiting rules page: ${error.message}`)
  }
}