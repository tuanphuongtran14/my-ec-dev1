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
    },
    async isValidUsername(ctx) {
        const { _username: username } = ctx.request.query;

        const user = await strapi.query("user", "users-permissions").findOne({ username });

        return user ? true : false;
    },
    async isValidEmail(ctx) {
        const { _email: email } = ctx.request.query;

        const user = await strapi.query("user", "users-permissions").findOne({ email });

        return user ? true : false;
    },
    async isAvailableEmail(ctx) {
        const { _email: email } = ctx.request.query;

        const emailIsAvailable = !(await strapi.query("user", "users-permissions").findOne({ email }));

        return emailIsAvailable;
    },
    async isAvailableUsername(ctx) {
        const { _username: username } = ctx.request.query;

        const usernameIsAvailable = !(await strapi.query("user", "users-permissions").findOne({ username }));

        return usernameIsAvailable;
    },
};
