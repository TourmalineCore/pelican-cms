module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    if (!data.date) {
      data.date = new Date();
    }
  }
};