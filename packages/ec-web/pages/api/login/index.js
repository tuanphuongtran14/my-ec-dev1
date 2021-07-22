// import {
//     ApolloClient,
//     InMemoryCache,
//     HttpLink,
//     gql
// } from '@apollo/client';
// const { parseCookies, setCookie, destroyCookie } = require('nookies');
import Cookies from 'cookies';
import cookie from 'cookie';
import { graphqlClient, gql } from '../../../lib/apollo-client';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         // Process a POST request
//         const {
//             username,
//             password
//         } = req.body;


//         const createApolloClient = () => {
//             const link = new HttpLink({
//                 uri: 'http://localhost:1337/graphql',
//             });

//             return new ApolloClient({
//                 link,
//                 cache: new InMemoryCache,
//             });
//         };

//         const client = createApolloClient();


//         const LoginMutation = gql `
//             mutation signin($username: String!, $password: String!) {
//                 login(input: {
//                     identifier: $username,
//                     password: $password,
//                 }) {
//                     jwt
//                 }
//             }
//         `
//         try {
//             const result = await client.mutate({
//                 mutation: LoginMutation,
//                 variables: {
//                     username,
//                     password
//                 }
//             });

//             if (result ? .data ? .login ? .jwt) {
//                 // setCookie({ res }, 'jwt', result.data.login.jwt, {
//                 //     maxAge: 30 * 24 * 60 * 60,
//                 //     httpOnly: true,
//                 //     path: '/'
//                 // });
//                 const cookies = new Cookies(req, res);

//                 cookies.set('jwt', result.data.login.jwt, {
//                     httpOnly: true, // true by default
//                     sameSite: 'strict',
//                     path: '/',
//                     maxAge: 30 * 24 * 60 * 60 * 1000,
//                 });

//                 // res.setHeader('Set-Cookie', cookie.serialize('jwt', result.data.login.jwt, {
//                 //     httpOnly: true,
//                 //     sameSite: 'strict',
//                 //     maxAge: 60 * 60 * 24 * 30,
//                 //     path: '/'
//                 // }))

//                 return res.json({
//                     ok: true
//                 });

//             } else
//                 return res.json({
//                     ok: false
//                 });
//         } catch (error) {
//             return res.json({
//                 ok: false
//             });
//         }

//     } else {
//         // Handle any other HTTP method
//         return res.json({
//             message: 'This API only works with GET method'
//         })
//     }
// }

import {
    withIronSession
} from "next-iron-session";

async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            username,
            password
        } = req.body;

        const client = graphqlClient();

        const LoginMutation = gql `
            mutation signin($username: String!, $password: String!) {
                login(input: {
                    identifier: $username,
                    password: $password,
                }) {
                    jwt
                    user {
                        username
                        email
                    }
                }
            }
        `;

        try {
            const result = await client.mutate({
                mutation: LoginMutation,
                variables: {
                    username,
                    password
                }
            });

            if (result ?.data?.login?.jwt) {
                req.session.set("user", {
                    jwt: result.data.login.jwt,
                    username: result.data.login.user.username,
                    email: result.data.login.user.email,
                });

                await req.session.save();
                return res.json({
                    message: "Logged in successfully",
                    ok: true,
                });
            };
        } catch {
            return res.json({
                message: "Some errors happen while logging. May be wrong username or password",
                ok: false,
            });
        }
        // get user from database then:

    } else {
        // Handle any other HTTP method
        return res.json({
            message: 'This API only works with GET method',
            ok: false,
        })
    }
}

export default withIronSession(handler, {
    password: process.env.APPLICATION_SECRET,
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    },
});