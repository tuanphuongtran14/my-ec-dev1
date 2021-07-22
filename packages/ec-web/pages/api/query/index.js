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
            query,
            variables
        } = req.body;

        const jwt = (req.session.get("user")) ? req.session.get("user").jwt : null;
        const options = {};

        if(jwt) 
            options.headers = {
                Authorization: `Bearer ${jwt}`,
            }

        const { data } = await fetchgql('query', query, variables, options);

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