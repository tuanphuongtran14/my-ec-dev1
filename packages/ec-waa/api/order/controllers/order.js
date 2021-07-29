'use strict';
const { ObjectID } = require('mongodb');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getOrders(ctx) {
        // If user has already logged in, execute
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id
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
        // If user has already logged in, checkout order
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id
                const { id: userId } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get input 
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
                
                // If user's cart is not exist or has no items, stop
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
                
                // If no selected items, stop
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
                    orderCode: Date.now(),
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
        // If user has already logged in, cancel order
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get the user's id
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get the order's id
                const { orderId } = ctx.request.body;

                // Retrieve the order
                const orderNeedToBeCancelled = await strapi.query('order').model.findById(orderId);

                // If status is not "Pending", stop cancelling
                if(orderNeedToBeCancelled.status !== "Pending")
                    throw new Error(`Cannot cancel order with id ${orderId} because it has confimed by staff`)

                // If the order not exist, stop cancelling
                if(!orderNeedToBeCancelled)
                    throw new Error(`Cannot cancel order with id ${orderId} because it is not exist`);

                // If the order is not the user's,  stop cancelling
                if(orderNeedToBeCancelled.user != user_id)
                    throw new Error(`Cannot cancel order with id ${orderId} because it is not the one of your order`);

                // Cancel order
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
