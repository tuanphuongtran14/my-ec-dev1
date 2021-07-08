'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getOrders(ctx) {
        // If user has already logged in, return user's orders
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Return user's orders
                return await strapi.query('order').find({ user: user_id });

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before get your orders');
    },

    async checkout(ctx) {
        // If user has already logged in, execute checkout order
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get input from request 
                const {
                    consignee_name,
                    consignee_phone,
                    email,
                    address_line_1,
                    district,
                    city,
                    payment_method
                } = ctx.request.body.info;

                // Get user's cart
                const userCart = await strapi.query('cart').model.findOne({ user: user_id });

                // Get items && total price from user's cart
                const { items, total_price, user } = userCart;

                // If user's is empty, stop and throw error
                if(items.length === 0) 
                    throw new Error('You cannot checkout an empty order');
                
                // Create new order based on input
                const newOrder = await strapi.query('order').create({
                    consignee_name,
                    consignee_phone,
                    email,
                    address_line_1,
                    district,
                    city,
                    items,
                    total_price,
                    status: 'Pending',
                    is_paid: false,
                    payment_method,
                    user
                });

                // After creating order, set user's cart to empty
                userCart.items = [];
                userCart.total_price = 0;
                await userCart.save();

                return newOrder;

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before ordering');
    },

    async cancelOrderById(ctx) {
        // If user has already logged in, cancel order by id user provided
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get the user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get the order's id which user provided from request
                const { orderId } = ctx.request.body;

                // Find the order by id which user provided
                const orderNeedToBeCancelled = await strapi.query('order').model.findById(orderId);

                // If the order need to be cancelled is not exist, throw an error
                if(!orderNeedToBeCancelled)
                    throw new Error(`Cannot cancel order with id ${orderId} because it is not exist`);

                // If the order to be canceled is not the user's, throw an error
                if(orderNeedToBeCancelled.user != user_id)
                    throw new Error(`Cannot cancel order with id ${orderId} because it is not the one of your order`);

                // Cancel order by setting its status to "Cancelled"
                return await strapi.query('order').update({ id: orderId }, { 
                    status: 'Cancelled' 
                });

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before get your orders');
    }
};
