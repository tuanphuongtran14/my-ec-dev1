// import {
//     ApolloClient,
//     InMemoryCache,
//     HttpLink,
//     gql
// } from '@apollo/client';
import { graphqlClient, gql } from '../../../lib/apollo-client';
import fetchgql from '../../../helpers/fetchgql';

import {
    withIronSession
} from "next-iron-session";

async function handler(req, res) {
    if (req.method === 'POST') {
        const {
            mutation,
            variables
        } = req.body;

        const { jwt } = req.session.get("user");

        const { data } = await fetchgql('mutation', mutation, variables, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });

        return res.json(data);
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