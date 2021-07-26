import nookies from 'nookies';
import Cookies from 'cookies';
import {
    withIronSession
} from "next-iron-session";


export const isSignIn = ctx => {
    // Get jwt from coookies 
    const {
        req,
        res
    } = ctx;

    const cookies = new Cookies(req, res);

    const jwt = cookies.get('jwt');

    // Check if user logged in or not
    return (!jwt) ? false : true;
}

export const getJwt = ctx => {
    // Get jwt from coookies 
    const {
        req,
        res
    } = ctx;

    const cookies = new Cookies(req, res);

    return cookies.get('jwt');
}

export const signIn = async (username, password) => {
    // Send request to login API
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        }),
    });

    // Retrieve data from response and return it
    const {
        ok
    } = await response.json();

    return ok;
};

export const signOut = async () => {
    // Send request to login API
    const response = await fetch('/api/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Retrieve data from response and return it
    const {
        ok
    } = await response.json();

    return ok;
};
// export const forgotPassword = async (email) => {
//     // Send request to login API
//     const response = await fetch('/api/forgot-password', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify({
//         //     email
            
//         // }),
//     });

//     // Retrieve data from response and return it
//     const {
//         ok
//     } = await response.json();

//     return ok;
// };
export const useAuth = handler => withIronSession(handler, {
    password: 'DkAi0P2Aixgs9FWo66UMV3YdmksspNrW',
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    },
});