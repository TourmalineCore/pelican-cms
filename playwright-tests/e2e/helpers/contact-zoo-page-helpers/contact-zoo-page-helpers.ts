import { Page } from "@playwright/test";
import { createHeroBlock, createImageWithButtonGridBlock, createSeo, createTextAndMediaBlock, createTicketsBlock, getStrapiUrl, saveAndPublish } from "../global-helpers";
import axios from "axios";
import { HeroBlock, TextAndMediaBlock, ImageWithButtonGridBlock, SeoBlock, sharedTicketsBlock } from "../types";

export async function createAndPublishContactZooPage({
  page,
  hero,
  textAndMedia,
  imageWithButtonGrid,
  tickets,
  seo,
}: {
  page: Page,
  hero: HeroBlock,
  textAndMedia: TextAndMediaBlock,
  imageWithButtonGrid: ImageWithButtonGridBlock,
  tickets: sharedTicketsBlock,
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

  await createSeo({
    page,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    keywords: seo.keywords
  });

  await saveAndPublish({ page });
}

export async function deleteContactZooPage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/contact-zoo` }));
  } catch { }
}