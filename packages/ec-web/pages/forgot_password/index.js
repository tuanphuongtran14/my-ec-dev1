import "../_app.js";
import React from "react";
import { useRouter } from "next/router";
import { userApi } from "../../apis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgetPassword() {
  const route = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const data = await userApi.forgetPassword(email);
    if (data) {
      route.push("/login_register");
      alert("aadasdasd");
      toast.success(`Thông tin đã được chuyển đến email:${email} của bạn`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      alert("Tài khoản email không hợp lệ");
    }
  };

  return (
    <div className="body">
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      />
      <link rel="stylesheet" href="./css/style.css" />

      <div className="forgot_container">
        <div className="form-container sign-in-container">
          <form onSubmit={onSubmit}>
            <h1>Forgot Password</h1>
            <h6 className="mt-5 ">Hãy nhập email mà bạn đã đăng ký</h6>
            <input type="email" placeholder="Email" required id="email" />
            <button className="mt-2" type="submit">
              {" "}
              Xác thực tài khoản{" "}
            </button>
           
            <a className="mt-3" href="/login_register">
              Trở về đăng nhập
            </a>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>We will get your account back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
