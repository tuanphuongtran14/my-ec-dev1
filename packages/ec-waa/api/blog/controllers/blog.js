'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getBlogBySlug (ctx) {
        const { _slug: slug } = ctx.request.query;

        return await strapi.query('blog').findOne({ slug });
    }
};
