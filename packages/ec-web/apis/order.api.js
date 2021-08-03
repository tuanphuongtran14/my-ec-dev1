
import axiosClient from "./clients/axiosClient";
import {
    CHECKOUT,
    CANCEL_ORDER_BY_ID,
} from "../constants/graphql/order";

class OrderApi {
    async checkout(consigneeName, consigneePhone, email, addressLine1, district, city, paymentMethod) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($info: OrderInfo!) {
                        order: ${CHECKOUT},
                    }
                `,
                variables: {
                    info: {
                        consigneeName,
                        consigneePhone,
                        email,
                        addressLine1,
                        district,
                        city,
                        paymentMethod,
                    }
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
    async cancelOrderById(orderId) {
        const { data: responseData } = await axiosClient.post(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/graphql`,
            {
                type: "mutation",
                query: `
                    mutation($orderId: ID!) {
                        cancelledOrder: ${CANCEL_ORDER_BY_ID},
                    }
                `,
                variables: {
                    orderId
                },
            }
        );
        const { data, error, success } = responseData;
        return success ? data : error;
    }
}

export default new OrderApi();
