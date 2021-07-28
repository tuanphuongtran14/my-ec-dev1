
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
    async changeItemColor(cartId, itemId, color) {
        const { data: responseData } = await axiosClient.post(
            "http://localhost:3000/api/graphql",
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
