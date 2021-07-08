// 'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
    async addItemToCart(ctx) {
        // Get item input from request
        let newItem = ctx.request.body.item;

        // Find item's product in database
        const product = await strapi.query('product').model.findById(newItem.product, 'price').lean();

        // Calc item price
        const itemPrice = newItem.qty * product.price;

        // If user has already logged in, add item to user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });

                // If user's cart is not exist, create a new cart for user
                if(!userCart) {
                    return await strapi.services.cart.create({
                        user: user_id,
                        items: [ newItem ],
                        total_price: itemPrice,
                    });
                } else {
                    // Get old items in user's cart
                    const oldItems = userCart.items.map(item => {
                        return {
                            _id: item._id,
                            kind: "ComponentCartItem",
                            ref: item.ref._id
                        }
                    })

                    // Create new item record
                    newItem = await strapi.components['cart.item'].create(newItem);
                    newItem = {
                        kind: "ComponentCartItem",
                        ref: newItem._id
                    }

                    // Add new item to user's cart & modify total price
                    userCart.items = [ newItem, ...oldItems ];
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
        throw new Error('You must login before adding items to cart');
    },

    async removeItemFromCart(ctx) {
        // Get id of item need to be removed in database
        const itemId = ctx.request.body.itemId;

        console.log(ctx.request.body);

        // Find item need to be removed in database
        const itemNeedBeRemoved = await strapi.components['cart.item'].findOne({ _id: itemId });
        console.log(itemNeedBeRemoved);

        // Find item's product in database
        const product = await strapi.query('product').model.findById(itemNeedBeRemoved.product, 'price').lean();

        // Calc item price
        const itemPrice = itemNeedBeRemoved.qty * product.price;

        // If user has already logged in, remove item from user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
                console.log(user_id);

                // Find user's cart in database
                let userCart = await strapi.query('cart').model.findOne({ user: user_id });
                console.log(userCart);

                let newItems = [];

                // Delete item need be removed by creating new item array without that item
                userCart.items.forEach(item => {
                    if(item.ref._id.toString() !== itemId) 
                        newItems.push({
                            _id: item._id
                        });
                });

                console.log(newItems);

                // Return new user's cart
                return await strapi.query('cart').update({id: userCart._id}, {
                    items: newItems,
                    total_price: Number(userCart.total_price) - Number(itemPrice)
                });

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before adding items to cart');
    }
};
