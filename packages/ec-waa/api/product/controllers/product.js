'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async search(ctx) {
        const filter = ctx.query._filter;
        const sort = ctx.query._sort;
        const skip = Number(ctx.query._skip);
        const limit = Number(ctx.query._limit);

        // Search and return products which match filter
        const products = await strapi.services.product.search(filter, limit, skip, sort);

        
        return products;
    },

    async findSimilar(ctx) {
        const id = ctx.query._id;
        const sort = ctx.query._sort;
        const skip = Number(ctx.query._skip);
        const limit = Number(ctx.query._limit);


        // Find product based on id
        const product = await strapi.query('product').findOne({id: id});

        // Create filter to find similar products
        const filter = {
            minRam: product.ram - 2,
            maxRam: product.ram + 2,
            minScreenSize: product.screen_size - 0.5,
            maxScreenSize: product.screen_size + 0.5,
            minBatteryCapacity: product.battery_capacity - 1000,
            maxBatteryCapacity: product.battery_capacity + 1000,
            id_ne: product.id,
        }

        // Search and return products which match filter
        return await strapi.services.product.search(filter, limit, skip, sort);
    }
};
