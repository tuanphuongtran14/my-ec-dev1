export const LOGIN = `
    login(input: $input) {
        jwt
        user {
            username
            email
        }
    }
`;

export const REGISTER = `
    forgotPassword(email: $email) {
        ok
    }
`;

export const FORGET_PASSWORD = `

`

export const ME = `
    customMe {
        id
        username
        name
        email
        phone
        blocked
        confirmed
        role {
            name
        }
    }
`;

export const GET_USER_CART = `
    getCart(cartId: $cartId) {
        _id
        items {
            _id
        }
    }
`;

