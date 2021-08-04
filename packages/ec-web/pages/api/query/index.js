import { apolloClient, gql } from '../../../apis/clients/apolloClient';
import { withIronSession } from "next-iron-session";

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

        const { data } = await apolloClient.query({
            query: gql`${query}`,
            variables,
            context: {
                options
            },
        })

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
    password: process.env.NEXT_PUBLIC_APP_SECRET,
    cookieName: process.env.NEXT_PUBLIC_APP_COOKIE_NAME,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    },
});