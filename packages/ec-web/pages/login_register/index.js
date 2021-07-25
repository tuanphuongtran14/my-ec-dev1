import '../_app.js'
import Head from 'next/head'

export default function(){
          return (  
            <div className = "body">
            
              <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"/>
              <link rel="stylesheet" href="./css/style.css" />

              <div className="login_container" id="login_container">
                <div className=" form-container sign-up-container">
                  <form asp-controller="Login" asp-action="DangKi">
                    <h1>Create Account</h1>
                    <div className="social-container">
                      <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
                      <a href="http://localhost:1337/connect/google" className="social"><i className="fab fa-google-plus-g" /></a>
                      <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                    </div>
                    <span>Hoặc sử dụng email để đăng kí </span>
                    <input type="email" placeholder="Email" name="Email" required />
                    <input type="password" placeholder="Mật khẩu" name="MatKhau" required />
                    <input type="password" placeholder="Nhập lại mật khẩu" name="NhapLaiMatKahu" required />
                    <input type="text" placeholder="Họ Tên" name="HoTen" required />
                    <input type="tel" placeholder="Số điện thoại" name="SoDT" required />
                    <input type="text" placeholder="Địa chỉ " name="DiaChi" required />
                    <button>Đăng kí</button>
                  </form>
                </div>
                <div className="form-container sign-in-container">
                  <form asp-action="Login" asp-controller="Login">
                    <h1>Sign in</h1>
                    <div className="social-container">
                      <a href="#" className="social"><i className="fab fa-facebook-f" /></a>
                      <a href="http://localhost:1337/connect/google" className="social"><i className="fab fa-google-plus-g" /></a>
                      <a href="#" className="social"><i className="fab fa-linkedin-in" /></a>
                    </div>
                    <span>Hoặc sử dụng tài khoản của bạn</span>
                    <input type="text" placeholder="Email" required name="Email" />
                    <input type="password" placeholder="Mật khẩu" required name="MatKhau" />
                    <a href="#">Quên mật khẩu?</a>
                    <button>Đăng nhập </button>
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


