/**
 * otp controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::otp.otp', ({ strapi }) => ({
  async register(ctx, next) {
    await strapi.controllers["plugin::users-permissions.auth"].register(
      ctx,
      next
    );

    ctx.send({ success: true });
  },
}));