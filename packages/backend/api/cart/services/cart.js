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
                // Filter cart which is user's cart
                { "$match": { "_id": new ObjectID(cartId) }},

                // Get cart's coupon information by joining with coupons table
                { 
                  "$lookup": {
                    "from": "coupons",
                    "localField": "coupon",
                    "foreignField": "_id",
                    "as": "coupon"
                  }
                },
                {
                  "$unwind": {
                    "path": "$coupon",
                    "preserveNullAndEmptyArrays": true
                  }
                },

                // Get cart's items information by joining with order-items table
                { 
                  "$lookup": {
                    "from": "ordered_items",
                    "let": { "itemIds": "$items" },
                    "pipeline": [
                      { "$match": { "$expr": { "$in": ["$_id", "$$itemIds"] } } },

                      // Get cart's items product information by joining with order-items table
                      { 
                        "$lookup": {
                          "from": "products",
                          "let": { "productId": "$product" },
                          "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$_id", "$$productId"] } } },
                            {
                              "$project": {
                                "full_desc": 0,
                                "inclusion_box": 0,
                                "short_desc": 0,
                                "product_condition": 0,
                                "warranty": 0,
                                "platform_version": 0,
                              }
                            },
                            { 
                              "$lookup": {
                                "from": "components_product_options",
                                "let": { "optionIds": "$options.ref" },
                                "pipeline": [
                                  { "$match": { "$expr": { "$in": ["$_id", "$$optionIds"] } } },
                                  { 
                                    "$lookup": {
                                      "from": "upload_file",
                                      "let": { "imageIds": "$images" },
                                      "pipeline": [
                                        { "$match": { "$expr": { "$in": ["$_id", "$$imageIds"] } } },
                                      ],
                                      "as": "images"
                                    }
                                  },
                                ],
                                "as": "options"
                              }
                            },
                            { "$lookup": {
                              "from": "brands",
                              "localField": "brand",
                              "foreignField": "_id",
                              "as": "brand"
                            }},
                            {
                              "$unwind": {
                                "path": "$brand",
                                "preserveNullAndEmptyArrays": true
                              }
                            },
                            { "$lookup": {
                              "from": "upload_file",
                              "localField": "thumbnail",
                              "foreignField": "_id",
                              "as": "thumbnail"
                            }},
                            {
                              "$unwind": {
                                "path": "$thumbnail",
                                "preserveNullAndEmptyArrays": true
                              }
                            },
                          ],
                          "as": "product"
                        }
                      },
                      {
                        "$unwind": {
                          "path": "$product",
                          "preserveNullAndEmptyArrays": true
                        }
                      },
                      {
                        "$addFields": { 
                            "price": { "$multiply": [ "$product.final_price", "$qty" ] }
                      }},
                    ],
                    "as": "items"
                  }
                },
                {
                  "$addFields": { 
                      "total_price": { "$sum": "$items.price" }
                }},
            ]);
        
        // Calc final price of user's cart
        cart.coupon_is_valid = true;
        cart.final_price = cart.total_price;

        if(cart.coupon) {
            // If coupon is expiry, update coupon status and return user's cart
            if(Number(cart.coupon.expiry_date) < Date.now())
                cart.coupon_is_valid = false;
            else {
                cart.coupon_is_valid = true;

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
    },

    async getCartToChangeItemQuantity(cartId, itemId) {
      const [ cart ] = await strapi.query('cart').model
          .aggregate([
              { 
                  "$match": { 
                      "_id": new ObjectID(cartId),
                      "$expr": { "$in": [ new ObjectID(itemId), "$items" ] }
                  }
              },
              {
                  "$lookup": {
                      "from": "ordered_items",
                      "let": { "itemId": new ObjectID(itemId) },
                      "pipeline": [
                          { 
                              "$match": { "$expr": { "$eq": ["$_id", "$$itemId"] } },
                          },
                          {
                              "$lookup": {
                                  "from": "products",
                                  "let": { "productId": "$product" },
                                  "pipeline": [
                                      { 
                                          "$match": { "$expr": { "$eq": ["$_id", "$$productId"] } },
                                      },
                                      {
                                          "$lookup": {
                                              "from": "components_product_options",
                                              "let": { "optionIds": "$options.ref" },
                                              "pipeline": [
                                                { "$match": { "$expr": { "$in": ["$_id", "$$optionIds"] } } },
                                              ],
                                              "as": "option"
                                          }
                                      },
                                      {
                                        "$unwind": {
                                          "path": "$option",
                                          "preserveNullAndEmptyArrays": true
                                        }
                                      },
                                      {
                                        "$project": {
                                          "option": 1,
                                        }
                                      },
                                  ],
                                  "as": "product"
                              }
                          },
                          {
                            "$unwind": {
                              "path": "$product",
                              "preserveNullAndEmptyArrays": true
                            }
                          },
                      ],
                      "as": "item"
                  }
              },
              {
                "$unwind": {
                  "path": "$item",
                  "preserveNullAndEmptyArrays": true
                }
              },
          ]);

        return cart;
    }
};
