import test, { expect } from "@playwright/test";
import axios, { AxiosError, HttpStatusCode } from "axios";
import qs from "qs";
import {
  MOCK_VISITING_RULES_MAIN,
  MOCK_VISITING_RULES_WARNINGS,
  MOCK_VISITING_RULES_PHOTOS_POLICY,
  MOCK_VISITING_RULES_EMERGENCY_PHONES,
  MOCK_SEO
} from "../mocks";
import { getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";

const ENDPOINT = `/api/visiting-rules-page`;

test.describe(`VisitingRules page response tests`, () => {
  test.beforeEach(async () => {
    await updateVisitingRulesPage();
  });

  test.afterEach(async () => {
    await deleteVisitingRulesPage();
  });

  test(`
      GIVEN an empty visiting rules page
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkVisitingRulesPageResponseTest
  );
});


async function checkVisitingRulesPageResponseTest() {
  const expectedVisitingRulesPageResponse = {
    data: {
      blocks: [
        MOCK_VISITING_RULES_MAIN,
        MOCK_VISITING_RULES_WARNINGS,
        MOCK_VISITING_RULES_PHOTOS_POLICY,
        MOCK_VISITING_RULES_EMERGENCY_PHONES,
      ],
      seo: MOCK_SEO
    }
  };

  const queryParams = {
    populate: [
      `blocks.documentLink.file`,
      `blocks.mainRules.mainRulesCards.image`,
      `blocks.warningsCards`,
      `blocks.photosPolicyCards`,
      `blocks.emergencyPhonesCards`,
      `seo`,
    ],
  };

  const visitingRulesPageResponse = (await axios.get(getStrapiUrl({
    path: `${ENDPOINT}?${qs.stringify(queryParams)}`
  }))).data;

  const mainBlock = visitingRulesPageResponse.data.blocks.find((block) => block.__component === 'visiting-rules.visiting-rules-main');
  const warningsBlock = visitingRulesPageResponse.data.blocks.find((block) => block.__component === 'visiting-rules.warnings');
  const photosPolicyBlock = visitingRulesPageResponse.data.blocks.find((block) => block.__component === 'visiting-rules.photos-policy');
  const emergencyPhonesBlock = visitingRulesPageResponse.data.blocks.find((block) => block.__component === 'visiting-rules.emergency-phones');

  await expect({
    data: {
      blocks: [
        {
          __component: mainBlock.__component,
          title: mainBlock.title,
          documentLink: {
            label: mainBlock.documentLink.label,
          },
          description: mainBlock.description,
          mainRules: {
            title: mainBlock.mainRules.title,
            mainRulesCards: [
              {
                label: mainBlock.mainRules.mainRulesCards[0].label,
              },
            ],
          },
        },
        {
          __component: warningsBlock.__component,
          warningsCards: [
            {
              label: warningsBlock.warningsCards[0].label,
            },
          ],
        },
        {
          __component: photosPolicyBlock.__component,
          title: photosPolicyBlock.title,
          photosPolicyCards: [
            {
              label: photosPolicyBlock.photosPolicyCards[0].label,
            },
          ],
        },
        {
          __component: emergencyPhonesBlock.__component,
          title: emergencyPhonesBlock.title,
          emergencyPhonesCards: [
            {
              phone: emergencyPhonesBlock.emergencyPhonesCards[0].phone,
              label: emergencyPhonesBlock.emergencyPhonesCards[0].label,
            },
          ],
        },
      ],
      seo: {
        metaTitle: visitingRulesPageResponse.data.seo.metaTitle,
        metaDescription: visitingRulesPageResponse.data.seo.metaDescription,
        keywords: visitingRulesPageResponse.data.seo.keywords
      }
    }
  }, 'Visiting rules page response corrected')
    .toEqual(expectedVisitingRulesPageResponse);

  await expect(mainBlock.mainRules.mainRulesCards[0].image)
    .not
    .toBeNull();

  await expect(mainBlock.documentLink.file.url)
    .not
    .toBeNull();
}

async function updateVisitingRulesPage() {
  try {
    const response = await axios.put(`${getStrapiUrl({ path: ENDPOINT })}`, {
      data: {
        blocks: [
          {
            __component: MOCK_VISITING_RULES_MAIN.__component,
            title: MOCK_VISITING_RULES_MAIN.title,
            documentLink: {
              label: MOCK_VISITING_RULES_MAIN.documentLink.label,
              file: await getFileIdByName({
                name: '[E2E-SMOKE]-new-document.pdf'
              }),
            },
            description: MOCK_VISITING_RULES_MAIN.description,
            mainRules: {
              title: MOCK_VISITING_RULES_MAIN.mainRules.title,
              mainRulesCards: [
                {
                  image: await getFileIdByName(),
                  label: MOCK_VISITING_RULES_MAIN.mainRules.mainRulesCards[0].label,
                },
              ],
            },
          },
          MOCK_VISITING_RULES_WARNINGS,
          MOCK_VISITING_RULES_PHOTOS_POLICY,
          MOCK_VISITING_RULES_EMERGENCY_PHONES,
        ],
        seo: MOCK_SEO
      },
    });

    await expect(response.status, 'Visiting rules page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test visiting rules page: ${(error as AxiosError).message}`)
  }

}

async function deleteVisitingRulesPage() {
  try {
    const response = await axios.delete(getStrapiUrl({
      path: ENDPOINT
    }));

    await expect(response.status, 'Visiting rules page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test visiting rules page: ${(error as AxiosError).message}`)
  }
}