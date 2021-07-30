import { userApi } from "../../../apis";
import withIronSession from "../../../helpers/customWithIronSession";

async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, password } = req.body;

            const data = await userApi.login(username, password, {
                useAxiosClient: false,
            });

            if (data?.login?.jwt) {
                req.session.set("user", {
                    jwt: data.login.jwt,
                    username: data.login.user.username,
                    email: data.login.user.email,
                });

                await req.session.save();
                return res.json({
                    message: "Logged in successfully",
                    ok: true,
                });
            }
        } catch {
            return res.json({
                message:
                    "Some errors happen while logging. May be wrong username or password",
                ok: false,
            });
        }
    } else {
        // Handle any other HTTP method
        return res.json({
            message: "This API only works with GET method",
            ok: false,
        });
    }
}

export default withIronSession(handler);
