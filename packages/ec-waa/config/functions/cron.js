'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
    /**
        * Every monday at 0am.
    */
    '0 0 0 * * 1': async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const date = today.getDate();

        const deletedCarts = await strapi.query('cart').delete({ updatedAt_lt: new Date(year, month - 3, date), user_null: true }, []);
        const deletedCartsNumber = deletedCarts.length;

        // Get the list of item ids to delete along with carts
        const itemIds = [];
        deletedCarts.forEach(cart => {
            const cartItemIds = cart.items.map(item => item._id);
            itemIds.push(...cartItemIds);
        });

        await strapi.query('ordered-item').delete({ id_in: itemIds }, []);

        console.log("Clean trash carts successfully!!!");
        console.log(`Deleted ${deletedCartsNumber} cart${(deletedCartsNumber > 1) ? 's' : ''}`);
    },
};
