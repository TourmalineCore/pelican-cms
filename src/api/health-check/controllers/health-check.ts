module.exports = {
  async check(ctx) {
    ctx.body = {
      status: 'OK',
      timestamp: new Date()
    };
  },
};