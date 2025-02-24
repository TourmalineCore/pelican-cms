import slugify from "slugify";

module.exports = {
  async beforeCreate({ params }) {
    await translitAndAddSuffix(params)
  },

  async beforeUpdate({ params }) {
    const currentEntry = await strapi.entityService.findMany('api::news-collection.news-collection', {
      fields: ['title', 'slug'],
      filters: {
        id: { $eq: params.where.id }
      },
    });

    const isTitleChanged = params.data.title && params.data.title !== currentEntry[0].title;
    const isSlugChanged = params.data.slug && params.data.slug !== currentEntry[0].slug;

    if (!isTitleChanged && !isSlugChanged) {
      return;
    }

    await translitAndAddSuffix(params)
  },
}


async function translitAndAddSuffix(params: any) {
  if (params.data.title) {
    let slug = slugify(params.data.title, {
      lower: true,
      strict: true
    });

    const maxLength = 50;
    if (slug.length > maxLength) {
      slug = slug.substring(0, maxLength);

      if (slug.endsWith('-')) {
        slug = slug.slice(0, -1);
      }
    }

    const existingEntries = await strapi.entityService.findMany('api::news-collection.news-collection', {
      filters: {
        slug: { $startsWith: slug },
        documentId: { $ne: params.data.documentId }
      },
    });

    if (existingEntries.length) {
      const suffixNumbers = existingEntries
        .map((entry) => {
          const match = entry.slug.match(new RegExp(`^${slug}-(\\d+)$`));
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter(number => !isNaN(number));

      const nextSuffix = suffixNumbers.length > 0 ? Math.max(...suffixNumbers) + 1 : 1;

      params.data.slug = `${slug}-${nextSuffix}`;
    } else {
      params.data.slug = slug;
    }
  }
}