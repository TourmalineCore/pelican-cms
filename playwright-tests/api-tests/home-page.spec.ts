import {
  MOCK_HERO,
  MOCK_HOME_SERVICES,
  MOCK_TEXT_AND_MEDIA,
  MOCK_IMAGE_WITH_BUTTON_GRID,
  MOCK_HOME_MAP_CARD,
  MOCK_HOME_TICKETS,
  MOCK_SEO
} from "../mocks";
import qs from "qs";
import { z } from "zod";
import { getFileIdByName, HttpStatusCode } from "../helpers/global-helpers";
import { ApiTestFixtures, expect, test } from "../helpers/api-test-fixtures";

const ENDPOINT = '/api/home';
const UrlSchema = z.object({

  url: z.string().url()

});


test.describe(`Home page response tests`, () => {
  test.beforeEach(async ({ apiRequest }) => {
    await updateHomePage({ apiRequest });
  });

  test.afterEach(async ({ apiRequest }) => {
    await deleteHomePage({ apiRequest });
  });

  test(`
      GIVEN an empty home page
      WHEN call method PUT ${ENDPOINT}
      AND call method GET ${ENDPOINT}
      SHOULD get a correct response
      `,
    checkHomepageResponseTest
  );
});

async function checkHomepageResponseTest({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  const expectedHomepageResponse = {
    blocks: [
      MOCK_HERO,
      MOCK_HOME_SERVICES,
      MOCK_TEXT_AND_MEDIA,
      MOCK_IMAGE_WITH_BUTTON_GRID,
      MOCK_HOME_MAP_CARD,
      MOCK_HOME_TICKETS,
    ],
    seo: MOCK_SEO
  };

  const queryParams = {
    populate: [
      `blocks.infoCard`,
      `blocks.scheduleCard`,
      `blocks.scheduleCard.timetable`,
      `blocks.image`,
      `blocks.cards`,
      `blocks.cards.cards`,
      `blocks.cards.cards.image`,
      `blocks.cards.cards.labels`,
      `blocks.media`,
      `blocks.button`,
      `blocks.largeImage`,
      `blocks.smallImage`,
      `blocks.generalTickets`,
      `blocks.subsidizedTickets.ticketsList`,
      `seo`,
    ],
  };

  const homepageResponse = await apiRequest(`${ENDPOINT}?${qs.stringify(queryParams)}`);
  const homepageData = await homepageResponse.json();

  const heroBlock = homepageData.data.blocks.find((block) => block.__component === 'shared.hero');
  const textAndMediaBlock = homepageData.data.blocks.find((block) => block.__component === 'shared.text-and-media');
  const imageWithButtonGridBlock = homepageData.data.blocks.find((block) => block.__component === 'shared.image-with-button-grid');
  const servicesBlock = homepageData.data.blocks.find((block) => block.__component === 'home.services');
  const mapCardBlock = homepageData.data.blocks.find((block) => block.__component === 'home.map-card');

  await expect(homepageData.data, 'Home page response is correct')
    .toMatchObject(expectedHomepageResponse);

  UrlSchema.parse(heroBlock.image);

  UrlSchema.parse(servicesBlock.cards.cards[0].image);

  UrlSchema.parse(textAndMediaBlock.media);

  UrlSchema.parse(imageWithButtonGridBlock.largeImage);

  UrlSchema.parse(imageWithButtonGridBlock.smallImage);

  UrlSchema.parse(mapCardBlock.image);
}


async function updateHomePage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const fileId = await getFileIdByName({
      apiRequest
    });

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
              ...MOCK_HOME_SERVICES,
              cards: {
                title: MOCK_HOME_SERVICES.cards.title,
                cards: [
                  {
                    ...MOCK_HOME_SERVICES.cards.cards[0],
                    image: fileId
                  }
                ]
              },
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
            {
              ...MOCK_HOME_MAP_CARD,
              image: fileId
            },
            MOCK_HOME_TICKETS,
          ],
          seo: MOCK_SEO
        },
      }
    });

    await expect(response.status(), 'Home page should be updated with status 200')
      .toEqual(HttpStatusCode.Ok);
  } catch (error) {
    throw new Error(`Failed to update test home page: ${error.message}`)
  }
}

async function deleteHomePage({
  apiRequest
}: {
  apiRequest: ApiTestFixtures['apiRequest'];
}) {
  try {
    const response = await apiRequest(ENDPOINT, {
      method: 'DELETE'
    });

    await expect(response.status(), 'Home page should be deleted with status 204')
      .toEqual(HttpStatusCode.NoContent);
  } catch (error) {
    throw new Error(`Failed to delete test home page: ${error.message}`)
  }
}
