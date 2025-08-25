import slugify from "slugify";

module.exports = {
  beforeCreate({ params }) {
    const { data } = params;

    generateSlug(data)
  },

  beforeUpdate({ params }) {
    const { data } = params;

    generateSlug(data)
  },
}

function generateSlug(data: any) {
  if (data.title) {
    data.slug = slugify(data.title, {
      lower: true,
      strict: true
    });
  }
}