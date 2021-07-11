'use strict';
const { ObjectID } = require('mongodb');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async displayCart(cartId) {
        // Get cart information from database by id
        let [ cart ] = await strapi.query('cart').model
            .aggregate([
                { "$match": { "_id": new ObjectID(cartId) }},
                { "$lookup": {
                  "from": "users-permissions_user",
                  "localField": "user",
                  "foreignField": "_id",
                  "as": "user"
                }},
                {
                  "$unwind": {
                    "path": "$user",
                    "preserveNullAndEmptyArrays": true
                  }
                },
                {
                  "$project": {
                    "user.password": 0,
                    "user.confirmationToken": 0,
                    "user.resetPasswordToken": 0,
                  }
                },
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
                { "$lookup": {
                  "from": "ordered_items",
                  "localField": "items",
                  "foreignField": "_id",
                  "as": "items"
                }},
                {
                  "$unwind": {
                    "path": "$items",
                    "preserveNullAndEmptyArrays": true
                  }
                },
                { "$lookup": {
                  "from": "products",
                  "localField": "items.product",
                  "foreignField": "_id",
                  "as": "items.product"
                }},
                {
                  "$unwind": {
                    "path": "$items.product",
                    "preserveNullAndEmptyArrays": true
                  }
                },
                { "$lookup": {
                    "from": "brands",
                    "localField": "items.product.brand",
                    "foreignField": "_id",
                    "as": "items.product.brand"
                  }},
                {
                  "$unwind": {
                    "path": "$items.product.brand",
                    "preserveNullAndEmptyArrays": true
                  }
                },
                { "$lookup": {
                  "from": "upload_file",
                  "localField": "items.product.thumbnail",
                  "foreignField": "_id",
                  "as": "items.product.thumbnail"
                }},
                {
                  "$unwind": {
                    "path": "$items.product.thumbnail",
                    "preserveNullAndEmptyArrays": true
                  }
                },
                {
                  "$addFields": { 
                      "items.price": { "$multiply": [ "$items.product.final_price", "$items.qty" ] }
                }},
                { "$group": {
                    "_id": "$_id",
                    "user": { "$first": '$user' },
                    "coupon": { "$first": '$coupon' },
                    "coupon_is_valid": { "$first": '$coupon_is_valid' },
                    "items": { "$push": "$items" },
                }},
                {
                  "$addFields": { 
                      "total_price": { "$sum": "$items.price" }
                }},
            ]);

        // Handle to avoid errors when cart's items is empty
        if(cart.items[0].price === null) 
            cart.items = [];
        
        // Calc final price of user's cart
        cart.final_price = cart.total_price;

        if(cart.coupon) {
            // If coupon is expiry, update coupon status and return user's cart
            if(Number(cart.coupon.expiry_date) < Date.now())
                await strapi.query('cart').model.findByIdAndUpdate(cart._id, {
                    coupon_is_valid: false
                });
            else {
                // Else, calculate final price with coupon discount
                if(cart.coupon.discount_percentage) 
                    cart.final_price *= 1 - cart.coupon.discount_percentage / 100;
    
                if(cart.coupon.discount_amount) 
                    cart.final_price -= cart.coupon.discount_amount;
    
                if(cart.final_price < 0)
                        cart.final_price = 0;  
            }
        }

        return cart;
    }    
};
