import { apolloClient, gql } from '../../../apis/clients/apolloClient';
import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    if (req.method === 'POST') {
        // Get input from request headers
        const {
            variables,
            query,
            type,
        } = req.body;

        // Check jwt and set header authorization
        const jwt = (req.session.get("user")) ? req.session.get("user").jwt : null;
        const headers = (jwt) ? { Authorization: `Bearer ${jwt}`, } : undefined;
        
        // Excute query based on query's type
        if(type === 'query') {
            const { data, errors } = await apolloClient.query({
                query: gql`${query}`,
                variables,
                context: {
                    headers
                },
            });

            return res.json({
                success: !errors,
                errors,
                data,
            });
        }

        if(type === 'mutation') {
            const { data, errors } = await apolloClient.mutate({
                mutation: gql`${query}`,
                variables,
                context: {
                    headers
                },
            });

            return res.json({
                success: !errors,
                errors,
                data,
            });
        }

        // If type is not valid, return a message
        return res.json({
            errors: new Error('Action type is not valid. Type is only "query" or "mutation"'),
            success: false,
        });
    } else {
        // Handle any other HTTP method
        return res.json({
            message: new Error('This API only works with GET method'),
            success: false,
        });
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