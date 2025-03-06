import { Page } from "@playwright/test";
import {
  createHeroBlock,
  createImageWithButtonGridBlock,
  createSeo,
  createTextAndMediaBlock,
  getStrapiUrl,
  saveAndPublish,
  uploadFile
} from "../global-helpers";
import axios from "axios";
import {
  HeroBlock,
  HomeTicketsBlock,
  ImageWithButtonGridBlock,
  MapCardBlock,
  SeoBlock,
  ServicesBlock,
  TextAndMediaBlock
} from "../types";

export async function createAndPublishHomepage({
  page,
  hero,
  services,
  textAndMedia,
  imageWithButtonGrid,
  mapCard,
  tickets,
  seo,
}: {
  page: Page,
  hero: HeroBlock,
  services: ServicesBlock,
  textAndMedia: TextAndMediaBlock,
  imageWithButtonGrid: ImageWithButtonGridBlock,
  mapCard: MapCardBlock,
  tickets: HomeTicketsBlock,
  seo: SeoBlock
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.locator(`a`, { hasText: 'Главная страница' })
    .click();

  await createHeroBlock({
    page,
    id: 0,
    title: hero.title,
    infoCard: hero.infoCard,
    scheduleCard: hero.scheduleCard,
    filePath: hero.filePath
  });

  await createTextAndMediaBlock({
    page,
    id: 1,
    title: textAndMedia.title,
    description: textAndMedia.description,
    filePath: textAndMedia.filePath
  });

  await createServicesBlock({
    page,
    phone: services.phone,
    email: services.email,
    title: services.cards.title,
    card: {
      title: services.cards.cards[0].title,
      description: services.cards.cards[0].description,
      link: services.cards.cards[0].link,
      labels: services.cards.cards[0].labels[0],
    },
    filePath: services.filePath,
  });

  await createImageWithButtonGridBlock({
    page,
    id: 3,
    title: imageWithButtonGrid.title,
    description: imageWithButtonGrid.description,
    link: imageWithButtonGrid.link,
    label: imageWithButtonGrid.label,
    largeImagePath: imageWithButtonGrid.largeImagePath,
    smallImagePath: imageWithButtonGrid.smallImagePath,
  });

  await createMapCardBlock({
    page,
    title: mapCard.title,
    description: mapCard.description,
    note: mapCard.note,
    imagePath: mapCard.imagePath,
  });

  await createTicketsBlock({
    page,
    generalTicketsTitle: tickets.generalTicketsTitle,
    generalTickets: tickets.generalTickets,
    generalTicketsLink: tickets.generalTicketsLink,
    subsidizedTicketsTitle: tickets.subsidizedTicketsTitle,
    subsidizedTicketsDescription: tickets.subsidizedTicketsDescription,
    subsidizedTickets: tickets.subsidizedTickets,
    subsidizedTicketsLink: tickets.subsidizedTicketsLink,
  });

  await createSeo({
    page,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    keywords: seo.keywords
  });

  await saveAndPublish({ page });
}

async function createServicesBlock({
  page,
  title,
  card,
  email,
  phone,
  filePath
}: {
  page: Page,
  title: string,
  phone: ServicesBlock['phone'],
  email: ServicesBlock['email'],
  card: {
    title: string,
    description: string,
    link: string,
    labels: {
      text: string
    },
  }
  filePath: ServicesBlock['filePath']
}) {
  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'home'
  }).click();

  await page.getByRole('button', {
    name: 'Блок с услугами'
  }).click();

  await page.getByRole('button', {
    name: 'Блок с услугами'
  }).click();

  await page.locator('[name="blocks.2.cards.title"]')
    .fill(title);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.locator('[name="blocks.2.cards.cards.0.title"]')
    .fill(card.title);

  await page.locator('[name="blocks.2.cards.cards.0.description"]')
    .fill(card.description);

  await uploadFile({
    page,
    filePath,
  });

  await page.locator('[name="blocks.2.cards.cards.0.link"]')
    .fill(card.link);

  await page.locator('[name="blocks.2.phone"]')
    .fill(phone);

  await page.locator('[name="blocks.2.email"]')
    .fill(email);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.locator('[name="blocks.2.cards.cards.0.labels.0.text"]')
    .fill(card.labels.text);
}

