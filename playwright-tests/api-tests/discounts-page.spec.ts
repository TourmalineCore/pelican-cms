import test, { expect } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { MOCK_DISCOUNTS_CATEGORIES, MOCK_DISCOUNTS_TERMS, MOCK_SEO } from "../mocks";
import qs from "qs";
import { getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";

const ENDPOINT = `/api/discount-page`;

test.describe(`Discounts page response tests`, () => {
  test.beforeEach(async () => {
    await updateDiscountsPage();
  });

  test.afterEach(async () => {
    await deleteDiscountsPage();
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


async function checkDiscountsPageResponseTest() {
  const expectedDiscountsPageResponse = {
    data: {
      blocks: [
        MOCK_DISCOUNTS_TERMS,
        MOCK_DISCOUNTS_CATEGORIES,
      ],
      seo: MOCK_SEO
    }
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

  const discountsPageResponse = (await axios.get(getStrapiUrl({
    path: `${ENDPOINT}?${qs.stringify(queryParams)}`
  }))).data;
  console.log(discountsPageResponse)

  const termsBlock = discountsPageResponse.data.blocks.find((block) => block.__component === 'discounts.terms');
  const categoriesBlock = discountsPageResponse.data.blocks.find((block) => block.__component === 'discounts.categories');

  await expect({
    data: {
      blocks: [
        {
          __component: termsBlock.__component,
          title: termsBlock.title,
          subtitle: termsBlock.subtitle,
          rulesCards: [{
            text: termsBlock.rulesCards[0].text
          }],
        },
        {
          __component: categoriesBlock.__component,
          title: categoriesBlock.title,
          discountsCards: [{
            title: categoriesBlock.discountsCards[0].title,
            price: categoriesBlock.discountsCards[0].price,
            note: categoriesBlock.discountsCards[0].note,
            rules: {
              info: categoriesBlock.discountsCards[0].rules.info,
              terms: [{
                text: categoriesBlock.discountsCards[0].rules.terms[0].text
              }],
              docs: [{
                text: categoriesBlock.discountsCards[0].rules.docs[0].text
              }],
              basis: [{
                title: categoriesBlock.discountsCards[0].rules.basis[0].title,
                link: categoriesBlock.discountsCards[0].rules.basis[0].link,
              }]
            }
          }],
          remark: {
            title: categoriesBlock.remark.title,
          },
        },
      ],
      seo: {
        metaTitle: discountsPageResponse.data.seo.metaTitle,
        metaDescription: discountsPageResponse.data.seo.metaDescription,
        keywords: discountsPageResponse.data.seo.keywords
      }
    }
  }, 'Discounts page response corrected')
    .toEqual(expectedDiscountsPageResponse);

  await expect(categoriesBlock.remark.file.url)
    .not.
    toBeNull()
}

async function updateDiscountsPage() {

  try {
    const response = await axios.put(`${getStrapiUrl({ path: ENDPOINT })}`, {
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
                name: '[E2E-SMOKE]-new-document.pdf'
              })
            },
          },
          MOCK_DISCOUNTS_TERMS,
        ],
        seo: MOCK_SEO
      }
    });

    await expect(response.status, 'Discounts page updating')
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Faled to update test discounts page: ${(error as AxiosError).message}`)
  }

}

async function deleteDiscountsPage() {
  try {
    const response = await axios.delete(getStrapiUrl({
      path: ENDPOINT
    }));

    await expect(response.status, 'Discounts page should be deleted with status 200')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test visiting rules page: ${(error as AxiosError).message}`)
  }
}