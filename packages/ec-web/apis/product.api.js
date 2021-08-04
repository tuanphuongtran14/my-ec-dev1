
import axiosClient from "./clients/axiosClient";
import { apolloClient, gql } from "./clients/apolloClient";
import {
    GET_NEW_ARRIVALS,
    GET_BEST_SELLERS,
    GET_HOT_SALES,
    GET_PRODUCT_DETAIL_BY_SLUG,
    GET_RELATED_PRODUCTS,
} from "../constants/graphql/product";
import { 
    GET_PRODUCT_REVIEWS,
} from "../constants/graphql/review";

class ProductApi {
    async getForHome(limit) {
        try {
            const { data: responseData } = await axiosClient.post(
                `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
                {
                    type: "query",
                    query: `
                        query($limit: Int!) {
                            productsBestNew: ${GET_NEW_ARRIVALS},
                            productsBestSell: ${GET_BEST_SELLERS},
                            productHotSale: ${GET_HOT_SALES},
                        }
                    `,
                    variables: {
                        limit: limit || 10,
                    },
                }
            );
            const { data, error, success } = responseData;
            return success ? data : error;
        } catch (error) {
            return {
                error
            };
        }
    }
    async getForProductPage(slug, options) {
        try {
            // Declare query need be used
            const query = `
                query($slug: String!) {
                    product: ${GET_PRODUCT_DETAIL_BY_SLUG},
                    relatedProducts: ${GET_RELATED_PRODUCTS},
                    reviewList: ${GET_PRODUCT_REVIEWS},
                }
            `;
            // Start execute request
            options = options ? options : { useAxiosClient: true };
            const { useAxiosClient, jwt } = options;
            if(useAxiosClient) { // Execute indirectly by axios client
                const { data: responseData } = await axiosClient.post(
                    `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
                    {
                        type: "query",
                        query,
                        variables: {
                            slug,
                        },
                    }
                );
                const { data, error, success } = responseData;
                return success ? data : error;
            } else { // Execute directly by apollo client
                const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
                const { data, error } = await apolloClient.query({
                    query: gql`${query}`,
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
            return {
                error
            };
        }
    }
    async getBestSellers(limit) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "query",
                query: `
                    query($limit: Int!) {
                        productsBestSell: ${GET_BEST_SELLERS},
                    }
                `,
                variables: {
                    limit: limit || 10,
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async getNewArrivals(limit) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "query",
                query: `
                    query($limit: Int!) {
                        productsBestNew: ${GET_NEW_ARRIVALS},
                    }
                `,
                variables: {
                    limit: limit || 10,
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async getHotSales(limit) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "query",
                query: `
                    query($limit: Int!) {
                        productHotSale: ${GET_HOT_SALES},
                    }
                `,
                variables: {
                    limit: limit || 10,
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
} 

export default new ProductApi();
