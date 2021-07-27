import axiosClient from "./clients/axiosClient";
import { apolloClient, gql } from "./clients/apolloClient";
import {
    GET_WISH_LIST,
} from "../components/Wishlist/query";

class ListViewApi {
    async getWishList(options) {
        try {
            const { useAxiosClient, jwt } = options;
            if(useAxiosClient) {
                const { data: responseData } = await axiosClient.post(
                    "http://localhost:3000/api/graphql",
                    {
                        type: "query",
                        query: `
                            query {
                                wishLists: ${GET_WISH_LIST},
                            }
                        `,
                    }
                );
                const { data, error, success } = responseData;
                return success ? data : error;
            } else {
                const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
                const { data, error } = await apolloClient.query({
                    query: gql`
                        query {
                            wishLists: ${GET_WISH_LIST},
                        }
                    `,
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

export default new ListViewApi();
