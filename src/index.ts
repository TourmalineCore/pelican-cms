export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    const roles = await strapi
      .service("plugin::users-permissions.role")
      .find();

    const _public = await strapi
      .service("plugin::users-permissions.role")
      .findOne(roles.filter((role) => role.type === "public")[0].id);

    // When launching the application, it ticks the boxes to enable API methods.
    Object.keys(_public.permissions)
      .filter((permission) => permission.startsWith('api'))
      .forEach((permission) => {
        const controller = Object.keys(_public.permissions[permission].controllers)[0];

        // Enable check for health-check
        if (permission === 'api::health-check') {
          _public.permissions[permission].controllers[controller].check.enabled = true;
          return;
        }

        // Enable find
        _public.permissions[permission].controllers[controller].find.enabled = true;

        // Enable update if exists
        if (_public.permissions[permission].controllers[controller].update)
          _public.permissions[permission].controllers[controller].update.enabled = true;

        // Enable create if exists
        if (_public.permissions[permission].controllers[controller].create)
          _public.permissions[permission].controllers[controller].create.enabled = true;

        // Enable findOne if exists
        if (_public.permissions[permission].controllers[controller].findOne)
          _public.permissions[permission].controllers[controller].findOne.enabled = true;

        // Enable delete
        _public.permissions[permission].controllers[controller].delete.enabled = true;
      });

    // Set permissions for upload
    // Enable find
    _public.permissions['plugin::upload'].controllers['content-api'].find.enabled = true;

    // Enable upload
    _public.permissions['plugin::upload'].controllers['content-api'].upload.enabled = true;

    // Enable destroy
    _public.permissions['plugin::upload'].controllers['content-api'].destroy.enabled = true;

    await strapi
      .service("plugin::users-permissions.role")
      .updateRole(_public.id, _public);
  },
};
