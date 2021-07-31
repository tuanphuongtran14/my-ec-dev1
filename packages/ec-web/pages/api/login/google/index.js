import axiosClient from "../../../../apis/clients/axiosClient";
import withIronSession from "../../../../helpers/customWithIronSession";

async function handler(req, res) {
    const { id_token, access_token } = req.query;
    try {
        const { data } = await axiosClient.get(`http://localhost:1337/auth/google/callback?id_token=${id_token}&access_token=${access_token}`);
        req.session.set("user", {
            jwt: data.jwt,
            username: data.user.username,
            email: data.user.email,
        });
        await req.session.save();
        return res.redirect('/');

    } catch(error) {
        return res.json({
            message:
                "Some errors happen while logging. May be wrong username or password",
            ok: false,
            error,
        });
    }
}

export default withIronSession(handler);
