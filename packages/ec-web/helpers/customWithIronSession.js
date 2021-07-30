import {
    withIronSession
} from "next-iron-session";

const customWithIronSession = handler => withIronSession(handler, {
    password: process.env.APPLICATION_SECRET,
    cookieName: process.env.APPLICATION_COOKIE_NAME,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true
    },
});

export default customWithIronSession;