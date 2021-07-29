export const CHECKOUT = `
    checkout(info: $info) {
        consigneeName
        consigneePhone
        email
        addressLine1
        district
        city
        items {
            product {
            name
            thumbnail {
                url
            }
            }
            color
            qty
        }
        coupon {
            code
        }
        totalAmount
        finalAmount
        paymentMethod
        status
    }
`;
