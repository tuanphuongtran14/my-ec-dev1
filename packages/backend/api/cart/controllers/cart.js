// 'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getCart(ctx) {
        // If user has already logged in, add item to user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Find user's cart in database
                let userCart = await strapi.query('cart').findOne({ user: user_id });

                // If user's cart is not exist, create a new cart for user
                if(!userCart) 
                    return await strapi.query('cart').model.create({
                        user: user_id,
                        items: [],
                        total_price: 0,
                    });
                
                return userCart
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
                const product = await strapi.query('product').model.findById(newItem.product, 'price').lean();
        
                // Calc item price
                const itemPrice = newItem.qty * product.price;

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
                    });
                } else {
                    // Get old items in user's cart
                    const oldItems = userCart.items;

                    // Add new item to user's cart & modify total price
                    userCart.items = [ newItem._id, ...oldItems ];
                    userCart.total_price = Number(itemPrice) + Number(userCart.total_price);
                    
                    // Save user's cart to db
                    await userCart.save();

                    // Return new user's cart
                    return await strapi.query('cart').findOne({id: userCart._id}, []);
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
                console.log(itemNeedBeRemoved);
        
                // If no exist that item, throw an error
                if(!itemNeedBeRemoved)
                    throw new Error(`Cannot remove item with id ${itemId} because that item is not exist`);

                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });
                console.log(userCart);

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

                console.log(itemNeedToBeRemoveIsInCart);
                console.log(newItems);

                // If item need to be remove is not in user's cart, throw new error
                if(!itemNeedToBeRemoveIsInCart) 
                    throw new Error(`Cannot remove item with id ${itemId} because that item is not in your cart`)

                // If item is in user's cart, it can be to delete in database
                await strapi.query('ordered-item').model.findByIdAndDelete(itemId);

                // Remove that item from user's cart & modify total price
                userCart.items = newItems;
                userCart.total_price =  Number(userCart.total_price) - Number(itemNeedBeRemoved.price);

                // Save user's cart to db
                await userCart.save();
                // await Promise.all([strapi.query('ordered-item').model.findByIdAndDelete(itemId), userCart.save()])

                // Return new user's cart
                return await strapi.query('cart').findOne({id: userCart._id}, []);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before removing item from your cart');
    }
};
