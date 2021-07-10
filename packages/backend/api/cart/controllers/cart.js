// 'use strict';

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
                    return await strapi.query('cart').create({
                        user: user_id,
                        items: [],
                        total_price: 0,
                        final_price: 0
                    });

                // If user's cart has applied a coupon before, check its validation
                if(userCart.coupon) {
                    // Find coupon of user's cart in database
                    const coupon = await strapi.query('coupon').model.findById(userCart.coupon).lean();
    
                    // If coupon is expiry, update coupon status and return user's cart
                    if(Number(coupon.expiry_date) < Date.now())
                        return await strapi.query('cart').update({ _id: userCart._id }, {
                            coupon_is_valid: false,
                            total_price: userCart.total_price,
                            final_price: userCart.total_price
                        });
                }
                
                // Else only return user's cart
                return await strapi.query('cart').findOne({id: userCart._id});

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
                let newItem = ctx.request.body.item;
        
                // Find item's product in database
                const product = await strapi.query('product').model.findById(newItem.product, 'final_price').lean();
        
                // Calc item price
                const itemPrice = newItem.qty * product.final_price;

                newItem = await strapi.query('ordered-item').model.create({
                    product: newItem.product,
                    color: newItem.color,
                    qty: newItem.qty,
                    price: itemPrice
                })

                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });

                // If user's cart is not exist, create a new cart for user
                if(!userCart) {
                    return await strapi.query('cart').model.create({
                        user: user_id,
                        items: [ newItem._id ],
                        total_price: itemPrice,
                        final_price: itemPrice
                    });
                } else {
                    // Get old items in user's cart
                    const oldItems = userCart.items;

                    // Add new item to user's cart & modify total price
                    userCart.items = [ newItem._id, ...oldItems ];
                    userCart.total_price = Number(itemPrice) + Number(userCart.total_price);
                    
                    // If user's cart has applied a coupon before
                    if(userCart.coupon) {
                        // Find coupon of user's cart in database
                        const coupon = await strapi.query('coupon').model.findById(userCart.coupon).lean();
        
                        // Calc final price of user's cart
                        userCart.final_price = userCart.total_price;

                        if(coupon.discount_percentage) 
                            userCart.final_price *= 1 - coupon.discount_percentage / 100;

                        if(coupon.discount_amount) 
                            userCart.final_price -= coupon.discount_amount;
                        
                        if(userCart.final_price < 0)
                            userCart.final_price = 0;

                        // If coupon is expiry, update coupon status and return user's cart
                        if(Number(coupon.expiry_date) < Date.now()) 
                            return await strapi.query('cart').update({ _id: userCart._id }, {
                                coupon_is_valid: false,
                                total_price: userCart.total_price,
                                final_price: userCart.total_price
                            });
                    }

                    // Save user's cart to db
                    await userCart.save();
                    
                    // Return new user's cart
                    return await strapi.query('cart').findOne({id: userCart._id});

                }

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
                        total_price: 0,
                        final_price: 0
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
                userCart.total_price =  Number(userCart.total_price) - Number(itemNeedBeRemoved.price);
   
                // If user's cart has applied a coupon before
                if(userCart.coupon) {
                    // Find coupon of user's cart in database
                    const coupon = await strapi.query('coupon').model.findById(userCart.coupon).lean();
    
                    // Calc final price of user's cart
                    userCart.final_price = userCart.total_price;

                    if(coupon.discount_percentage) 
                        userCart.final_price *= 1 - coupon.discount_percentage / 100;

                    if(coupon.discount_amount) 
                        userCart.final_price -= coupon.discount_amount;

                    if(userCart.final_price < 0)
                        userCart.final_price = 0;

                    // If coupon is expiry, update coupon status and return user's cart
                    if(Number(coupon.expiry_date) < Date.now()) 
                        return await strapi.query('cart').update({ _id: userCart._id }, {
                            coupon_is_valid: false,
                            total_price: userCart.total_price,
                            final_price: userCart.total_price
                        });
                }

                // Save user's cart to db
                await userCart.save();
                
                // Return new user's cart
                return await strapi.query('cart').findOne({id: userCart._id});

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
                    return await strapi.query('cart').create({
                        user: user_id,
                        items: [],
                        total_price: 0,
                        final_price: 0,
                        coupon: coupon._id,
                        coupon_is_valid: couponIsValid
                    });

                // If user's cart is exist, add coupon and return user's cart
                let finalPrice = userCart.total_price;

                if(coupon.discount_percentage) 
                    finalPrice *= 1 - coupon.discount_percentage / 100;

                if(coupon.discount_amount) 
                    finalPrice -= coupon.discount_amount;
                    
                if(finalPrice < 0)
                    finalPrice = 0;

                return await strapi.query('cart').update({ _id: userCart._id }, {
                    coupon: coupon._id,
                    coupon_is_valid: couponIsValid,
                    final_price: finalPrice
                })

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before removing item from your cart');
    },
};
