import qs from "qs";
import {
  MOCK_VISITING_RULES_MAIN,
  MOCK_VISITING_RULES_WARNINGS,
  MOCK_VISITING_RULES_PHOTOS_POLICY,
  MOCK_VISITING_RULES_EMERGENCY_PHONES,
  MOCK_SEO
} from "../mocks";
import { getFileIdByName, HttpStatusCode, TEST_FILE_NAME_PREFIX } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";

const ENDPOINT = `/api/visiting-rules-page`;

test.describe(`VisitingRules page response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await updateVisitingRulesPage({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteVisitingRulesPage({ apiRequest });
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


async function checkVisitingRulesPageResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedVisitingRulesPageResponse = {
    blocks: [
      MOCK_VISITING_RULES_MAIN,
      MOCK_VISITING_RULES_WARNINGS,
      MOCK_VISITING_RULES_PHOTOS_POLICY,
      MOCK_VISITING_RULES_EMERGENCY_PHONES,
    ],
    seo: MOCK_SEO
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

  const visitingRulesPageResponse = await apiRequest(`${ENDPOINT}?${qs.stringify(queryParams)}`);
  const visitingRulesPageData = await visitingRulesPageResponse.json();

  const mainBlock = visitingRulesPageData.data.blocks.find((block) => block.__component === 'visiting-rules.visiting-rules-main');

  await expect(visitingRulesPageData.data, 'Visiting rules page response is correct')
    .toMatchObject(expectedVisitingRulesPageResponse);

  await expect(mainBlock.mainRules.mainRulesCards[0].image)
    .not
    .toBeNull();

  await expect(mainBlock.documentLink.file.url)
    .not
    .toBeNull();
}

async function updateVisitingRulesPage({
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
              __component: MOCK_VISITING_RULES_MAIN.__component,
              title: MOCK_VISITING_RULES_MAIN.title,
              documentLink: {
                label: MOCK_VISITING_RULES_MAIN.documentLink.label,
                file: await getFileIdByName({
                  name: `${TEST_FILE_NAME_PREFIX}-new-document.pdf`,
                  apiRequest
                }),
              },
              description: MOCK_VISITING_RULES_MAIN.description,
              mainRules: {
                title: MOCK_VISITING_RULES_MAIN.mainRules.title,
                mainRulesCards: [
                  {
                    image: await getFileIdByName({
                      apiRequest
                    }),
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
      }
    });

    await expect(response.status(), 'Visiting rules page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error: any) {
    throw new Error(`Failed to update test visiting rules page: ${error.message}`)
  }

}

async function deleteVisitingRulesPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'DELETE'
    });

    await expect(response.status(), 'Visiting rules page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error: any) {
    throw new Error(`Failed to delete test visiting rules page: ${error.message}`)
  }
}