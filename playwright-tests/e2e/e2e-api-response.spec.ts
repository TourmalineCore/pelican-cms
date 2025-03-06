import test, { expect, Page } from "@playwright/test";
import { authenticate, deleteFiles, E2E_SMOKE_NAME_PREFIX, getStrapiUrl, gotoCMS } from "./helpers/global-helpers";
import { createAndPublishDocumentsCategory, deleteDocumentsCategories, getDocumentCategoriesWithTestPrefix } from "./helpers/documents-helpers/documents-categories-helpers";
import { createAndPublishDocument, deleteDocuments, getDocumentsWithTestPrefix } from "./helpers/documents-helpers/documents-helpers";
import { createAndPublishNews, deleteNews, getNewsWithTestPrefix } from "./helpers/news-helpers/news-helpers";
import axios from "axios";
import { createAndPublishHomepage, deleteHomepage } from "./helpers/homepage-helpers/homepage-helpers";
import { createAndPublishContactZooPage, deleteContactZooPage } from "./helpers/contact-zoo-page-helpers/contact-zoo-page-helpers";
import qs from "qs";
import { MOCK_HOME_SERVICES, MOCK_SEO, MOCK_HERO, MOCK_TEXT_AND_MEDIA, MOCK_IMAGE_WITH_BUTTON_GRID, MOCK_HOME_MAP_CARD, MOCK_HOME_TICKETS, MOCK_TICKETS } from "./helpers/mocks";
import { createAndPublishNewsPage, deleteNewsPage } from "./helpers/news-page-helpers/news-page-helpers";
import { createAndPublishDocumentsPage, deleteDocumentsPage } from "./helpers/documents-page-helpers/documents-page-helpers";


test.describe(`API response tests`, () => {
  let page: Page;

  test.beforeAll(async ({
    browser,
  }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    await gotoCMS({ page });

    await authenticate({
      page,
    });
  });


  test.describe(`News response tests`, () => {
    test.beforeEach(async () => {
      await deleteNews();

      await deleteFiles();
    });

    test.afterEach(async () => {
      await deleteNews();

      await deleteFiles();
    });

    test(`
      GIVEN collection of news without record
      WHEN create one news
      SHOULD get a response with this news
      `,
      async () => await checkNewsResponseTest({ page })
    );
  });

  test.describe(`Documents categories response tests`, () => {
    test.beforeEach(async () => {
      await deleteDocumentsCategories();

      await deleteFiles();
    });

    test.afterEach(async () => {
      await deleteDocumentsCategories();

      await deleteFiles();
    });

    test(`
      GIVEN collection of documents categories without record
      WHEN create one category
      SHOULD get a response with this category
      `,
      async () => await checkDocumentsCategoriesResponseTest({ page })
    );
  });

  test.describe(`Documents response tests`, () => {
    test.beforeEach(async () => {
      await deleteDocumentsCategories();

      await deleteDocuments();

      await deleteFiles();;
    });

    test.afterEach(async () => {
      await deleteDocumentsCategories();

      await deleteDocuments();

      await deleteFiles();
    });

    test(`
      GIVEN collection of documents without record
      WHEN create one document
      SHOULD get a response with this document
      `,
      async () => await checkDocumentsResponseTest({ page })
    );
  });

  test.describe(`Homepage response tests`, () => {
    test.beforeEach(async () => {
      await deleteHomepage()

      await deleteFiles();
    });

    test.afterEach(async () => {
      await deleteHomepage()

      await deleteFiles();
    });

    test(`
      GIVEN empty home page
      WHEN fill out the home page
      SHOULD get a response home page
      `,
      async () => await checkHomepageResponseTest({ page })
    );
  });

  test.describe(`ContactZoo page response tests`, () => {
    test.beforeEach(async () => {
      await deleteContactZooPage();

      await deleteFiles();
    });

    test.afterEach(async () => {
      await deleteContactZooPage();

      await deleteFiles();
    });

    test(`
      GIVEN empty contact zoo page
      WHEN fill out the contact zoo page
      SHOULD get a response contact zoo page
      `,
      async () => await checkContactZooPageResponseTest({ page })
    );
  });

  test.describe(`News page response tests`, () => {
    test.beforeEach(async () => {
      await deleteNewsPage();
    });

    test.afterEach(async () => {
      await deleteNewsPage();
    });


    test(`
      GIVEN empty news page
      WHEN fill out the news page
      SHOULD get a response news page
      `,
      async () => await checkNewsPageResponseTest({ page })
    );
  });

  test.describe(`Documents page response tests`, () => {
    test.beforeEach(async () => {
      await deleteDocumentsPage();
    });

    test.afterEach(async () => {
      await deleteDocumentsPage();
    });


    test(`
      GIVEN empty documents page
      WHEN fill out the documents page
      SHOULD get a response documents  page
      `,
      async () => await checkDocumentsPageResponseTest({ page })
    );
  });
})


