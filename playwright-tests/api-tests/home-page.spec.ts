import test, { expect } from "@playwright/test";
import axios, { HttpStatusCode } from "axios";
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
import { getFileIdByName, getStrapiUrl } from "../helpers/global-helpers";

const ENDPOINT = '/api/home';

test.describe(`Home page response tests`, () => {
  test.beforeEach(async () => {
    await updateCreateHomePage();
  });

  test.afterEach(async () => {
    await deleteHomePage();
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


async function checkHomepageResponseTest() {
  const expectedHomepageResponse = {
    data: {
      blocks: [
        MOCK_HERO,
        MOCK_HOME_SERVICES,
        MOCK_TEXT_AND_MEDIA,
        MOCK_IMAGE_WITH_BUTTON_GRID,
        MOCK_HOME_MAP_CARD,
        MOCK_HOME_TICKETS,
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

  const homepageResponse = (await axios.get(getStrapiUrl({
    path: `${ENDPOINT}?${qs.stringify(queryParams)}`
  }))).data;

  const heroBlock = homepageResponse.data.blocks.find((block) => block.__component === 'shared.hero');
  const textAndMediaBlock = homepageResponse.data.blocks.find((block) => block.__component === 'shared.text-and-media');
  const imageWithButtonGridBlock = homepageResponse.data.blocks.find((block) => block.__component === 'shared.image-with-button-grid');
  const servicesBlock = homepageResponse.data.blocks.find((block) => block.__component === 'home.services');
  const mapCardBlock = homepageResponse.data.blocks.find((block) => block.__component === 'home.map-card');
  const homeTicketsBlock = homepageResponse.data.blocks.find((block) => block.__component === 'home.tickets');

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
          __component: servicesBlock.__component,
          phone: servicesBlock.phone,
          email: servicesBlock.email,
          cards: {
            title: servicesBlock.cards.title,
            cards: [
              {
                title: servicesBlock.cards.cards[0].title,
                description: servicesBlock.cards.cards[0].description,
                link: servicesBlock.cards.cards[0].link,
                labels: [{
                  text: servicesBlock.cards.cards[0].labels[0].text
                }]
              }
            ],
          }
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
          __component: mapCardBlock.__component,
          title: mapCardBlock.title,
          description: mapCardBlock.description,
          note: mapCardBlock.note
        },
        {
          __component: homeTicketsBlock.__component,
          title: homeTicketsBlock.title,
          generalTickets: [
            {
              category: homeTicketsBlock.generalTickets[0].category,
              description: homeTicketsBlock.generalTickets[0].description,
              price: homeTicketsBlock.generalTickets[0].price,
              frequency: homeTicketsBlock.generalTickets[0].frequency,
              theme: homeTicketsBlock.generalTickets[0].theme
            },
          ],
          generalTicketsLink: homeTicketsBlock.generalTicketsLink,
          subsidizedTickets: {
            title: homeTicketsBlock.subsidizedTickets.title,
            description: homeTicketsBlock.subsidizedTickets.description,
            ticketsList: [
              {
                category: homeTicketsBlock.subsidizedTickets.ticketsList[0].category,
                description: homeTicketsBlock.subsidizedTickets.ticketsList[0].description,
                price: homeTicketsBlock.subsidizedTickets.ticketsList[0].price,
                frequency: homeTicketsBlock.subsidizedTickets.ticketsList[0].frequency,
                theme: homeTicketsBlock.subsidizedTickets.ticketsList[0].theme
              }
            ],
            link: homeTicketsBlock.subsidizedTickets.link,
          }
        },
      ],
      seo: {
        metaTitle: homepageResponse.data.seo.metaTitle,
        metaDescription: homepageResponse.data.seo.metaDescription,
        keywords: homepageResponse.data.seo.keywords,
      }
    }
  }, 'Home page response corrected')
    .toEqual(expectedHomepageResponse);

  await expect(heroBlock.image.url)
    .not
    .toBeNull();

  await expect(servicesBlock.cards.cards[0].image.url)
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

  await expect(mapCardBlock.image.url)
    .not
    .toBeNull();
}


async function updateCreateHomePage() {
  const fileId = await getFileIdByName();

  const response = await axios.put(`${getStrapiUrl({ path: ENDPOINT })}`, {
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
  });

  await expect(response.status, 'Home page updating')
    .toEqual(HttpStatusCode.Ok);
}

async function deleteHomePage() {
  const response = await axios.delete(getStrapiUrl({ path: ENDPOINT }));

  await expect(response.status, 'Home page deletion')
    .toEqual(HttpStatusCode.NoContent);
}