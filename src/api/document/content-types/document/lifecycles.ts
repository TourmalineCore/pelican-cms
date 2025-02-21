module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.date) {
      data.date = new Date();
    }
  },

  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.publishedAt && !data.date) {
      data.date = new Date();
    }
  }
};