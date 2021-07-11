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
                const [ userCart ] = await strapi.query('cart').model
                    .aggregate([
                        { "$match": { "user": new ObjectID(user_id) }},
                        { "$lookup": {
                          "from": "coupons",
                          "localField": "coupon",
                          "foreignField": "_id",
                          "as": "coupon"
                        }},
                        {
                          "$unwind": {
                            "path": "$coupon",
                            "preserveNullAndEmptyArrays": true
                          }
                        },
                        {
                          "$unwind": {
                            "path": "$items",
                            "preserveNullAndEmptyArrays": true
                          }
                        },
                        { "$lookup": {
                          "from": "ordered_items",
                          "localField": "items",
                          "foreignField": "_id",
                          "as": "items_details"
                        }},
                        {
                          "$unwind": {
                            "path": "$items_details",
                            "preserveNullAndEmptyArrays": true
                          }
                        },
                        { "$lookup": {
                          "from": "products",
                          "localField": "items_details.product",
                          "foreignField": "_id",
                          "as": "items_details.product"
                        }},
                        {
                          "$unwind": {
                            "path": "$items_details.product",
                            "preserveNullAndEmptyArrays": true
                          }
                        },
                        {
                          "$addFields": { 
                              "items_details.price": { "$multiply": [ "$items_details.product.final_price", "$items_details.qty" ] }
                        }},
                        { "$group": {
                            "_id": "$_id",
                            "user": { "$first": '$user' },
                            "coupon": { "$first": '$coupon' },
                            "coupon_is_valid": { "$first": '$coupon_is_valid' },
                            "items": { "$push": "$items" },
                            "items_details": { "$push": "$items_details" },
                        }},
                        {
                          "$addFields": { 
                              "total_price": { "$sum": "$items_details.price" }
                        }},
                    ]);

                console.log(userCart);
                
                // If user's cart is not exist or has no items, throw an error
                if(!userCart && userCart.items.length === 0) 
                    throw new Error('Cannot checkout because your cart is empty');

                // Calc final price of user's cart
                userCart.final_price = userCart.total_price;

                if(userCart.coupon) {
                    // If coupon is expiry, update coupon status and return user's cart
                    if(Number(userCart.coupon.expiry_date) < Date.now())
                        await strapi.query('cart').model.findByIdAndUpdate(cart._id, {
                            coupon_is_valid: false
                        });
                    else {
                        // Else, calculate final price with coupon discount
                        if(userCart.coupon.discount_percentage) 
                            userCart.final_price *= 1 - userCart.coupon.discount_percentage / 100;
            
                        if(userCart.coupon.discount_amount) 
                            userCart.final_price -= userCart.coupon.discount_amount;
            
                        if(userCart.final_price < 0)
                                userCart.final_price = 0;  
                    }
                }

                console.log(1)

                // Get items && total price from user's cart
                const { items, total_price, final_price, user } = userCart;
                
                // After creating order, set user's cart to empty
                await strapi.query('cart').model.findByIdAndUpdate(userCart._id, {
                    items: [],
                    coupon: undefined,
                    coupon_is_valid: undefined
                });

                // Add price information to order items
                await Promise.all(userCart.items_details.map(async item => {
                    return await strapi.query('cart').model.findByIdAndUpdate(item._id, {
                        price: item.price
                    });
                }));
                
                // Create new order based on input
                return await strapi.query('order').create({
                    consignee_name,
                    consignee_phone,
                    email,
                    address_line_1,
                    district,
                    city,
                    items,
                    total_price,
                    final_price,
                    status: 'Pending',
                    is_paid: false,
                    payment_method,
                    user
                });

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
