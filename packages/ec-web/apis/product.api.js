
import axiosClient from "./clients/axiosClient";
import {
    GET_NEW_ARRIVALS,
    GET_BEST_SELLERS,
    GET_HOT_SALES,
} from "../constants/graphql/product";

class ProductApi {
    async getForHome(limit) {
        try {
            const { data: responseData } = await axiosClient.post(
                "http://localhost:3000/api/graphql",
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
            return {};
        }
    }
    async getBestSellers(limit) {
        const { data: responseData } = await axiosClient.post(
            "http://localhost:3000/api/graphql",
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
            "http://localhost:3000/api/graphql",
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
            "http://localhost:3000/api/graphql",
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
