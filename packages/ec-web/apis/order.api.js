
import axiosClient from "./clients/axiosClient";
import {
    CHECKOUT,
} from "../constants/graphql/order";

class OrderApi {
    async checkout(consigneeName, consigneePhone, email, addressLine1, district, city, paymentMethod) {
        const { data: responseData } = await axiosClient.post(
            "http://localhost:3000/api/graphql",
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
}

export default new OrderApi();
