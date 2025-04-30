module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/health-check',
      handler: 'health-check.check',
      config: {
        auth: false,
      },
    },
  ],
};