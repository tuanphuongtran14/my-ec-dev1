const {
    parseCookies,
    setCookie,
    destroyCookie
} = require('nookies');
import Cookies from 'cookies';

// export default async function handler(req, res) {

//     destroyCookie({ res }, 'jwt', {
//         path: '/',
//         sameSite: true,
//         httpOnly: true
//     });
//     // const cookies = new Cookies(req, res);

//     // cookies.set('jwt', null, {
//     //     sameSite: 'strict',
//     //     path: '/',
//     //     maxAge: new Date(0),
//     // });

//     return res.redirect('/');

// }

import {
    withIronSession
} from "next-iron-session";

function handler(req, res, session) {
    req.session.destroy();
    res.redirect('/');
}

export default withIronSession(handler, {
    password: 'DkAi0P2Aixgs9FWo66UMV3YdmksspNrW',
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    },
});