
import axiosClient from "./clients/axiosClient";
import {
    GET_CART,
    TOGGLE_SELECT_ITEM,
    TOGGLE_SELECT_ALL_ITEMS,
    REMOVE_SELECTED_ITEMS,
    REMOVE_ITEM,
    INCREMENT_QUANTITY,
    DECREMENT_QUANTITY,
    APPLY_COUPON,
    REMOVE_COUPON,
    CHANGE_ITEM_COLOR,
} from "../constants/graphql/cart";

class CartApi {
    async getCart(cartId) {
        try {
            const { data: responseData } = await axiosClient.post(
                `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
                {
                    type: "query",
                    query: `
                        query($cartId: ID!) {
                            cart: ${GET_CART},
                        }
                    `,
                    variables: {
                        cartId
                    },
                }
            );
            const { data, error, success } = responseData;
            return success ? data : error;
        } catch (error) {
            return {};
        }
    }
    async toggleSelectItem(cartId, itemId, value) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $itemId: ID!, $value: Boolean!) {
                        cart: ${TOGGLE_SELECT_ITEM},
                    }
                `,
                variables: {
                    cartId,
                    itemId,
                    value
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async toggleSelectAllItems(cartId, value) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $value: Boolean!) {
                        cart: ${TOGGLE_SELECT_ALL_ITEMS},
                    }
                `,
                variables: {
                    cartId,
                    value
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async removeSelectedItems(cartId) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!) {
                        cart: ${REMOVE_SELECTED_ITEMS},
                    }
                `,
                variables: {
                    cartId,
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async removeItem(cartId, itemId) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $itemId: ID!) {
                        cart: ${REMOVE_ITEM},
                    }
                `,
                variables: {
                    cartId,
                    itemId,
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async incrementQuantity(cartId, itemId, by) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $itemId: ID!, $by: Int!) {
                        cart: ${INCREMENT_QUANTITY},
                    }
                `,
                variables: {
                    cartId,
                    itemId,
                    by
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async decrementQuantity(cartId, itemId, by) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $itemId: ID!, $by: Int!) {
                        cart: ${DECREMENT_QUANTITY},
                    }
                `,
                variables: {
                    cartId,
                    itemId,
                    by
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async applyCoupon(cartId, couponCode) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $couponCode: String!) {
                        cart: ${APPLY_COUPON},
                    }
                `,
                variables: {
                    cartId,
                    couponCode
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async removeCoupon(cartId, couponCode) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $couponCode: String!) {
                        cart: ${REMOVE_COUPON},
                    }
                `,
                variables: {
                    cartId,
                    couponCode
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async changeItemColor(cartId, itemId, color) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($cartId: ID!, $itemId: ID!, $color: String!) {
                        cart: ${CHANGE_ITEM_COLOR},
                    }
                `,
                variables: {
                    cartId,
                    itemId,
                    color
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
}

export default new CartApi();
