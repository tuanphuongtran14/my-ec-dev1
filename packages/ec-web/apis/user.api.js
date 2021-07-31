
import axiosClient from "./clients/axiosClient";
import {
    apolloClient,
    gql,
} from './clients/apolloClient';
import {
    LOGIN,
    GET_USER_CART,
    ME,
    FORGET_PASSWORD,
    GET_USER_ORDERS,
    IS_VALID_EMAIL,
    IS_VALID_USERNAME,
} from "../constants/graphql/user";

class UserApi {
    async login(username, password, options) {
        try {
            // Declare query need be used
            const query = `
                mutation($input: UsersPermissionsLoginInput!) {
                    login: ${LOGIN},
                }
            `;
            // Declare variables need be used
            const variables = {
                input: {
                    identifier: username,
                    password,
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
                        variables
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
    async forgetPassword(email, options) {
        try {
            // Declare query need be used
            const query = `
                mutation($email: String!) {
                    ${FORGET_PASSWORD},
                }
            `;
            // Declare variables need be used
            const variables = {
                email
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
                        variables
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
    async me(options) {
        try {
            // Declare query need be used
            const query = `
                query {
                    me: ${ME},
                }
            `;
            // Declare variables need be used
            const variables = {};
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
    async getUserCart(cartId, options) {
        try {
            // Declare query need be used
            const query = `
                query($cartId: ID) {
                    cart: ${GET_USER_CART},
                }
            `;
            // Declare variables need be used
            const variables = !cartId ? {} : {
                cartId
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
    async getUserOrders() {
        const { data: responseData } = await axiosClient.post(
            "http://localhost:3000/api/graphql",
            {
                type: "query",
                query: `
                    query {
                        orders: ${GET_USER_ORDERS},
                    }
                `,
                variables: {},
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async isValidEmail(email, options) {
        try {
            // Declare query need be used
            const query = `
                query($email: String!) {
                    valid: ${IS_VALID_EMAIL},
                }
            `;
            // Declare variables need be used
            const variables = {
                email
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
    async isValidUsername(username, options) {
        try {
            // Declare query need be used
            const query = `
                query($username: String!) {
                    valid: ${IS_VALID_USERNAME},
                }
            `;
            // Declare variables need be used
            const variables = {
                username
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
}

export default new UserApi();
