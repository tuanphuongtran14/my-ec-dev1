import '../_app.js'
import React, { useState } from "react";
import DismissingAlert from "../../components/DismissingAlert/DismissingAlert";
import { forgotPassword, isSignIn } from "../../helpers/auth";
import { useRouter } from "next/router";
import {ApolloClient, InMemoryCache, gql } from "@apollo/client";
import {useMutation} from "@apollo/client";

// export const forgotPasswordMutation = gql`
// mutation ForgotPassword($email: String!){
//   forgotPassword(email: $email ){
//     ok
//   }
// }
// `
export default function (){
//   const [message, setMessage] = useState();
//   const router = useRouter();
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const username = document.getElementById("email").value;
    
//     if (await forgotPassword(email))
//         router.push({
//             pathname: "/login_register",
//         });
//     else {
//         setMessage(
//             displayMessage(
//                 "Tên tài khoản hoặc mật khẩu không chính xác",
//                 "danger"
//             )
//         );
//     }
//   };
//   const displayMessage = (message, type) => {
//     return (
//         <DismissingAlert type={type} showTime={5}>
//             {message}
//         </DismissingAlert>
//     );
// };
  
  return (  
  <div className = "body">
  
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous"/>
    <link rel="stylesheet" href="./css/style.css" />

    <div className="forgot-container" id="">
      <div className="form-container sign-in-container">
        <form onSubmit={onSubmit}>
          {message}
          <h1>Forgot Password</h1>

          <h6 className="mt-5 ">Hãy nhập email mà bạn đã đăng ký</h6>
          <input type="email" placeholder="Email" required id="email"/>
          <button className= "mt-2"type="submit" > Xác thực tài khoản </button>
          <a className="mt-3" href="/login_register">Trở về đăng nhập</a>
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