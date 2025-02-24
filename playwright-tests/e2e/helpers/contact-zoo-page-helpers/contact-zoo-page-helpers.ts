import { Page } from "@playwright/test";
import { createHeroBlock, createImageWithButtonGridBlock, createSeo, createTextAndMediaBlock, getStrapiUrl, saveAndPublish } from "../global-helpers";
import axios from "axios";
import { HeroBlock, TextAndMediaBlock, ImageWithButtonGridBlock, SeoBlock } from "../types";

export async function createAndPublishContactZooPage({
  page,
  hero,
  textAndMedia,
  imageWithButtonGrid,
  seo,
}: {
  page: Page,
  hero: HeroBlock,
  textAndMedia: TextAndMediaBlock,
  imageWithButtonGrid: ImageWithButtonGridBlock,
  seo: SeoBlock,
}) {
  await page.locator('a[aria-label="Content Manager"]')
    .click();

  await page.getByText(`Страница контактного зоопарка`)
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

  await createSeo({
    page,
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription
  });

  await saveAndPublish({ page });

  await page.waitForTimeout(1000);
}

export async function deleteContactZooPage() {
  try {
    await axios.delete(getStrapiUrl({ path: `/api/contact-zoo` }));
  } catch { }
}