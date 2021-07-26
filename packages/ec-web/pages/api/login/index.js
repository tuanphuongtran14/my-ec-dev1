import { graphqlClient, gql } from '../../../helpers/apollo-client';
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
    password: 'DkAi0P2Aixgs9FWo66UMV3YdmksspNrW',
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    },
});