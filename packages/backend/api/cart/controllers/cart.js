'use strict';
const { ObjectID } = require('mongodb');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getCart(ctx) {
        // If user has already logged in, return user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });

                // If user's cart is not exist, create a new cart for user
                if(!userCart) 
                    userCart = await strapi.query('cart').create({
                        user: user_id,
                        items: [],
                        coupon_is_valid: true,
                    });
                
                // Return user's cart
                return await strapi.services.cart.displayCart(userCart._id);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before getting your cart');
    },

    async addItemToCart(ctx) {
        // If user has already logged in, add item to user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get item input from request
                let newItemInput = ctx.request.body.item;
        
                // Find item's product in database
                const [ product ] = await strapi.query('product').model
                    .aggregate([
                        { "$match": { "_id": new ObjectID(newItemInput.product) } },
                        {
                            "$lookup": {
                                "from": "components_product_options",
                                "localField": "options.ref",
                                "foreignField": "_id",
                                "as": "options"
                            }
                        },
                        {
                          "$project": {
                            "options": 1
                          }
                        },
                    ]);

                const checkColorValid = product.options.filter(option => {
                    return (option.color === newItemInput.color) ? true : false;
                });

                if(checkColorValid.length === 0)
                    throw new Error('Color which you choose is not valid');
        
                // Create cart's item record
                let newItem = await strapi.query('ordered-item').model.create({
                    product: newItemInput.product,
                    color: newItemInput.color,
                    qty: newItemInput.qty,
                });

                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });

                // If user's cart is not exist, create a new cart for user
                if(!userCart) 
                    userCart = strapi.query('cart').model.create({
                        user: user_id,
                        items: [ newItem._id ],
                        coupon_is_valid: true,
                    });
                else {
                    // Get old items in user's cart
                    const oldItems = userCart.items;

                    // Add new item to user's cart
                    userCart.items = [ newItem._id, ...oldItems ];
                    
                    // Save user's cart to db
                    await userCart.save();
                }
                
                // Return user's cart
                return await strapi.services.cart.displayCart(userCart._id);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before adding item to your cart');
    },

    async removeItemFromCart(ctx) {
        // If user has already logged in, remove item from user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get id of item need to be removed in database
                const { itemId } = ctx.request.body;
        
                // Find item need to be removed in database
                const itemNeedBeRemoved = await strapi.query('ordered-item').model.findById(itemId);
        
                // If no exist that item, throw an error
                if(!itemNeedBeRemoved)
                    throw new Error(`Cannot remove item with id ${itemId} because that item is not exist`);

                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });
                
                // If user's cart is not exist, create a new cart for user
                if(!userCart) 
                    return await strapi.query('cart').model.create({
                        user: user_id,
                        items: [],
                        coupon_is_valid: true,
                    });

                // Declare new items array && boolean variable to check item is in user's cart or not
                let newItems = [];
                let itemNeedToBeRemoveIsInCart = false;

                // Delete item need be removed by creating new item array without that item
                userCart.items.forEach(item => {
                    if(item.toString() !== itemId) 
                        newItems.push(item);
                    else
                        itemNeedToBeRemoveIsInCart = true
                });

                // If item need to be remove is not in user's cart, throw new error
                if(!itemNeedToBeRemoveIsInCart) 
                    throw new Error(`Cannot remove item with id ${itemId} because that item is not in your cart`)

                // If item is in user's cart, it can be to delete in database
                await strapi.query('ordered-item').model.findByIdAndDelete(itemId);

                // Remove that item from user's cart & modify total price
                userCart.items = newItems;

                // Save user's cart to db
                await userCart.save();
                
                // Return user's cart
                return await strapi.services.cart.displayCart(userCart._id);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before removing item from your cart');
    },

    async applyCoupon(ctx) {
        // If user has already logged in, remove item from user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get coupon code from  request header
                const { couponCode } = ctx.request.body;

                // Find coupon in database
                const coupon = await strapi.query('coupon').model.findOne({ code: couponCode }).lean();

                // If coupon is not exist, throw an error
                if(!coupon)
                    throw new Error(`Coupon with code ${couponCode} is not valid`);     

                // Check coupon is valid or not
                let couponIsValid = true;
                if(Number(coupon.expiry_date) < Date.now())
                    couponIsValid = false;
                
                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });

                // If user's cart is not exist, create a new cart for user
                if(!userCart) 
                    userCart = await strapi.query('cart').model.create({
                        user: user_id,
                        items: []
                    });

                userCart.coupon = coupon._id;
                userCart.coupon_is_valid = couponIsValid

                await userCart.save();
                
                // Return user's cart
                return await strapi.services.cart.displayCart(userCart._id);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before removing item from your cart');
    },

    async removeCoupon(ctx) {
        // If user has already logged in, remove item from user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);  
                
                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });

                // If user's cart is not exist, create a new cart without coupon for user
                if(!userCart) 
                    userCart = await strapi.query('cart').model.create({
                        user: user_id,
                        items: []
                    });
                else {
                // Else remove coupon
                    userCart.coupon = undefined;
                    userCart.coupon_is_valid = true;
    
                    await userCart.save();
                }
                
                // Return user's cart
                return await strapi.services.cart.displayCart(userCart._id);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before removing item from your cart');
    },
};
