import slugify from "slugify";

module.exports = {
  async beforeCreate({ params }) {
    await translit(params)
  },

  async beforeUpdate({ params }) {
    await translit(params)
  },
}


async function translit(params: any) {
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

    params.data.slug = slug;
  }
}