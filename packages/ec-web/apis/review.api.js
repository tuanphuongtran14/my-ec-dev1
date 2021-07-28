import axiosClient from "./clients/axiosClient";
import { apolloClient, gql } from "./clients/apolloClient";
import {
    GET_PRODUCT_REVIEWS,
    CREATE_REVIEW,
    EDIT_REVIEW,
    DELETE_REVIEW,
} from "../constants/graphql/review";

class ReviewApi {
    async getProductReviews(slug, options) {
        try {
            // Declare query need be used
            const query = `
                query($slug: String!) {
                    reviewList: ${GET_PRODUCT_REVIEWS},
                }
            `;
            // Declare variables need be used
            const variables = {
                slug,
            };
            // Start execute request
            options = options ? options : { useAxiosClient: true };
            const { useAxiosClient, jwt } = options;
            if(useAxiosClient) { // Execute indirectly by axios client
                const { data: responseData } = await axiosClient.post(
                    "http://localhost:3000/api/graphql",
                    {
                        type: "query",
                        query,
                        variables
                    }
                );
                const { data, error, success } = responseData;
                return success ? data : error;
            } else { // Execute directly by apollo client
                const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
                const { data, error } = await apolloClient.query({
                    query: gql`${query}`,
                    variables,
                    context: {
                        headers
                    },
                });
                return (!error) ? data : error; 
            }
        } catch (error) {
            return {
                error
            };
        }
    }
    async createReview(productSlug, comment, stars, options) {
        try {
            // Declare query need be used
            const query = `
                mutation($input: createProductReviewInput!) {
                    newReview: ${CREATE_REVIEW},
                }
            `;
            // Declare variables need be used
            const variables = {
                input: {
                    productSlug,
                    comment,
                    stars
                }
            };
            // Start execute request
            options = options ? options : { useAxiosClient: true };
            const { useAxiosClient, jwt } = options;
            if(useAxiosClient) { // Execute indirectly by axios client
                const { data: responseData } = await axiosClient.post(
                    "http://localhost:3000/api/graphql",
                    {
                        type: "mutation",
                        query,
                        variables,
                    }
                );
                const { data, error, success } = responseData;
                return success ? data : error;
            } else { // Execute directly by apollo client
                const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
                const { data, error } = await apolloClient.mutate({
                    mutation: gql`${query}`,
                    variables,
                    context: {
                        headers
                    },
                });
                return (!error) ? data : error; 
            }
        } catch (error) {
            return {
                error
            };
        }
    }
    async editReview(reviewId, comment, stars, options) {
        try {
            // Declare query need be used
            const query = `
                mutation($reviewId: ID!, $editReviewInput: editReviewInput!) {
                    review: ${EDIT_REVIEW},
                }
            `;
            // Declare variables need be used
            const editReviewInput = {};
            if (comment) editReviewInput.comment = comment;
            if (stars) editReviewInput.stars = stars;
            const variables = {
                reviewId,
                editReviewInput,
            };
            // Start execute request
            options = options ? options : { useAxiosClient: true };
            const { useAxiosClient, jwt } = options;
            if(useAxiosClient) { // Execute indirectly by axios client
                const { data: responseData } = await axiosClient.post(
                    "http://localhost:3000/api/graphql",
                    {
                        type: "mutation",
                        query,
                        variables,
                    }
                );
                const { data, error, success } = responseData;
                return success ? data : error;
            } else { // Execute directly by apollo client
                const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
                const { data, error } = await apolloClient.mutate({
                    mutation: gql`${query}`,
                    variables,
                    context: {
                        headers
                    },
                });
                return (!error) ? data : error; 
            }
        } catch (error) {
            return {
                error
            };
        }
    }
    async deleteReview(reviewId, options) {
        try {
            // Declare query need be used
            const query = `
                mutation($reviewId: ID!) {
                    deletedReview: ${DELETE_REVIEW},
                }
            `;
            // Declare variables need be used
            const variables = {
                reviewId,
            };
            // Start execute request
            options = options ? options : { useAxiosClient: true };
            const { useAxiosClient, jwt } = options;
            if(useAxiosClient) { // Execute indirectly by axios client
                const { data: responseData } = await axiosClient.post(
                    "http://localhost:3000/api/graphql",
                    {
                        type: "mutation",
                        query,
                        variables,
                    }
                );
                const { data, error, success } = responseData;
                return success ? data : error;
            } else { // Execute directly by apollo client
                const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
                const { data, error } = await apolloClient.mutate({
                    mutation: gql`${query}`,
                    variables,
                    context: {
                        headers
                    },
                });
                return (!error) ? data : error; 
            }
        } catch (error) {
            return {
                error
            };
        }
    }
}

export default new ReviewApi();
