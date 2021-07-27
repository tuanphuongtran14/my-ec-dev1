import axiosClient from "./clients/axiosClient";
import { apolloClient, gql } from "./clients/apolloClient";
import {
    GET_PRODUCT_REVIEWS,
} from "../constants/graphql/review";
import { query } from "express";

class ReviewApi {
    async getProductReviews(slug, options) {
        try {
            const { useAxiosClient, jwt } = options;
            if(useAxiosClient) {
                const { data: responseData } = await axiosClient.post(
                    "http://localhost:3000/api/graphql",
                    {
                        type: "query",
                        query: `
                            query($slug: String!) {
                                reviewList: ${GET_PRODUCT_REVIEWS},
                            }
                        `,
                        variables: {
                            slug,
                        },
                    }
                );
                const { data, error, success } = responseData;
                return success ? data : error;
            } else {
                const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
                const { data, error } = await apolloClient.query({
                    query: gql`
                        query($slug: String!) {
                            reviewList: ${GET_PRODUCT_REVIEWS},
                        }
                    `,
                    variables: {
                        slug,
                    },
                    context: {
                        headers
                    },
                });
                return (!error) ? data : error; 
            }
        } catch (error) {
            return {};
        }
    }
}

export default new ReviewApi();
