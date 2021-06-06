'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
    // GET /hello
    async searchProductsByName(ctx) {
        return await strapi.models.products.find(ctx.query);
    },
};