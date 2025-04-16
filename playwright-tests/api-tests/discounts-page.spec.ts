import test, { expect } from "@playwright/test";
import axios, { HttpStatusCode } from "axios";
import { MOCK_DISCOUNTS_CATEGORIES, MOCK_DISCOUNTS_TERMS, MOCK_SEO } from "../mocks";
import qs from "qs";
import { getStrapiUrl } from "../helpers/global-helpers";

const ENDPOINT = `/api/discount-page`;

test.describe(`Discounts page response tests`, () => {
  test.beforeEach(async () => {
    await createDiscountsPage();
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
      "blocks.rulesCards",
      "blocks.remark",
      `seo`,
    ],
  };

  const discountsPageResponse = (await axios.get(getStrapiUrl({
    path: `${ENDPOINT}?${qs.stringify(queryParams)}`
  }))).data;

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
          remark: {
            title: categoriesBlock.remark.title,
            link: categoriesBlock.remark.link,
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
}

async function createDiscountsPage() {

  const response = await axios.put(`${getStrapiUrl({ path: ENDPOINT })}`, {
    data: {
      blocks: [
        MOCK_DISCOUNTS_TERMS,
        MOCK_DISCOUNTS_CATEGORIES,
      ],
      seo: MOCK_SEO
    }
  });

  await expect(response.status, 'Discounts page updating')
    .toEqual(HttpStatusCode.Ok);
}

async function deleteDiscountsPage() {
  const response = await axios.delete(getStrapiUrl({
    path: ENDPOINT
  }));

  await expect(response.status, 'Discounts page deletion')
    .toEqual(HttpStatusCode.NoContent);
}