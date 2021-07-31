// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import DismissingAlert from "../../components/DismissingAlert/DismissingAlert";
// import { signIn, isSignIn } from "../../helpers/auth";

// export async function getServerSideProps(ctx) {
//     if (isSignIn(ctx)) {
//         ctx.res.writeHead(302, {
//             Location: '/'
//         });
//         ctx.res.end();
//     }
    
//     return { props: {} };
// }

// export default function Login() {
//     const [message, setMessage] = useState();

//     const router = useRouter();

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         const username = document.getElementById("username").value;
//         const password = document.getElementById("password").value;

//         if (await signIn(username, password))
//             router.push({
//                 pathname: "/",
//             });
//         else {
//             setMessage(
//                 displayMessage(
//                     "Tên tài khoản hoặc mật khẩu không chính xác",
//                     "danger"
//                 )
//             );
//         }
//     };

//     const displayMessage = (message, type) => {
//         return (
//             <DismissingAlert type={type} showTime={5}>
//                 {message}
//             </DismissingAlert>
//         );
//     };

//     return (
//         <>
//             <form className="container mt-5 pt-5" onSubmit={onSubmit}>
//                 {message}
//                 <div className="form-group">
//                     <label htmlFor="">Tên tài khoản</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="username"
//                         id="username"
//                         placeholder="Tên tài khoản"
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="">Mật khẩu</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="password"
//                         id="password"
//                         placeholder="Mật khẩu"
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">
//                     Đăng nhập
//                 </button>
//             </form>
//         </>
//     );
// }

import React from 'react'

const index = () => {
    return (
        <div class="container">
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image">
                                <img style={{width:"100%",height:"100%"}} src="https://genk.mediacdn.vn/2019/10/22/camera-megapixel-war-picture-perfect-or-just-a-gimmick-2019-10-20-1571728906396534754610.jpg"/>
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form class="user">
                                        <div class="form-group">
                                            <input type="email" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..."/>
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password"/>
                                        </div>
                                        <div class="form-group">
                                            <div class="custom-control custom-checkbox small">
                                                <input type="checkbox" class="custom-control-input" id="customCheck"/>
                                                <label class="custom-control-label" for="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <a href="index.html" class="btn btn-success btn-user btn-block">
                                            Login
                                        </a>
                                        <hr/>
                                        <a href="index.html" class="btn btn-danger btn-google btn-user btn-block">
                                            <i class="fab fa-google fa-fw"></i> Login with Google
                                        </a>
                                        <a href="index.html" class="btn btn-primary btn-facebook btn-user btn-block">
                                            <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                                        </a>
                                    </form>
                                    <hr/>
                                    <div class="text-center">
                                        <a class="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div class="text-center">
                                        <a class="small" href="register.html">Create an Account!</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default index

