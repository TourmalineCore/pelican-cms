import test, { expect, Page } from "@playwright/test";
import { createAndPublishContactZooPage, deleteContactZooPage } from "../helpers/contact-zoo-page-helpers/contact-zoo-page-helpers";
import { authenticateWithJwtToken, getStrapiUrl } from "../helpers/global-helpers";
import axios from "axios";
import qs from "qs";
import { MOCK_HERO, MOCK_TEXT_AND_MEDIA, MOCK_IMAGE_WITH_BUTTON_GRID, MOCK_HOME_SERVICES, MOCK_TICKETS, MOCK_SEO } from "../helpers/mocks";

test.describe(`ContactZoo page response tests`, () => {
  test.beforeEach(async ({ page }) => {
    await authenticateWithJwtToken({ page });

    await deleteContactZooPage();
  });

  test.afterEach(async () => {
    await deleteContactZooPage();
  });

  test(`
      GIVEN empty contact zoo page
      WHEN fill out the contact zoo page
      SHOULD get a response contact zoo page
      `,
    checkContactZooPageResponseTest
  );
});


async function checkContactZooPageResponseTest({
  page
}: {
  page: Page
}) {
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

  await createAndPublishContactZooPage({
    page,
    hero: MOCK_HERO,
    textAndMedia: MOCK_TEXT_AND_MEDIA,
    imageWithButtonGrid: MOCK_IMAGE_WITH_BUTTON_GRID,
    tickets: MOCK_TICKETS,
    services: MOCK_HOME_SERVICES,
    seo: MOCK_SEO,
  });

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
    path: `/api/contact-zoo?${qs.stringify(queryParams)}`
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
          link: imageWithButtonGridBlock.button.link,
          label: imageWithButtonGridBlock.button.label,
        },
        {
          __component: ticketsBlock.__component,
          title: ticketsBlock.title,
          description: ticketsBlock.description,
          tickets: [
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
  })
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