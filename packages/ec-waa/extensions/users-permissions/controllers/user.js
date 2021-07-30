'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async customMe(ctx) {
        if(ctx?.request?.header?.authorization) {
            // Retrieve user id from request
            const { id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

            // Retrieve user information
            const { 
                username,
                name,
                email, 
                phone,
                confirmed, 
                blocked, 
                role 
            } = await strapi.query("user", "users-permissions").findOne({ id });

            return {
                id,
                _id: id,
                username,
                name,
                email, 
                phone,
                confirmed, 
                blocked, 
                role
            }

        }
        throw new Error("You need login before requesting your account information");
    }
};
