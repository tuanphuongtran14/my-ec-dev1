import React, { useState } from "react";
import { useRouter } from "next/router";
import DismissingAlert from "../../components/DismissingAlert/DismissingAlert";
import { signIn, isSignIn } from "../../helpers/auth";

export async function getServerSideProps(ctx) {
    if (isSignIn(ctx)) {
        ctx.res.writeHead(302, {
            Location: '/'
        });
        ctx.res.end();
    }
    
    return { props: {} };
}

export default function Login() {
    const [message, setMessage] = useState();

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (await signIn(username, password))
            router.push({
                pathname: "/",
            });
        else {
            setMessage(
                displayMessage(
                    "Tên tài khoản hoặc mật khẩu không chính xác",
                    "danger"
                )
            );
        }
    };

    const displayMessage = (message, type) => {
        return (
            <DismissingAlert type={type} showTime={5}>
                {message}
            </DismissingAlert>
        );
    };

    return (
        <>
            <form className="container mt-5 pt-5" onSubmit={onSubmit}>
                {message}
                <div className="form-group">
                    <label htmlFor="">Tên tài khoản</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        placeholder="Tên tài khoản"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Mật khẩu</label>
                    <input
                        type="text"
                        className="form-control"
                        name="password"
                        id="password"
                        placeholder="Mật khẩu"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Đăng nhập
                </button>
            </form>
        </>
    );
}
