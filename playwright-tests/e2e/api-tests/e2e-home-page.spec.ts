import test, { Page, expect } from "@playwright/test";
import axios from "axios";
import { authenticateWithJwtToken, getStrapiUrl } from "../helpers/global-helpers";
import { deleteHomepage, createAndPublishHomepage } from "../helpers/homepage-helpers/homepage-helpers";
import { MOCK_HERO, MOCK_HOME_SERVICES, MOCK_TEXT_AND_MEDIA, MOCK_IMAGE_WITH_BUTTON_GRID, MOCK_HOME_MAP_CARD, MOCK_HOME_TICKETS, MOCK_SEO } from "../helpers/mocks";
import qs from "qs";

test.describe(`Homepage response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });

    await deleteHomepage()
  });

  test.afterEach(async () => {
    await deleteHomepage()
  });

  test(`
      GIVEN empty home page
      WHEN fill out the home page
      SHOULD get a response home page
      `,
    checkHomepageResponseTest
  );
});


async function checkHomepageResponseTest({
  page
}: {
  page: Page
}) {
  const expectedHomepageResponse = {
    data: {
      blocks: [
        MOCK_HERO,
        MOCK_HOME_SERVICES,
        MOCK_TEXT_AND_MEDIA,
        MOCK_IMAGE_WITH_BUTTON_GRID,
        {
          ...MOCK_HOME_MAP_CARD,
          description: `<p>${MOCK_HOME_MAP_CARD.description}</p>`,
          note: `<p>${MOCK_HOME_MAP_CARD.note}</p>`
        },
        MOCK_HOME_TICKETS,
      ],
      seo: MOCK_SEO
    }
  };

  await createAndPublishHomepage({
    page,
    hero: MOCK_HERO,
    services: MOCK_HOME_SERVICES,
    textAndMedia: MOCK_TEXT_AND_MEDIA,
    imageWithButtonGrid: MOCK_IMAGE_WITH_BUTTON_GRID,
    mapCard: MOCK_HOME_MAP_CARD,
    tickets: MOCK_HOME_TICKETS,
    seo: MOCK_SEO,
  });

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
    path: `/api/home?${qs.stringify(queryParams)}`
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
          link: imageWithButtonGridBlock.button.link,
          label: imageWithButtonGridBlock.button.label,
        },
        {
          __component: mapCardBlock.__component,
          title: mapCardBlock.title,
          description: mapCardBlock.description,
          note: mapCardBlock.note
        },
        {
          __component: homeTicketsBlock.__component,
          generalTicketsTitle: homeTicketsBlock.title,
          generalTickets: [
            {
              category: homeTicketsBlock.generalTickets[0].category,
              description: homeTicketsBlock.generalTickets[0].description,
              price: homeTicketsBlock.generalTickets[0].price,
              frequency: homeTicketsBlock.generalTickets[0].frequency,
            },
          ],
          generalTicketsLink: homeTicketsBlock.generalTicketsLink,
          subsidizedTicketsTitle: homeTicketsBlock.subsidizedTickets.title,
          subsidizedTicketsDescription: homeTicketsBlock.subsidizedTickets.description,
          subsidizedTickets: [
            {
              category: homeTicketsBlock.subsidizedTickets.ticketsList[0].category,
              description: homeTicketsBlock.subsidizedTickets.ticketsList[0].description,
              price: homeTicketsBlock.subsidizedTickets.ticketsList[0].price,
              frequency: homeTicketsBlock.subsidizedTickets.ticketsList[0].frequency,
            },
          ],
          subsidizedTicketsLink: homeTicketsBlock.subsidizedTickets.link,
        },
      ],
      seo: {
        metaTitle: homepageResponse.data.seo.metaTitle,
        metaDescription: homepageResponse.data.seo.metaDescription,
        keywords: homepageResponse.data.seo.keywords,
      }
    }
  })
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