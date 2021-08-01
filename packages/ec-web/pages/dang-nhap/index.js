import React, { useState, useEffect } from "react";
import DismissingAlert from "../../components/DismissingAlert/DismissingAlert";
import { signIn } from "../../helpers/auth";
import withIronSession from "../../helpers/customWithIronSession";
import { useRouter } from "next/router";
import Link from "next/link";
import { userApi } from "../../apis";

export const getServerSideProps = withIronSession(async ({ req, res }) => {
    const user = req.session.get("user");
    if (user) {
        res.writeHead(302, {
            Location: "/",
        });
        return res.end();
    }

    return { props: {} };
});

export default function () {
    const [loginMessage, setLoginMessage] = useState();
    const [registerMessage, setRegisterMessage] = useState();
    const [lgUsername, setLgUsername] = useState();
    const [lgPw, setLgPw] = useState();
    const [rgCustomerName, setRgCustomerName] = useState();
    const [rgEmail, setRgEmail] = useState();
    const [rgEmailIsValid, setRgEmailIsValid] = useState(true);
    const [rgPhone, setRgPhone] = useState();
    const [rgUsername, setRgUsername] = useState();
    const [rgUsernameIsValid, setRgUsernameIsValid] = useState();
    const [rgPw, setRgPw] = useState();
    const [rgRepeatPw, setRgRepeatPw] = useState();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (await signIn(lgUsername, lgPw))
            router.push({
                pathname: "/",
            });
        else {
            setLoginMessage(
                displayMessage(
                    "Tên tài khoản hoặc mật khẩu không chính xác",
                    "danger"
                )
            );
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = document.getElementById("user-name").value;
        const email = document.getElementById("user-email").value;
        const phone = document.getElementById("user-phone").value;
        const username = document.getElementById("user-username").value;
        const password = document.getElementById("user-pass").value;
        const repeatPw = document.getElementById("user-repeatpass").value;

        if(password !== repeatPw) 
            return setRegisterMessage(
                displayMessage(
                    "Mật khẩu bạn nhập không khớp nhau",
                    "warning"
                )
            );

        if (await signIn(username, password))
            router.push({
                pathname: "/",
            });
        else {
            setRegisterMessage(
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

    useEffect(() => {
        function toggleResetPswd(e){
            e.preventDefault();
            $('#logreg-forms .form-signin').toggle() // display:block or none
            $('#logreg-forms .form-reset').toggle() // display:block or none
        }
        
        function toggleSignUp(e){
            e.preventDefault();
            $('#logreg-forms .form-signin').toggle(); // display:block or none
            $('#logreg-forms .form-signup').toggle(); // display:block or none
        }

        $(".toggle-password").click(function() {
            $(this).toggleClass("fa-eye fa-eye-slash");
            var input = $($(this).attr("toggle"));
            if (input.attr("type") == "password") {
              input.attr("type", "text");
            } else {
              input.attr("type", "password");
            }
        });
        
        document.getElementById('forgot_pswd').onclick = toggleResetPswd;
        document.getElementById('cancel_reset').onclick = toggleResetPswd;
        document.getElementById('btn-signup').onclick = toggleSignUp;
        document.getElementById('cancel_signup').onclick = toggleSignUp;
    }, []);

    useEffect(() => {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    })

    return (
        <div id="logreg-forms">
            <form className="form-signin" onSubmit={handleLogin}>
                <h1
                    className="h3 mb-3 font-weight-normal"
                    style={{ textAlign: "center" }}
                >
                    Đăng nhập
                </h1>
                { loginMessage }
                <div className="social-login">
                    <button
                        className="btn facebook-btn social-btn mr-1"
                        type="button"
                    >
                        <span>
                            <i className="fab fa-facebook-f mr-1" /> Đăng nhập
                            Facebook
                        </span>
                    </button>
                    <Link href="http://localhost:1337/connect/google">
                        <button className="btn google-btn social-btn" type="button">
                            <span>
                                <i className="fab fa-google-plus-g mr-1" /> Đăng nhập
                                Google+
                            </span>
                        </button>
                    </Link>
                </div>
                <p style={{ textAlign: "center" }}> Hoặc</p>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control"
                    placeholder="Tên tài khoản"
                    required
                    autofocus
                    onChange= {e => setLgUsername(e.target.value)}
                    value={lgUsername}
                />
                <input
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Mật khẩu"
                    required
                    onChange= {e => setLgPw(e.target.value)}
                    value={lgPw}
                />
                <span toggle="#inputPassword" class="fas fa-fw fa-eye fa-sm text-secondary field-icon toggle-password"></span>
                <button 
                    id="loginBtn" 
                    className="btn btn-success btn-block" 
                    type="button"
                    disabled={
                        !(lgUsername && lgPw)
                    }
                    onClick={handleLogin}
                >
                    <i className="fas fa-sign-in-alt mr-1" /> Đăng nhập
                </button>
                <a href="#" id="forgot_pswd">
                    Quên mật khẩu?
                </a>
                <hr />
                {/* <p>Don't have an account!</p>  */}
                <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    id="btn-signup"
                >
                    <i className="fas fa-user-plus mr-1" /> Đăng ký tài khoản mới
                </button>
            </form>
            <form action="/reset/password/" className="form-reset">
                <input
                    type="email"
                    id="resetEmail"
                    className="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                />
                <button className="btn btn-primary btn-block" type="submit">
                    Reset Password
                </button>
                <a href="#" id="cancel_reset">
                    <i className="fas fa-angle-left" /> Back
                </a>
            </form>
            <form action="/signup/" className="form-signup" onSubmit={handleRegister}>
                <h1
                    className="h3 mb-3 font-weight-normal"
                    style={{ textAlign: "center" }}
                >
                    Đăng ký
                </h1>
                { registerMessage }
                <div className="social-login">
                    <Link href="http://localhost:1337/connect/google">
                        <button
                            className="btn facebook-btn social-btn mb-2"
                            type="button"
                        >
                            <span>
                                <i className="fab fa-facebook-f mr-2" /> Đăng nhập bằng
                                Facebook
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="social-login">
                    <Link href="http://localhost:1337/connect/google">
                        <button className="btn google-btn social-btn mb-2" type="button">
                            <span>
                                <i className="fab fa-google-plus-g mr-2" /> Đăng nhập bằng
                                Google+
                            </span>{" "}
                        </button>
                    </Link>
                </div>
                <p style={{ textAlign: "center" }}>Hoặc</p>
                <input
                    type="text"
                    id="user-name"
                    className="form-control"
                    placeholder="Họ và tên"
                    required
                    autofocus
                />
                <input
                    type="email"
                    id="user-email"
                    className="form-control"
                    placeholder="Email"
                    required
                    autofocus
                    data-toggle="tooltip" 
                    data-placement="auto"
                    title={
                        rgEmailIsValid ? "" : "Email đã được đăng ký trước đó"
                    }
                    onChange={async e => {
                        const value = e.target.value; 
                        setRgEmail(value);
                        const isValid = await userApi.isValidEmail(value);
                        console.log(isValid);
                        setRgEmailIsValid(isValid.valid);
                    }}
                />
                {
                    rgEmail ? (
                        (rgEmailIsValid) ? 
                            <span class="fas fa-fw fa-check fa-sm text-success field-icon"></span> :
                            <span class="fas fa-fw fa-times fa-sm text-danger field-icon"></span>
                    ) : ""
                }
                <input
                    type="text"
                    id="user-phone"
                    className="form-control"
                    placeholder="Số điện thoại"
                    required
                    autofocus
                />
                <input
                    type="text"
                    id="user-username"
                    className="form-control"
                    placeholder="Tên tài khoản"
                    required
                    autofocus
                />
                <input
                    type="password"
                    id="user-pass"
                    className="form-control"
                    placeholder="Password"
                    required
                    autofocus
                />
                <input
                    type="password"
                    id="user-repeatpass"
                    className="form-control"
                    placeholder="Repeat Password"
                    required
                    autofocus
                />
                <button className="btn btn-primary btn-block" type="submit">
                    <i className="fas fa-user-plus mr-2" /> Đăng ký ngay
                </button>
                <a href="#" id="cancel_signup">
                    <i className="fas fa-angle-left mr-2" /> Quay lại
                </a>
            </form>
            <br />
        </div>
    );
}