async function checkNewsResponseTest({
  page,
}: {
  page: Page
}) {
  const title = `${E2E_SMOKE_NAME_PREFIX} В зоопарке появился амурский тигр`;
  const description = `На фотографии изображен амурский тигр!`;
  const innerContent = `В зоопарке появился амурский тигр, приходите посмотреть!`;
  const expectedNewsResponse = {
    data: [
      {
        title,
        description,
        innerContent: `<p>${innerContent}</p>`,
        slug: 'e2e-smoke-v-zooparke-poyavilsya-amurskij-tigr',
        seo: MOCK_SEO
      }
    ]
  };

  await createAndPublishNews({
    page,
    title,
    description,
    innerContent,
    seo: MOCK_SEO,
    filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`,
  });

  const newsResponse = (await axios.get(getStrapiUrl({ path: '/api/news?populate=*' }))).data;
  const newsWithPrefix = getNewsWithTestPrefix({ news: newsResponse });

  await expect({
    data: [
      {
        title: newsWithPrefix[0].title,
        description: newsWithPrefix[0].description,
        innerContent: newsWithPrefix[0].innerContent,
        slug: newsWithPrefix[0].slug,
        seo: {
          metaTitle: newsWithPrefix[0].seo.metaTitle,
          metaDescription: newsWithPrefix[0].seo.metaDescription,
          keywords: newsWithPrefix[0].seo.keywords
        }
      }
    ]
  })
    .toEqual(expectedNewsResponse);

  await expect(newsWithPrefix[0].image.url)
    .not
    .toBeNull();
}

async function checkNewsPageResponseTest({
  page
}: {
  page: Page
}) {
  const newsTitle = 'Новости';
  const expectedNewsPageResponse = {
    data: {
      newsTitle,
      seo: MOCK_SEO
    }
  };

  await createAndPublishNewsPage({
    page,
    newsTitle,
    seo: MOCK_SEO
  })

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const newsPageResponse = (await axios.get(getStrapiUrl({
    path: `/api/news-page?${qs.stringify(queryParams)}`
  }))).data;


  await expect({
    data: {
      newsTitle: newsPageResponse.data.title,
      seo: {
        metaTitle: newsPageResponse.data.seo.metaTitle,
        metaDescription: newsPageResponse.data.seo.metaDescription,
        keywords: newsPageResponse.data.seo.keywords
      }
    }
  })
    .toEqual(expectedNewsPageResponse);
}

async function checkDocumentsPageResponseTest({
  page
}: {
  page: Page
}) {
  const documentsTitle = 'Информация о деятельности МБУК «Зоопарк»';
  const expectedDocumentsPageResponse = {
    data: {
      documentsTitle,
      seo: MOCK_SEO
    }
  };

  await createAndPublishDocumentsPage({
    page,
    documentsTitle,
    seo: MOCK_SEO
  })

  const queryParams = {
    populate: [
      `seo`,
    ],
  };

  const documentsPageResponse = (await axios.get(getStrapiUrl({
    path: `/api/documents-page?${qs.stringify(queryParams)}`
  }))).data;


  await expect({
    data: {
      documentsTitle: documentsPageResponse.data.title,
      seo: {
        metaTitle: documentsPageResponse.data.seo.metaTitle,
        metaDescription: documentsPageResponse.data.seo.metaDescription,
        keywords: documentsPageResponse.data.seo.keywords
      }
    }
  })
    .toEqual(expectedDocumentsPageResponse);
}

async function checkDocumentsResponseTest({
  page,
}: {
  page: Page
}) {
  const categoryTitle = `${E2E_SMOKE_NAME_PREFIX} Отчёты`;
  const showDate = false;
  const title = `${E2E_SMOKE_NAME_PREFIX} Договор №350474`;
  const subtitle = `Договор на поставку продукции животноводства (мясо говядина) для нужд муниципального бюджетного учреждения культуры «зоопарк»`;
  const description = `Контракт заключен по результатам электронного аукциона в рамках 223-ФЗ. Извещение №31907985126 в электронной форме размещены на сайте по адресу в сети Интернет: www.zakupki.gov.ru и на электронной площадке tender.otc.ru процедура №4442641 лот №7816638. Протокол №U4442641-7816638-3 от 07.07.2019 г.`;
  const date = new Date();
  const expectedDocumentsResponse = {
    data: [
      {
        date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`,
        showDate,
        title,
        subtitle: `<p>${subtitle}</p>`,
        description: `<p>${description}</p>`,
      }
    ]
  };

  await createAndPublishDocumentsCategory({
    page,
    title: categoryTitle,
  });

  await createAndPublishDocument({
    page,
    categoryTitle,
    title,
    subtitle,
    description,
    filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-new-document.pdf`,
  });

  const documentsResponse = (await axios.get(getStrapiUrl({ path: '/api/documents?populate=*' }))).data;
  const documentsWithPrefix = getDocumentsWithTestPrefix({ documents: documentsResponse });

  await expect({
    data: [
      {
        date: documentsWithPrefix[0].date,
        showDate: documentsWithPrefix[0].showDate,
        title: documentsWithPrefix[0].title,
        subtitle: documentsWithPrefix[0].subtitle,
        description: documentsWithPrefix[0].description,
      }
    ]
  })
    .toEqual(expectedDocumentsResponse);

  await expect(documentsWithPrefix[0].files[0].url)
    .not
    .toBeNull();
}

async function checkDocumentsCategoriesResponseTest({
  page,
}: {
  page: Page
}) {
  const title = `${E2E_SMOKE_NAME_PREFIX} Отчёты`;
  const expectedDocumentsCategoriesResponse = {
    data: [
      {
        title,
        slug: 'e2e-smoke-otchyoty',
        seo: MOCK_SEO
      }
    ]
  };

  await createAndPublishDocumentsCategory({
    page,
    title,
    seo: MOCK_SEO,
  });

  const documentsCategoriesResponse = (await axios.get(getStrapiUrl({ path: '/api/documents-categories?populate=*' }))).data;
  const documentCategoriesWithPrefix = getDocumentCategoriesWithTestPrefix({ documentCategories: documentsCategoriesResponse });

  await expect({
    data: [
      {
        title: documentCategoriesWithPrefix[0].title,
        slug: documentCategoriesWithPrefix[0].slug,
        seo: {
          metaTitle: documentCategoriesWithPrefix[0].seo.metaTitle,
          metaDescription: documentCategoriesWithPrefix[0].seo.metaDescription,
          keywords: documentCategoriesWithPrefix[0].seo.keywords,
        },
      }
    ]
  })
    .toEqual(expectedDocumentsCategoriesResponse);
}

async function checkHomepageResponseTest({
  page
}: {
  page: Page
}) {
  const { filePath, ...expectedHero } = MOCK_HERO;
  const { filePath: servicesFilePath, ...expectedServices } = MOCK_HOME_SERVICES;
  const { filePath: textAndMediaFilePath, ...expectedTextAndMedia } = MOCK_TEXT_AND_MEDIA;
  const {
    largeImagePath: imageWithButtonGridLargeImagePath,
    smallImagePath: imageWithButtonGridSmallImagePath,
    ...expectedImageWithButtonGrid
  } = MOCK_IMAGE_WITH_BUTTON_GRID;
  const {
    imagePath: mapCardImagePath,
    ...expectedMapCard
  } = MOCK_HOME_MAP_CARD;

  const expectedHomepageResponse = {
    data: {
      blocks: [
        expectedHero,
        expectedServices,
        expectedTextAndMedia,
        expectedImageWithButtonGrid,
        {
          ...expectedMapCard,
          description: `<p>${expectedMapCard.description}</p>`,
          note: `<p>${expectedMapCard.note}</p>`
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

async function checkContactZooPageResponseTest({
  page
}: {
  page: Page
}) {
  const { filePath, ...expectedHero } = MOCK_HERO;
  const { filePath: textAndMediaFilePath, ...expectedTextAndMedia } = MOCK_TEXT_AND_MEDIA;
  const {
    largeImagePath: imageWithButtonGridLargeImagePath,
    smallImagePath: imageWithButtonGridSmallImagePath,
    ...expectedImageWithButtonGrid
  } = MOCK_IMAGE_WITH_BUTTON_GRID;

  const expectedConcatZooPageResponse = {
    data: {
      blocks: [
        expectedHero,
        expectedTextAndMedia,
        expectedImageWithButtonGrid,
        MOCK_TICKETS,
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
}