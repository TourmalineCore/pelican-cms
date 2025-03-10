import { Page } from "@playwright/test";
import { createHeroBlock, createImageWithButtonGridBlock, createSeo, createServicesBlock, createTextAndMediaBlock, createTicketsBlock, getStrapiUrl, saveAndPublish } from "../global-helpers";
import axios from "axios";
import { HeroBlock, TextAndMediaBlock, ImageWithButtonGridBlock, SeoBlock, sharedTicketsBlock, ServicesBlock } from "../types";

export async function createAndPublishContactZooPage({
  page,
  hero,
  textAndMedia,
  imageWithButtonGrid,
  tickets,
  services,
  seo,
}: {
  page: Page,
  hero: HeroBlock,
  textAndMedia: TextAndMediaBlock,
  imageWithButtonGrid: ImageWithButtonGridBlock,
  tickets: sharedTicketsBlock,
  services: ServicesBlock,
  seo: SeoBlock,
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();


  await page.locator(`a`, { hasText: 'Страница контактного зоопарка' })
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

  await createImageWithButtonGridBlock({
    page,
    id: 2,
    title: imageWithButtonGrid.title,
    description: imageWithButtonGrid.description,
    link: imageWithButtonGrid.link,
    label: imageWithButtonGrid.label,
    largeImagePath: imageWithButtonGrid.largeImagePath,
    smallImagePath: imageWithButtonGrid.smallImagePath,
  });

  await createTicketsBlock({
    page,
    id: 3,
    title: tickets.title,
    description: tickets.description,
    tickets: tickets.tickets,
    note: tickets.note,
    link: tickets.link,
  });

  await createServicesBlock({
    page,
    id: 4,
    title: services.cards.title,
    card: {
      title: services.cards.cards[0].title,
      description: services.cards.cards[0].description,
      link: services.cards.cards[0].link,
      labels: services.cards.cards[0].labels[0],
    },
    filePath: services.filePath,
  });

  await createSeo({
    page,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    keywords: seo.keywords
  });

  await saveAndPublish({ page });

  await page.waitForTimeout(1000);
}

export async function deleteContactZooPage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/contact-zoo` }));
  } catch { }
}