import userApi from "../../apis/user.api";

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
`;

export const FORGET_PASSWORD = `
    forgotPassword(email: $email) {
        ok
    }
`;

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



