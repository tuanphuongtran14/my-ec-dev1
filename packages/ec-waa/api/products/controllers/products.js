'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
    // GET /hello
    searchProductsByName: async (ctx) => {
        return await strapi.models.products.find(ctx.query);
    },
    searchProduct: async ctx => {
        const filter = {...ctx.request.query._filter};
        const { name, minPrice, maxPrice, screenType, minBattery, minScreenSize, platform } = filter;
        const populate = ["build", "mainCamera", "selfieCamera", "othersFeatures", "colors"];
        const query = {};


        // If minPrice has in filter, add it to match query variable
        if(minPrice)
            query.price_gte = Number(minPrice);


        // If maxPrice has in filter, add it to match query variable
        if(maxPrice)
            query.price_lte = Number(maxPrice);


        let products = await strapi.query('products').find({}, populate);


        // If name has in filter, find products which contains it
        if(name) 
            products = products.filter(product => {
                if(name && nonAccentVietnamese(product.name.toLowerCase()).indexOf(nonAccentVietnamese(name.toLowerCase())) !== -1)
                    return false;

                return true;
            });


        return products;
    }
};


function nonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
}