'use strict';
const { ObjectID } = require('mongodb');

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
                const { id: userId } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get input from request 
                const {
                    consigneeName,
                    consigneePhone,
                    email,
                    addressLine1,
                    district,
                    city,
                    paymentMethod
                } = ctx.request.body.info;

                const userCart = await strapi.services.cart.checkout(userId);
                
                // If user's cart is not exist or has no items, throw an error
                if(!userCart || userCart.items.length === 0) 
                    throw new Error('Cannot checkout because your cart is empty');

                // Check color, qty and filter product which user want to buy
                const itemToBuy = [];
                const idItemToBuy = [], idItemToKeep = [];
                userCart.items.forEach(item => {
                    if(item.selected) {
                        itemToBuy.push(item);
                        idItemToBuy.push(item._id);

                        // Check color & quantity input is valid or not
                        let checkColorValid = false;
                        let checkQuantityValid = false;

                        item.product.options.forEach(option => {
                            if(option.color === item.color) {
                                checkColorValid = true;

                                if(item.qty > 0 && item.qty <= option.quantityInStock)
                                    checkQuantityValid = true;
                            }
                        });

                        if(!checkColorValid)
                            throw new Error('Color which you want to buy is not valid');

                        if(!checkQuantityValid)
                            throw new Error('Quantity which you want to buy is great than stock quantity');
                    } else {
                        idItemToKeep.push(item._id);
                    }
                });
                
                // If user's cart is not exist or has no items, throw an error
                if(idItemToBuy.length < 1) 
                    throw new Error('Cannot checkout because no selected item in your cart');

                // Create order
                const order = await strapi.query('order').create({
                    consigneeName,
                    consigneePhone,
                    email,
                    addressLine1,
                    district,
                    city,
                    items: idItemToBuy,
                    totalAmount: userCart.totalAmount,
                    finalAmount: userCart.finalAmount,
                    status: 'Pending',
                    isPaid: false,
                    paymentMethod,
                    user: userId,
                    coupon: userCart.coupon,
                    itemDetails: itemToBuy,
                    orderId: Date.now(),
                });
                
                // After creating order, remove items that is bought from cart
                await strapi.query('cart').model.findByIdAndUpdate(userCart._id, {
                    items: idItemToKeep,
                    coupon: undefined,
                    couponIsValid: undefined
                }); 

                // Decrease product's qty and add price information to order items
                // => This code is written in order model lifecycle
                // ../models/order.js
                
                // Return order
                return order;

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

                // Retrieve the order by id which user provided
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