async function createMapCardBlock({
  page,
  title,
  description,
  note,
  imagePath
}: {
  page: Page,
  title: MapCardBlock['title'],
  description: MapCardBlock['description'],
  note: MapCardBlock['note'],
  imagePath: MapCardBlock['imagePath']
}) {
  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'home'
  }).click();

  await page.getByRole('button', {
    name: 'Блок с картой'
  }).click();

  await page.getByRole('button', {
    name: 'Блок с картой'
  }).click();

  await page.locator('[name="blocks.4.title"]')
    .fill(title);

  await page.locator(`.ck-content`)
    .first()
    .fill(description);

  await page.locator(`.ck-content`)
    .last()
    .fill(note);

  await uploadFile({
    page,
    filePath: imagePath
  })
}

async function createTicketsBlock({
  page,
  generalTicketsTitle,
  generalTickets,
  generalTicketsLink,
  subsidizedTicketsTitle,
  subsidizedTicketsDescription,
  subsidizedTickets,
  subsidizedTicketsLink,
}: {
  page: Page,
  generalTicketsTitle: HomeTicketsBlock['generalTicketsTitle'],
  generalTickets: HomeTicketsBlock['generalTickets'],
  generalTicketsLink: HomeTicketsBlock['generalTicketsLink'],
  subsidizedTicketsTitle: HomeTicketsBlock['subsidizedTicketsTitle'],
  subsidizedTicketsDescription: HomeTicketsBlock['subsidizedTicketsDescription'],
  subsidizedTickets: HomeTicketsBlock['subsidizedTickets'],
  subsidizedTicketsLink: HomeTicketsBlock['subsidizedTicketsLink'],
}) {
  await page.getByRole('button', {
    name: 'Add a component to blocks'
  }).click();

  await page.getByRole('button', {
    name: 'home'
  }).click();

  await page.getByRole('button', {
    name: 'Блок с билетами'
  }).click();

  await page.getByRole('button', {
    name: 'Блок с билетами'
  }).click();

  await page.locator('[name="blocks.5.title"]')
    .fill(generalTicketsTitle);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.locator('[name="blocks.5.generalTickets.0.category"]')
    .fill(generalTickets[0].category);

  await page.locator('[name="blocks.5.generalTickets.0.description"]')
    .fill(generalTickets[0].description);

  await page.locator('[name="blocks.5.generalTickets.0.price"]')
    .fill(generalTickets[0].price);

  await page.locator('[name="blocks.5.generalTickets.0.frequency"]')
    .fill(generalTickets[0].frequency);

  await page.locator('[name="blocks.5.generalTicketsLink"]')
    .fill(generalTicketsLink);

  await page.locator('[name="blocks.5.subsidizedTickets.title"]')
    .fill(subsidizedTicketsTitle);

  await page.locator('[name="blocks.5.subsidizedTickets.description"]')
    .fill(subsidizedTicketsDescription);

  await page.getByText('No entry yet. Click to add one.')
    .first()
    .click();

  await page.locator('[name="blocks.5.subsidizedTickets.ticketsList.0.category"]')
    .fill(subsidizedTickets[0].category);

  await page.locator('[name="blocks.5.subsidizedTickets.ticketsList.0.description"]')
    .fill(subsidizedTickets[0].description);

  await page.locator('[name="blocks.5.subsidizedTickets.ticketsList.0.price"]')
    .fill(subsidizedTickets[0].price);

  await page.locator('[name="blocks.5.subsidizedTickets.ticketsList.0.frequency"]')
    .fill(subsidizedTickets[0].frequency);

  await page.locator('[name="blocks.5.subsidizedTickets.link"]')
    .fill(subsidizedTicketsLink);
}

export async function deleteHomepage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/home` }));
  } catch { }
}