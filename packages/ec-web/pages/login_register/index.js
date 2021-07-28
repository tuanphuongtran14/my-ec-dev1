import '../_app.js'
import React, { useState } from "react";
import DismissingAlert from "../../components/DismissingAlert/DismissingAlert";
import { signIn, isSignIn } from "../../helpers/auth";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
  if (isSignIn(ctx)) {
      ctx.res.writeHead(302, {
          Location: '/'
      });
      ctx.res.end();
  }
  
  return { props: {} };
}


export default function(){
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
  <div className = "body">
  
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"/>
    <link rel="stylesheet" href="./css/style.css" />

    <div className="login_container" id="login_container">
      <div className=" form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <input className= "mt-5"type="text" placeholder="Tên tài khoản" name="username" required />
          <input type="password" placeholder="Mật khẩu" name="MatKhau" required />
          <input type="password" placeholder="Nhập lại mật khẩu" name="NhapLaiMatKahu" required />
          <input type="text" placeholder="Họ Tên" name="HoTen" required />
          <input type="tel" placeholder="Số điện thoại" name="SoDT" required />
          <input type="text" placeholder="Địa chỉ " name="DiaChi" required />
          <button className= "mt-3">Đăng kí</button>
          <a href= "/">Trờ về trang chủ </a>
       
        </form>
      </div>
      <div className=" form-container sign-in-container">
        <form onSubmit={onSubmit}>
          {message}
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
            <a href="http://localhost:1337/connect/google" className="social"><i className="fab fa-google-plus-g" /></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
          </div>
          <span>Hoặc sử dụng tài khoản của bạn</span>
          <input type="text" placeholder="Tên tài khoản" required name="username" id="username"/>
          <input type="password" placeholder="Mật khẩu"  required name="password" id="password" />
          <a href="/forgot_password">Quên mật khẩu?</a>
          <button className="relative" type="submit" >Đăng nhập </button>
          <a href= "/">Trờ về trang chủ </a>
        </form>
       
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    <script src="./js/main.js"></script>
  </div>
        
      );


  }