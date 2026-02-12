import qs from "qs";
import {
  MOCK_HERO,
  MOCK_TEXT_AND_MEDIA,
  MOCK_IMAGE_WITH_BUTTON_GRID,
  MOCK_HOME_SERVICES,
  MOCK_TICKETS,
  MOCK_SEO
} from "../mocks";
import { getFileIdByName, HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";

const ENDPOINT = `/api/contact-zoo`;

test.describe(`ContactZoo page response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await updateContactZooPage({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteContactZooPage({ apiRequest });
  });

  test(`
      GIVEN an empty contact zoo page
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkContactZooPageResponseTest
  );
});

async function checkContactZooPageResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedContactZooPageResponse = {
    blocks: [
      MOCK_HERO,
      MOCK_TEXT_AND_MEDIA,
      MOCK_IMAGE_WITH_BUTTON_GRID,
      MOCK_TICKETS,
      {
        ...MOCK_HOME_SERVICES.cards,
        __component: `shared.cards`,
      },
    ],
    seo: MOCK_SEO,
  };

  const queryParams = {
    populate: [
      `blocks.infoCard`,
      `blocks.scheduleCard`,
      `blocks.scheduleCard.timetable`,
      `blocks.image`,
      `blocks.media`,
      `blocks.button`,
      `blocks.largeImage`,
      `blocks.smallImage`,
      `blocks.subsidizedTickets`,
      `blocks.cards`,
      `blocks.cards.image`,
      `blocks.cards.labels`,
      `seo`,
    ],
  };

  const contactZooPageResponse = await apiRequest(
    `${ENDPOINT}?${qs.stringify(queryParams)}`
  );

  const contactZooPageData = await contactZooPageResponse.json();

  const heroBlock = contactZooPageData.data.blocks.find((block) => block.__component === 'shared.hero');
  const textAndMediaBlock = contactZooPageData.data.blocks.find((block) => block.__component === 'shared.text-and-media');
  const imageWithButtonGridBlock = contactZooPageData.data.blocks.find((block) => block.__component === 'shared.image-with-button-grid');
  const servicesBlock = contactZooPageData.data.blocks.find((block) => block.__component === 'shared.cards');

  await expect(contactZooPageData.data, 'Contact zoo page response is correct')
    .toMatchObject(expectedContactZooPageResponse);

  await expect(heroBlock.image.url)
    .not
    .toBeNull();

  await expect(textAndMediaBlock.media.url)
    .not
    .toBeNull();

  await expect(imageWithButtonGridBlock.largeImage.url)
    .not
    .toBeNull();

  await expect(imageWithButtonGridBlock.smallImage.url)
    .not
    .toBeNull();

  await expect(servicesBlock.cards[0].image.url)
    .not
    .toBeNull();
}

async function updateContactZooPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const fileId = await getFileIdByName({ apiRequest });

    const response = await apiRequest(ENDPOINT, {
      method: 'PUT',
      data: {
        data: {
          blocks: [
            {
              ...MOCK_HERO,
              image: fileId
            },
            {
              ...MOCK_TEXT_AND_MEDIA,
              media: fileId
            },
            {
              ...MOCK_IMAGE_WITH_BUTTON_GRID,
              largeImage: fileId,
              smallImage: fileId
            },
            MOCK_TICKETS,
            {
              __component: `shared.cards`,
              title: MOCK_HOME_SERVICES.cards.title,
              cards: [
                {
                  ...MOCK_HOME_SERVICES.cards.cards[0],
                  image: fileId
                }
              ],
            }
          ],
          seo: MOCK_SEO
        },
      }
    });

    await expect(response.status(), 'Contact zoo page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error: any) {
    throw new Error(`Failed to update test contact zoo page: ${error.message}`)
  }
}

async function deleteContactZooPage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'DELETE'
    });

    await expect(response.status(), 'Contact zoo page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error: any) {
    throw new Error(`Failed to delete test contact zoo page: ${error.message}`)
  }
}
