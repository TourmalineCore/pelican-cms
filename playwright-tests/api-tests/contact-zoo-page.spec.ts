import test, { expect } from "@playwright/test";
import axios, { HttpStatusCode } from "axios";
import qs from "qs";
import {
  MOCK_HERO,
  MOCK_TEXT_AND_MEDIA,
  MOCK_IMAGE_WITH_BUTTON_GRID,
  MOCK_HOME_SERVICES,
  MOCK_TICKETS,
  MOCK_SEO
} from "../mocks";
import { getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";

const ENDPOINT = `/api/contact-zoo`;

test.describe(`ContactZoo page response tests`, () => {
  test.beforeEach(async () => {
    await createContactZooPage();
  });

  test.afterEach(async () => {
    await deleteContactZooPage();
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


async function checkContactZooPageResponseTest() {
  const expectedConcatZooPageResponse = {
    data: {
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
      seo: MOCK_SEO
    }
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

  const contactZooPageResponse = (await axios.get(getStrapiUrl({
    path: `${ENDPOINT}?${qs.stringify(queryParams)}`
  }))).data;

  const heroBlock = contactZooPageResponse.data.blocks.find((block) => block.__component === 'shared.hero');
  const textAndMediaBlock = contactZooPageResponse.data.blocks.find((block) => block.__component === 'shared.text-and-media');
  const imageWithButtonGridBlock = contactZooPageResponse.data.blocks.find((block) => block.__component === 'shared.image-with-button-grid');
  const ticketsBlock = contactZooPageResponse.data.blocks.find((block) => block.__component === 'shared.tickets');
  const servicesBlock = contactZooPageResponse.data.blocks.find((block) => block.__component === 'shared.cards');

  await expect({
    data: {
      blocks: [
        {
          title: heroBlock.title,
          __component: heroBlock.__component,
          infoCard: {
            title: heroBlock.infoCard.title,
            description: heroBlock.infoCard.description
          },
          scheduleCard: {
            title: heroBlock.scheduleCard.title,
            timetable: [
              {
                days: heroBlock.scheduleCard.timetable[0].days,
                time: heroBlock.scheduleCard.timetable[0].time,
                ticketsOfficeTime: heroBlock.scheduleCard.timetable[0].ticketsOfficeTime
              }
            ]
          },
        },
        {
          __component: textAndMediaBlock.__component,
          title: textAndMediaBlock.title,
          description: textAndMediaBlock.description,
          contentOrder: textAndMediaBlock.contentOrder,
          viewFootsteps: textAndMediaBlock.viewFootsteps,
        },
        {
          __component: imageWithButtonGridBlock.__component,
          title: imageWithButtonGridBlock.title,
          description: imageWithButtonGridBlock.description,
          button: {
            link: imageWithButtonGridBlock.button.link,
            label: imageWithButtonGridBlock.button.label
          }
        },
        {
          __component: ticketsBlock.__component,
          title: ticketsBlock.title,
          description: ticketsBlock.description,
          subsidizedTickets: [
            {
              category: ticketsBlock.subsidizedTickets[0].category,
              description: ticketsBlock.subsidizedTickets[0].description,
              price: ticketsBlock.subsidizedTickets[0].price,
              frequency: ticketsBlock.subsidizedTickets[0].frequency,
            },
          ],
          note: ticketsBlock.note,
          link: ticketsBlock.link,
        },
        {
          __component: servicesBlock.__component,
          title: servicesBlock.title,
          cards: [
            {
              title: servicesBlock.cards[0].title,
              description: servicesBlock.cards[0].description,
              link: servicesBlock.cards[0].link,
              labels: [{
                text: servicesBlock.cards[0].labels[0].text
              }]
            }
          ],
        },
      ],
      seo: {
        metaTitle: contactZooPageResponse.data.seo.metaTitle,
        metaDescription: contactZooPageResponse.data.seo.metaDescription,
        keywords: contactZooPageResponse.data.seo.keywords
      }
    }
  }, 'Contact zoo page response corrected')
    .toEqual(expectedConcatZooPageResponse);

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

async function createContactZooPage() {
  const fileId = await getFileIdByName();

  const response = await axios.put(`${getStrapiUrl({ path: ENDPOINT })}`, {
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
  });

  await expect(response.status, 'Contact zoo page updating')
    .toEqual(HttpStatusCode.Ok);
}

async function deleteContactZooPage() {
  const response = await axios.delete(getStrapiUrl({
    path: ENDPOINT
  }));

  await expect(response.status, 'Contact zoo page deletion')
    .toEqual(HttpStatusCode.NoContent);
}