'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async getReviewsByProduct(ctx) {
        try {
            // Get product's id from request
            const { _productId: productId } = ctx.request.query;

            // Find product need to be added review in database by id
            const productNeedToGetReview = await strapi.query('product').model.findById(productId, '_id');

            // If product is not exist, throw an error
            if(!productNeedToGetReview) 
                throw new Error(`Cannot get reviews for product with id ${productId} because this product is not exist`);

            // Get and return product's reviews
            return await strapi.query('review').find({ product: productId });

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    async createReviewForProduct(ctx) {
        // If user has already logged in, add item to user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get product's id, comment, stars from request
                const { productId, stars, comment } = ctx.request.body.createReviewInput;

                // Find product need to be added review in database by id
                const productNeedToBeAddedReviewed = await strapi.query('product').model.findById(productId, '_id stars votes');

                // If product need to be added review is not exist, throw an error
                if(!productNeedToBeAddedReviewed) 
                    throw new Error(`Cannot add review for product with id ${productId} because this product is not exist`);

                // If user has review this product before, stop and throw an error
                // Because users can only add review each product only one time
                const review = await strapi.query('review').model.findOne({
                    user: user_id,
                    product: productId,
                }, '_id').lean();

                if(review) 
                    throw new Error(`Cannot add review for product with id ${productId} because you had already added review for this product before`);

                // Modify stars and votes number of product
                productNeedToBeAddedReviewed.stars = (productNeedToBeAddedReviewed.stars * productNeedToBeAddedReviewed.votes + stars) / (productNeedToBeAddedReviewed.votes + 1);
                productNeedToBeAddedReviewed.votes += 1;
                await productNeedToBeAddedReviewed.save();

                // Create review based on input
                return await strapi.query('review').create({
                    user: user_id,
                    product: productId,
                    comment,
                    stars
                });

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before adding review for this product');
    },

    async editReviewById(ctx) {
        // If user has already logged in, add item to user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get review id, update content from request
                const { reviewId, editReviewInput } = ctx.request.body;

                // Retrieve review need to be edited in database
                const reviewNeedToBeEdited = await strapi.query('review').model.findById(reviewId);

                // If review need to be edited is not exist, throw an error
                if(!reviewNeedToBeEdited) 
                    throw new Error(`Cannot edit review with id ${reviewId} because this review is not exist`);

                // If user is not owner's review, stop and throw an error
                if(reviewNeedToBeEdited.user != user_id)
                    throw new Error(`Cannot edit review with id ${reviewId} because you is not its owner`);

                // If user edit stars, modify product's stars
                if(editReviewInput.stars) {
                    editReviewInput.stars = Number(editReviewInput.stars);

                    // Find product need to be modified in database by id
                    const productNeedToBeModified = await strapi.query('product').model.findById(reviewNeedToBeEdited.product, 'stars votes');

                    // Modify product's stars
                    const oldReviewStars = Number(reviewNeedToBeEdited.stars);
                    const newReviewStars = Number(editReviewInput.stars);
                    productNeedToBeModified.stars -= (oldReviewStars - newReviewStars) / productNeedToBeModified.votes;
                    
                    await productNeedToBeModified.save();
                }

                // Edit and return review
                return await strapi.query('review').update({ _id: reviewId }, editReviewInput);

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before adding review for this product');
    },

    async deleteReviewById(ctx) {
        // If user has already logged in, add item to user's cart
        if(ctx.request.header && ctx.request.header.authorization) {
            try {
                // Get user's id from request header
                const { id: user_id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);

                // Get review id from request
                const { reviewId } = ctx.request.body;
                
                // Find review need to be deleted in database by id
                const reviewNeedToBeDeleted = await strapi.query('review').model.findById(reviewId);

                // If review need to be deleted is not exist, throw an error
                if(!reviewNeedToBeDeleted) 
                    throw new Error(`Cannot delete review with id ${reviewId} because this review is not exist`);

                // If user is not owner' review, stop and throw an error
                if(reviewNeedToBeDeleted.user != user_id)
                    throw new Error(`Cannot delete review with id ${reviewId} because you is not its owner`);

                // Modify product's stars and votes before deleting review
                // Find product need to be modified in database by id
                const productNeedToBeModified = await strapi.query('product').model.findById(reviewNeedToBeDeleted.product, 'stars votes');

                // Modify product's stars and votes
                const reviewStars = Number(reviewNeedToBeDeleted.stars);

                if(productNeedToBeModified.votes > 1)
                    productNeedToBeModified.stars = (productNeedToBeModified.stars * productNeedToBeModified.votes - reviewStars) / (productNeedToBeModified.votes - 1);
                else 
                    productNeedToBeModified.stars = 0;

                productNeedToBeModified.votes -= 1;
                
                await productNeedToBeModified.save();

                // Delete and return review
                return await strapi.query('review').delete({ _id: reviewId });

            } catch (error) {
                console.log(error);
                throw error;
            }
        }
        throw new Error('You must login before adding review for this product');
    },
};
