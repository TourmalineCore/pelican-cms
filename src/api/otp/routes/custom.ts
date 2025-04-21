export default {
  routes: [
    {
      method: "POST",
      path: "/auth/local/register",
      handler: "api::otp.otp.register",
      config: {
        auth: false,
        middlewares: ["plugin::users-permissions.rateLimit"],
        prefix: "",
      },
    },
  ],
};